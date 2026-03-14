import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Card, Spin, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const MarkdownViewer = ({ path }: { path: string }) => {
  const [mdContent, setMdContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Replace with your actual markdown file path or API endpoint
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        setMdContent(text);
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin />
        </div>
      ) : (
        <Typography>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // This maps Markdown code blocks to the SyntaxHighlighter
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div style={{ position: 'relative', margin: '16px 0' }}>
                    <CopyButton>{children}</CopyButton>
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // Ensure H1/H2 tags have IDs that match your Anchor hrefs
              h2: ({ children }) => {
                const id = String(children).toLowerCase().replace(/\s+/g, '-');
                return <h2 id={id}>{children}</h2>;
              },
              table: ({ ...props }) => (
                <div style={{ overflowX: 'auto', margin: '16px 0' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    {...props}
                  />
                </div>
              ),
              th: ({ ...props }) => (
                <th
                  style={{
                    border: '1px solid #e5e7eb',
                    padding: '12px 16px',
                    backgroundColor: '#f9fafb',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                  {...props}
                />
              ),
              td: ({ ...props }) => (
                <td
                  style={{
                    border: '1px solid #e5e7eb',
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                  }}
                  {...props}
                />
              ),
            }}
          >
            {mdContent}
          </ReactMarkdown>
        </Typography>
      )}
    </Card>
  );
};

function CopyButton({ children }: { children: any }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const codeText = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后恢复
    });
  };
  return (
    <Tooltip title={copied ? '已复制' : '复制代码'} placement="top">
      <button
        type="button"
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '14px',
          color: copied ? '#52c41a' : '#666',
        }}
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </button>
    </Tooltip>
  );
}

export default MarkdownViewer;
