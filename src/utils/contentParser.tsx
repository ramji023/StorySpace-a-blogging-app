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
          <ul style={{ listStyleType: 'disc', paddingLeft: '40px', fontSize: '22px', marginBottom: '16px' }}>
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
          <ol style={{ listStyleType: 'decimal', paddingLeft: '40px', fontSize: '22px', marginBottom: '16px' }}>
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
    return (
      <div
        style={{
          fontSize: '22px', // Default font size for all text
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'", // Font style for readability
          lineHeight: '1.6', // Better line spacing
          color: '#333', // Default text color
          letterSpacing: '0.5px', // Slightly spaced letters for better readability
          fontWeight: '400', // Normal font weight (can be adjusted to bold or lighter as needed)
        }}
      >
        {parsedContent}
      </div>
    );
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return <div>Error parsing content.</div>;
  }
};

export default HtmlParser;
