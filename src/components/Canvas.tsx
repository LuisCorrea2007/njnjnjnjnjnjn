import React, { useCallback } from 'react';
import { useEditor, createDefaultBlock } from '../store';
import { Block, BlockType } from '../types';

export const Canvas: React.FC = () => {
  const { state, dispatch } = useEditor();
  const currentPage = state.pages.find(p => p.id === state.currentPageId);

  const getViewWidth = () => {
    switch (state.viewMode) {
      case 'tablet': return 'max-w-[768px]';
      case 'mobile': return 'max-w-[375px]';
      default: return 'max-w-full';
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('blockType') as BlockType;
    if (type) {
      const block = createDefaultBlock(type);
      dispatch({ type: 'ADD_BLOCK', payload: { block } });
      dispatch({ type: 'SAVE_HISTORY' });
    }
  }, [dispatch]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  if (!currentPage) return null;

  return (
    <div
      className="flex-1 bg-gray-100 overflow-auto p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        className={`mx-auto bg-white shadow-lg rounded-lg min-h-[600px] transition-all duration-300 ${getViewWidth()}`}
        style={{ transform: `scale(${state.zoom / 100})`, transformOrigin: 'top center' }}
      >
        {currentPage.blocks.length === 0 ? (
          <EmptyCanvas />
        ) : (
          <div className="relative">
            {currentPage.blocks.map((block, index) => (
              <BlockRenderer
                key={block.id}
                block={block}
                index={index}
                depth={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyCanvas: React.FC = () => {
  const { dispatch } = useEditor();

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center p-10">
      <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Comienza a crear tu página</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Arrastra componentes desde el panel izquierdo o haz clic en ellos para agregarlos al canvas.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => {
            const hero = createDefaultBlock('hero');
            dispatch({ type: 'ADD_BLOCK', payload: { block: hero } });
            dispatch({ type: 'SAVE_HISTORY' });
          }}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Agregar Hero Section
        </button>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_TEMPLATES' })}
          className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Usar Template
        </button>
      </div>
    </div>
  );
};

interface BlockRendererProps {
  block: Block;
  index: number;
  depth: number;
  parentId?: string;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, index, depth, parentId }) => {
  const { state, dispatch } = useEditor();
  const isSelected = state.selectedBlockId === block.id;
  const isHovered = state.hoveredBlockId === block.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!block.locked) {
      dispatch({ type: 'SELECT_BLOCK', payload: block.id });
    }
  };

  const handleMouseEnter = () => {
    dispatch({ type: 'HOVER_BLOCK', payload: block.id });
  };

  const handleMouseLeave = () => {
    dispatch({ type: 'HOVER_BLOCK', payload: null });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData('blockType') as BlockType;
    if (type && (block.type === 'container' || block.type === 'columns' || block.type === 'card' || block.type === 'hero' || block.type === 'features' || block.type === 'cta' || block.type === 'footer' || block.type === 'navbar' || block.type === 'form' || block.type === 'testimonial' || block.type === 'pricing' || block.type === 'team' || block.type === 'stats' || block.type === 'faq' || block.type === 'newsletter' || block.type === 'icon-box')) {
      const newBlock = createDefaultBlock(type);
      dispatch({ type: 'ADD_BLOCK', payload: { block: newBlock, parentId: block.id } });
      dispatch({ type: 'SAVE_HISTORY' });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (block.hidden) return null;

  const renderBlockContent = () => {
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
              onClick={(e) => e.preventDefault()}
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
      case 'social-links':
        const bgStyle = block.style.backgroundColor?.includes('gradient')
          ? { background: block.style.backgroundColor }
          : { backgroundColor: block.style.backgroundColor };
        
        const containerStyle = {
          ...block.style,
          ...bgStyle,
          ...(block.style.backgroundColor?.includes('gradient') ? { backgroundColor: undefined } : {}),
        };

        return (
          <div
            style={containerStyle}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {block.children?.map((child, childIndex) => (
              <BlockRenderer
                key={child.id}
                block={child}
                index={childIndex}
                depth={depth + 1}
                parentId={block.id}
              />
            ))}
            {(!block.children || block.children.length === 0) && depth > 0 && (
              <div className="min-h-[40px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400 p-4">
                Arrastra componentes aquí
              </div>
            )}
          </div>
        );
      default:
        return <div style={block.style}>{block.content}</div>;
    }
  };

  return (
    <div
      className={`relative group transition-all ${
        isSelected ? 'ring-2 ring-indigo-500 ring-offset-1' : ''
      } ${isHovered && !isSelected ? 'ring-1 ring-indigo-300 ring-offset-1' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Block label */}
      {(isSelected || isHovered) && (
        <div className={`absolute -top-6 left-0 z-50 px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 ${
          isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-white'
        }`}>
          {block.type}
          {block.locked && ' 🔒'}
        </div>
      )}

      {/* Action buttons */}
      {isSelected && (
        <div className="absolute -top-6 right-0 z-50 flex items-center gap-0.5">
          <button
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'MOVE_BLOCK', payload: { id: block.id, direction: 'up' } }); dispatch({ type: 'SAVE_HISTORY' }); }}
            className="p-1 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50"
            title="Mover arriba"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'MOVE_BLOCK', payload: { id: block.id, direction: 'down' } }); dispatch({ type: 'SAVE_HISTORY' }); }}
            className="p-1 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50"
            title="Mover abajo"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DUPLICATE_BLOCK', payload: block.id }); dispatch({ type: 'SAVE_HISTORY' }); }}
            className="p-1 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50"
            title="Duplicar"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'LOCK_BLOCK', payload: block.id }); }}
            className="p-1 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50"
            title={block.locked ? 'Desbloquear' : 'Bloquear'}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={block.locked ? "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" : "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"} /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DELETE_BLOCK', payload: block.id }); dispatch({ type: 'SAVE_HISTORY' }); }}
            className="p-1 bg-red-50 rounded shadow-sm border border-red-200 hover:bg-red-100 text-red-500"
            title="Eliminar"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      )}

      {/* Block content */}
      <div className={block.hidden ? 'opacity-30' : ''}>
        {renderBlockContent()}
      </div>
    </div>
  );
};
