import React, { useState } from 'react';
import { useEditor } from '../store';
import { Block } from '../types';
import { X, Copy, Download, Check } from 'lucide-react';

export const CodeExportModal: React.FC = () => {
  const { state, dispatch } = useEditor();
  const [copied, setCopied] = useState(false);
  const currentPage = state.pages.find(p => p.id === state.currentPageId);

  if (!state.showCodeExport) return null;

  const styleToString = (style: Record<string, string | undefined>): string => {
    return Object.entries(style)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join('; ');
  };

  const blockToHtml = (block: Block, indent: number = 2): string => {
    const spaces = ' '.repeat(indent);
    const style = styleToString(block.style);
    const styleAttr = style ? ` style="${style}"` : '';

    switch (block.type) {
      case 'heading':
        return `${spaces}<h2${styleAttr}>${block.content}</h2>`;
      case 'paragraph':
        return `${spaces}<p${styleAttr}>${block.content}</p>`;
      case 'image':
        return `${spaces}<img src="${block.content}" alt="${block.attributes?.alt || ''}"${styleAttr} />`;
      case 'button':
        return `${spaces}<a href="${block.attributes?.href || '#'}"${styleAttr}>${block.content}</a>`;
      case 'divider':
        return `${spaces}<hr${styleAttr} />`;
      case 'spacer':
        return `${spaces}<div${styleAttr}></div>`;
      case 'video':
        return `${spaces}<iframe src="${block.content}"${styleAttr} allowfullscreen></iframe>`;
      case 'list':
        const listItems = block.content.split('\n').map(line => `${spaces}  <li>${line}</li>`).join('\n');
        return `${spaces}<ul${styleAttr}>\n${listItems}\n${spaces}</ul>`;
      case 'map':
        return `${spaces}<iframe src="${block.content}"${styleAttr} allowfullscreen></iframe>`;
      case 'container':
      case 'columns':
      case 'card':
      case 'hero':
      case 'features':
      case 'testimonial':
      case 'pricing':
      case 'footer':
      case 'navbar':
      case 'form':
      case 'cta':
      case 'stats':
      case 'team':
      case 'faq':
      case 'newsletter':
      case 'icon-box':
      case 'gallery':
      case 'countdown':
      case 'tabs':
      case 'accordion':
      case 'social-links': {
        const children = block.children?.map(child => blockToHtml(child, indent + 2)).join('\n') || '';
        return `${spaces}<div${styleAttr}>\n${children}\n${spaces}</div>`;
      }
      default:
        return `${spaces}<div${styleAttr}>${block.content}</div>`;
    }
  };

  const generateFullHtml = (): string => {
    const blocks = currentPage?.blocks.map(block => blockToHtml(block, 6)).join('\n') || '';
    
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.settings.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: ${state.settings.fontFamily};
      background-color: ${state.settings.backgroundColor};
      color: #333;
      line-height: 1.6;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    ul {
      list-style: none;
    }
  </style>
</head>
<body>
  <main>
${blocks}
  </main>
</body>
</html>`;
  };

  const htmlCode = generateFullHtml();

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.settings.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="font-bold text-xl text-gray-800">Exportar HTML</h2>
            <p className="text-sm text-gray-500 mt-0.5">Copia o descarga el código HTML de tu página</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            >
              <Download size={16} />
              Descargar
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CODE_EXPORT' })}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto p-4 bg-gray-900">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
            <code>{htmlCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
