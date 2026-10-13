import React from 'react';
import { useEditor } from '../store';
import { Block } from '../types';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';

export const PreviewModal: React.FC = () => {
  const { state, dispatch } = useEditor();
  const [previewDevice, setPreviewDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const currentPage = state.pages.find(p => p.id === state.currentPageId);

  if (!state.showPreview) return null;

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'tablet': return 'max-w-[768px]';
      case 'mobile': return 'max-w-[375px]';
      default: return 'max-w-full';
    }
  };

  const renderBlock = (block: Block) => {
    if (block.hidden) return null;

    switch (block.type) {
      case 'heading':
        return <h2 style={block.style}>{block.content}</h2>;
      case 'paragraph':
        return <p style={block.style}>{block.content}</p>;
      case 'image':
        return (
          <div style={{ padding: block.style.padding }}>
            <img
              src={block.content}
              alt={block.attributes?.alt || 'Imagen'}
              style={{
                width: block.style.width || '100%',
                height: block.style.height || 'auto',
                borderRadius: block.style.borderRadius || '0',
                objectFit: (block.style.objectFit as any) || 'cover',
                display: 'block',
              }}
            />
          </div>
        );
      case 'button':
        return (
          <div style={{ padding: block.style.padding || '10px' }}>
            <a
              href={block.attributes?.href || '#'}
              style={{
                ...block.style,
                textDecoration: 'none',
                display: block.style.display || 'inline-block',
                textAlign: (block.style.textAlign as any) || 'center',
                width: block.style.width || 'auto',
              }}
            >
              {block.content}
            </a>
          </div>
        );
      case 'divider':
        return <hr style={block.style} />;
      case 'spacer':
        return <div style={block.style} />;
      case 'video':
        return (
          <div style={{ padding: block.style.padding || '10px' }}>
            <iframe
              src={block.content}
              style={{
                width: block.style.width || '100%',
                height: block.style.height || '400px',
                borderRadius: block.style.borderRadius || '0',
                border: 'none',
              }}
              allowFullScreen
            />
          </div>
        );
      case 'list':
        return (
          <div style={block.style}>
            {block.content.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        );
      case 'map':
        return (
          <iframe
            src={block.content}
            style={{
              width: block.style.width || '100%',
              height: block.style.height || '400px',
              borderRadius: block.style.borderRadius || '0',
              border: block.style.border || 'none',
            }}
            allowFullScreen
          />
        );
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
        const bgStyle = block.style.backgroundColor?.includes('gradient')
          ? { background: block.style.backgroundColor }
          : { backgroundColor: block.style.backgroundColor };
        
        const containerStyle = {
          ...block.style,
          ...bgStyle,
          ...(block.style.backgroundColor?.includes('gradient') ? { backgroundColor: undefined } : {}),
        };

        return (
          <div style={containerStyle}>
            {block.children?.map((child) => renderBlock(child))}
          </div>
        );
      }
      default:
        return <div style={block.style}>{block.content}</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-gray-800">Vista Previa</h2>
            <span className="text-sm text-gray-500">{currentPage?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded-md transition-all ${previewDevice === 'tablet' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
              >
                <Tablet size={16} />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
              >
                <Smartphone size={16} />
              </button>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_PREVIEW' })}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${getPreviewWidth()}`}>
            {currentPage?.blocks.map(block => renderBlock(block))}
          </div>
        </div>
      </div>
    </div>
  );
};
