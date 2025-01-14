import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
export const parseContent = (content: string): JSX.Element => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
  
    const processNode = (node: Node, index: number): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
  
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
  
        // Extract attributes and replace `class` with `className`
        const props: any = {};
        Array.from(element.attributes).forEach(attr => {
          if (attr.name === 'class') {
            props['className'] = attr.value;
          } else {
            props[attr.name] = attr.value;
          }
        });
  
        // Handle void elements like <img> and <source>
        const voidElements = ['img', 'source', 'input', 'br', 'hr', 'meta', 'link'];
        if (voidElements.includes(element.tagName.toLowerCase())) {
          return React.createElement(element.tagName.toLowerCase(), {
            ...props,
            key: `void-${index}`,
          });
        }
  
        // Special handling for <video> (with <source> children)
        if (element.tagName.toLowerCase() === 'video') {
          const children = Array.from(element.childNodes)
            .filter(child => child.nodeName.toLowerCase() === 'source')
            .map((child, childIndex) => processNode(child, childIndex));
          return React.createElement(
            'video',
            { ...props, key: `video-${index}`, controls: true },
            children
          );
        }
  
        // Handle <pre> and <code> for SyntaxHighlighter
        if (element.tagName.toLowerCase() === 'pre') {
          const codeElement = element.querySelector('code');
          if (codeElement) {
            const code = codeElement.textContent || '';
            const languageMatch = codeElement.className.match(/language-(\w+)/);
            const language = languageMatch ? languageMatch[1] : 'javascript';
  
            return (
              <div className="my-6" key={`pre-${index}`}>
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    margin: 0,
                  }}
                >
                  {code.trim()}
                </SyntaxHighlighter>
              </div>
            );
          }
        }
  
        // Process other elements recursively
        const children = Array.from(element.childNodes).map((childNode, childIndex) =>
          processNode(childNode, childIndex)
        );
  
        return React.createElement(
          element.tagName.toLowerCase(),
          { ...props, key: `element-${index}` },
          children
        );
      }
  
      return null;
    };
  
    return (
      <>
        {Array.from(doc.body.childNodes).map((childNode, index) =>
          processNode(childNode, index)
        )}
      </>
    );
  };
  