import React, { useState, useEffect } from 'react';
import { useEditor } from '../store';
import { Block } from '../types';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { state, dispatch } = useEditor();
  const currentPage = state.pages.find(p => p.id === state.currentPageId);

  const findBlock = (blocks: Block[], id: string): Block | null => {
    for (const block of blocks) {
      if (block.id === id) return block;
      if (block.children) {
        const found = findBlock(block.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedBlock = state.selectedBlockId ? findBlock(currentPage?.blocks || [], state.selectedBlockId) : null;

  if (state.rightPanel === 'settings') {
    return <SettingsPanel />;
  }

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700 text-sm">Propiedades</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Selecciona un bloque para editar sus propiedades</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-700 text-sm">Propiedades</h3>
          <p className="text-xs text-gray-400 mt-0.5">{selectedBlock.type}</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SELECT_BLOCK', payload: null })}
          className="p-1 rounded hover:bg-gray-100 text-gray-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Properties content */}
      <div className="flex-1 overflow-y-auto">
        {/* Content editing */}
        {(selectedBlock.type === 'heading' || selectedBlock.type === 'paragraph' || selectedBlock.type === 'button' || selectedBlock.type === 'list' || selectedBlock.type === 'accordion') && (
          <Section title="Contenido">
            {selectedBlock.type === 'list' || selectedBlock.type === 'accordion' ? (
              <textarea
                value={selectedBlock.content}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { content: e.target.value } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={5}
                placeholder="Una línea por elemento"
              />
            ) : (
              <input
                type="text"
                value={selectedBlock.content}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { content: e.target.value } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </Section>
        )}

        {/* Image URL */}
        {selectedBlock.type === 'image' && (
          <Section title="Imagen">
            <label className="block text-xs font-medium text-gray-600 mb-1">URL de la imagen</label>
            <input
              type="text"
              value={selectedBlock.content}
              onChange={(e) => {
                dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { content: e.target.value } } });
              }}
              onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..."
            />
            <label className="block text-xs font-medium text-gray-600 mb-1 mt-3">Texto alternativo</label>
            <input
              type="text"
              value={selectedBlock.attributes?.alt || ''}
              onChange={(e) => {
                dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { attributes: { ...selectedBlock.attributes, alt: e.target.value } } } });
              }}
              onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Section>
        )}

        {/* Video URL */}
        {selectedBlock.type === 'video' && (
          <Section title="Video">
            <label className="block text-xs font-medium text-gray-600 mb-1">URL del video (embed)</label>
            <input
              type="text"
              value={selectedBlock.content}
              onChange={(e) => {
                dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { content: e.target.value } } });
              }}
              onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://www.youtube.com/embed/..."
            />
          </Section>
        )}

        {/* Button link */}
        {selectedBlock.type === 'button' && (
          <Section title="Enlace">
            <label className="block text-xs font-medium text-gray-600 mb-1">URL del enlace</label>
            <input
              type="text"
              value={selectedBlock.attributes?.href || ''}
              onChange={(e) => {
                dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { attributes: { ...selectedBlock.attributes, href: e.target.value } } } });
              }}
              onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..."
            />
          </Section>
        )}

        {/* Typography */}
        {(selectedBlock.type === 'heading' || selectedBlock.type === 'paragraph' || selectedBlock.type === 'button' || selectedBlock.type === 'list') && (
          <Section title="Tipografía">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Fuente</label>
                <select
                  value={selectedBlock.style.fontFamily || 'Inter, sans-serif'}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, fontFamily: e.target.value } } } });
                    dispatch({ type: 'SAVE_HISTORY' });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Lato', sans-serif">Lato</option>
                  <option value="'Playfair Display', serif">Playfair Display</option>
                  <option value="'Merriweather', serif">Merriweather</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tamaño</label>
                  <input
                    type="text"
                    value={selectedBlock.style.fontSize || '16px'}
                    onChange={(e) => {
                      dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, fontSize: e.target.value } } } });
                    }}
                    onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Peso</label>
                  <select
                    value={selectedBlock.style.fontWeight || '400'}
                    onChange={(e) => {
                      dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, fontWeight: e.target.value } } } });
                      dispatch({ type: 'SAVE_HISTORY' });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semibold</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Alineación</label>
                <div className="flex gap-1">
                  {['left', 'center', 'right', 'justify'].map(align => (
                    <button
                      key={align}
                      onClick={() => {
                        dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, textAlign: align } } } });
                        dispatch({ type: 'SAVE_HISTORY' });
                      }}
                      className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                        selectedBlock.style.textAlign === align ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {align === 'left' && <AlignLeft size={14} className="mx-auto" />}
                      {align === 'center' && <AlignCenter size={14} className="mx-auto" />}
                      {align === 'right' && <AlignRight size={14} className="mx-auto" />}
                      {align === 'justify' && <AlignJustify size={14} className="mx-auto" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Interlineado</label>
                  <input
                    type="text"
                    value={selectedBlock.style.lineHeight || '1.5'}
                    onChange={(e) => {
                      dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, lineHeight: e.target.value } } } });
                    }}
                    onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Espaciado letras</label>
                  <input
                    type="text"
                    value={selectedBlock.style.letterSpacing || '0px'}
                    onChange={(e) => {
                      dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, letterSpacing: e.target.value } } } });
                    }}
                    onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Transformación</label>
                <select
                  value={selectedBlock.style.textTransform || 'none'}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, textTransform: e.target.value } } } });
                    dispatch({ type: 'SAVE_HISTORY' });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="none">Normal</option>
                  <option value="uppercase">MAYÚSCULAS</option>
                  <option value="lowercase">minúsculas</option>
                  <option value="capitalize">Capitalizar</option>
                </select>
              </div>
            </div>
          </Section>
        )}

        {/* Colors */}
        <Section title="Colores">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Color de texto</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedBlock.style.color || '#000000'}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, color: e.target.value } } } });
                  }}
                  onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedBlock.style.color || ''}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, color: e.target.value } } } });
                  }}
                  onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Color de fondo</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedBlock.style.backgroundColor?.startsWith('#') ? selectedBlock.style.backgroundColor : '#ffffff'}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, backgroundColor: e.target.value } } } });
                  }}
                  onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedBlock.style.backgroundColor || ''}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, backgroundColor: e.target.value } } } });
                  }}
                  onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="#ffffff o linear-gradient(...)"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section title="Espaciado">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Padding</label>
              <input
                type="text"
                value={selectedBlock.style.padding || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, padding: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="20px o 10px 20px"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Margin</label>
              <input
                type="text"
                value={selectedBlock.style.margin || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, margin: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0px o 10px auto"
              />
            </div>
          </div>
        </Section>

        {/* Size */}
        <Section title="Dimensiones">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ancho</label>
              <input
                type="text"
                value={selectedBlock.style.width || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, width: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="100%"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alto</label>
              <input
                type="text"
                value={selectedBlock.style.height || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, height: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="auto"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ancho máx.</label>
              <input
                type="text"
                value={selectedBlock.style.maxWidth || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, maxWidth: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="1200px"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alto mín.</label>
              <input
                type="text"
                value={selectedBlock.style.minHeight || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, minHeight: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="100px"
              />
            </div>
          </div>
        </Section>

        {/* Border & Effects */}
        <Section title="Borde y Efectos">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Border Radius</label>
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(selectedBlock.style.borderRadius || '0')}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, borderRadius: `${e.target.value}px` } } } });
                }}
                onMouseUp={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0px</span>
                <span>{selectedBlock.style.borderRadius || '0px'}</span>
                <span>50px</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Borde</label>
              <input
                type="text"
                value={selectedBlock.style.border || ''}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, border: e.target.value } } } });
                }}
                onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="1px solid #e0e0e0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Box Shadow</label>
              <select
                value={selectedBlock.style.boxShadow || 'none'}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, boxShadow: e.target.value } } } });
                  dispatch({ type: 'SAVE_HISTORY' });
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="none">Sin sombra</option>
                <option value="0 1px 3px rgba(0,0,0,0.12)">Sutil</option>
                <option value="0 4px 15px rgba(0,0,0,0.08)">Media</option>
                <option value="0 4px 20px rgba(0,0,0,0.12)">Notable</option>
                <option value="0 8px 30px rgba(0,0,0,0.15)">Grande</option>
                <option value="0 20px 60px rgba(0,0,0,0.2)">Extra grande</option>
                <option value="0 4px 20px rgba(79,70,229,0.15)">Indigo</option>
                <option value="0 8px 30px rgba(79,70,229,0.3)">Indigo fuerte</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Opacidad</label>
              <input
                type="range"
                min="0"
                max="100"
                value={parseInt(selectedBlock.style.opacity || '100')}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, opacity: `${parseInt(e.target.value) / 100}` } } } });
                }}
                onMouseUp={() => dispatch({ type: 'SAVE_HISTORY' })}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>{Math.round(parseFloat(selectedBlock.style.opacity || '1') * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Layout (for containers) */}
        {(selectedBlock.type === 'container' || selectedBlock.type === 'columns' || selectedBlock.type === 'hero' || selectedBlock.type === 'cta' || selectedBlock.type === 'stats') && (
          <Section title="Layout">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Display</label>
                <select
                  value={selectedBlock.style.display || 'block'}
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, display: e.target.value } } } });
                    dispatch({ type: 'SAVE_HISTORY' });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="block">Block</option>
                  <option value="flex">Flex</option>
                  <option value="grid">Grid</option>
                  <option value="inline-block">Inline Block</option>
                </select>
              </div>
              {selectedBlock.style.display === 'flex' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Dirección</label>
                    <select
                      value={selectedBlock.style.flexDirection || 'row'}
                      onChange={(e) => {
                        dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, flexDirection: e.target.value } } } });
                        dispatch({ type: 'SAVE_HISTORY' });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="row">Horizontal</option>
                      <option value="column">Vertical</option>
                      <option value="row-reverse">Horizontal Inverso</option>
                      <option value="column-reverse">Vertical Inverso</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Justify Content</label>
                    <select
                      value={selectedBlock.style.justifyContent || 'flex-start'}
                      onChange={(e) => {
                        dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, justifyContent: e.target.value } } } });
                        dispatch({ type: 'SAVE_HISTORY' });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="flex-start">Inicio</option>
                      <option value="center">Centro</option>
                      <option value="flex-end">Final</option>
                      <option value="space-between">Espaciado</option>
                      <option value="space-around">Alrededor</option>
                      <option value="space-evenly">Uniforme</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Align Items</label>
                    <select
                      value={selectedBlock.style.alignItems || 'stretch'}
                      onChange={(e) => {
                        dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, alignItems: e.target.value } } } });
                        dispatch({ type: 'SAVE_HISTORY' });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="stretch">Stretch</option>
                      <option value="flex-start">Inicio</option>
                      <option value="center">Centro</option>
                      <option value="flex-end">Final</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gap</label>
                    <input
                      type="text"
                      value={selectedBlock.style.gap || '0px'}
                      onChange={(e) => {
                        dispatch({ type: 'UPDATE_BLOCK', payload: { id: selectedBlock.id, updates: { style: { ...selectedBlock.style, gap: e.target.value } } } });
                      }}
                      onBlur={() => dispatch({ type: 'SAVE_HISTORY' })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="20px"
                    />
                  </div>
                </>
              )}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        {title}
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

const SettingsPanel: React.FC = () => {
  const { state, dispatch } = useEditor();

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-700 text-sm">Configuración del Sitio</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Título del sitio</label>
          <input
            type="text"
            value={state.settings.title}
            onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { title: e.target.value } })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Color primario</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={state.settings.primaryColor}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { primaryColor: e.target.value } })}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={state.settings.primaryColor}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { primaryColor: e.target.value } })}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Color secundario</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={state.settings.secondaryColor}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { secondaryColor: e.target.value } })}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={state.settings.secondaryColor}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { secondaryColor: e.target.value } })}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Fuente global</label>
          <select
            value={state.settings.fontFamily}
            onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { fontFamily: e.target.value } })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Inter, sans-serif">Inter</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="'Poppins', sans-serif">Poppins</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Color de fondo</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={state.settings.backgroundColor}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { backgroundColor: e.target.value } })}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={state.settings.backgroundColor}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { backgroundColor: e.target.value } })}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
