import React from 'react';
import parse from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  htmlContent: string;
}

const HtmlParser: React.FC<Props> = ({ htmlContent }) => {
  const options = {
    replace: (domNode: any) => {
      // Syntax highlighting
      if (domNode.name === 'pre' && domNode.attribs && domNode.attribs.class === 'ql-syntax') {
        const code = domNode.children && domNode.children[0]?.data;
        if (code) {
          return (
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              PreTag="div" // Important for correct styling
            >
              {code}
            </SyntaxHighlighter>
          );
        }
      }

      // Image handling
      if (domNode.name === 'img') {
        const src = domNode.attribs.src;
        if (src) {
          return <img src={src} alt="Embedded Image" style={{ maxWidth: '100%' }} />;
        }
      }

      // List handling
      if (domNode.name === 'ul') {
        return (
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {domNode.children?.map((child: any, index: number) => {
              if (child.name === 'li') {
                return (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {child.children && parse(child.children.map((c: any) => c.data || '').join(''))}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        );
      }

      if (domNode.name === 'ol') {
        return (
          <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
            {domNode.children?.map((child: any, index: number) => {
              if (child.name === 'li') {
                return (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {child.children && parse(child.children.map((c: any) => c.data || '').join(''))}
                  </li>
                );
              }
              return null;
            })}
          </ol>
        );
      }
    },
  };

  try {
    const parsedContent = parse(htmlContent, options);
    return <>{parsedContent}</>;
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return <div>Error parsing content.</div>;
  }
};

export default HtmlParser;
