import React, { useState } from 'react';
import { useEditor, createDefaultBlock, createDefaultPage } from '../store';
import { BlockType, ComponentCategory } from '../types';
import {
  Type, Image, MousePointerClick, Layout, Columns, Minus,
  MoveVertical, Video, FormInput, Navigation, Star, MessageSquare,
  DollarSign, Grid3X3, MapPin, List, CreditCard, Megaphone,
  BarChart3, Users, HelpCircle, Mail, Share2, Timer,
  Folder, Layers, FileText, ChevronDown, ChevronRight, Plus,
  Eye, EyeOff, Lock, Unlock, Trash2, Copy, ArrowUp, ArrowDown
} from 'lucide-react';

const componentCategories: ComponentCategory[] = [
  {
    name: 'Básicos',
    icon: 'layout',
    items: [
      { type: 'heading', label: 'Título', icon: 'type', description: 'Encabezado o título de sección' },
      { type: 'paragraph', label: 'Párrafo', icon: 'type', description: 'Bloque de texto' },
      { type: 'image', label: 'Imagen', icon: 'image', description: 'Imagen o foto' },
      { type: 'button', label: 'Botón', icon: 'mouse-pointer-click', description: 'Botón de acción' },
      { type: 'divider', label: 'Divisor', icon: 'minus', description: 'Línea separadora' },
      { type: 'spacer', label: 'Espaciador', icon: 'move-vertical', description: 'Espacio vertical' },
      { type: 'list', label: 'Lista', icon: 'list', description: 'Lista de elementos' },
    ],
  },
  {
    name: 'Layout',
    icon: 'layout',
    items: [
      { type: 'container', label: 'Contenedor', icon: 'layout', description: 'Contenedor agrupador' },
      { type: 'columns', label: 'Columnas', icon: 'columns', description: 'Layout de columnas' },
      { type: 'card', label: 'Tarjeta', icon: 'credit-card', description: 'Tarjeta con contenido' },
    ],
  },
  {
    name: 'Secciones',
    icon: 'layout',
    items: [
      { type: 'navbar', label: 'Navegación', icon: 'navigation', description: 'Barra de navegación' },
      { type: 'hero', label: 'Hero', icon: 'megaphone', description: 'Sección hero principal' },
      { type: 'features', label: 'Características', icon: 'star', description: 'Sección de features' },
      { type: 'testimonial', label: 'Testimonios', icon: 'message-square', description: 'Testimonios de clientes' },
      { type: 'pricing', label: 'Precios', icon: 'dollar-sign', description: 'Tabla de precios' },
      { type: 'team', label: 'Equipo', icon: 'users', description: 'Sección de equipo' },
      { type: 'stats', label: 'Estadísticas', icon: 'bar-chart-3', description: 'Números y estadísticas' },
      { type: 'cta', label: 'Call to Action', icon: 'megaphone', description: 'Llamada a la acción' },
      { type: 'faq', label: 'FAQ', icon: 'help-circle', description: 'Preguntas frecuentes' },
      { type: 'newsletter', label: 'Newsletter', icon: 'mail', description: 'Suscripción newsletter' },
      { type: 'footer', label: 'Footer', icon: 'layout', description: 'Pie de página' },
    ],
  },
  {
    name: 'Media',
    icon: 'image',
    items: [
      { type: 'video', label: 'Video', icon: 'video', description: 'Video embebido' },
      { type: 'gallery', label: 'Galería', icon: 'grid-3x3', description: 'Galería de imágenes' },
      { type: 'map', label: 'Mapa', icon: 'map-pin', description: 'Mapa embebido' },
    ],
  },
  {
    name: 'Formularios',
    icon: 'form-input',
    items: [
      { type: 'form', label: 'Formulario', icon: 'form-input', description: 'Formulario de contacto' },
    ],
  },
];

const getIcon = (iconName: string, size: number = 18) => {
  const icons: Record<string, React.ReactNode> = {
    'type': <Type size={size} />,
    'image': <Image size={size} />,
    'mouse-pointer-click': <MousePointerClick size={size} />,
    'layout': <Layout size={size} />,
    'columns': <Columns size={size} />,
    'minus': <Minus size={size} />,
    'move-vertical': <MoveVertical size={size} />,
    'video': <Video size={size} />,
    'form-input': <FormInput size={size} />,
    'navigation': <Navigation size={size} />,
    'star': <Star size={size} />,
    'message-square': <MessageSquare size={size} />,
    'dollar-sign': <DollarSign size={size} />,
    'grid-3x3': <Grid3X3 size={size} />,
    'map-pin': <MapPin size={size} />,
    'list': <List size={size} />,
    'credit-card': <CreditCard size={size} />,
    'megaphone': <Megaphone size={size} />,
    'bar-chart-3': <BarChart3 size={size} />,
    'users': <Users size={size} />,
    'help-circle': <HelpCircle size={size} />,
    'mail': <Mail size={size} />,
    'share-2': <Share2 size={size} />,
    'timer': <Timer size={size} />,
  };
  return icons[iconName] || <Layout size={size} />;
};

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useEditor();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Básicos': true,
    'Layout': true,
    'Secciones': false,
    'Media': false,
    'Formularios': false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedType, setDraggedType] = useState<BlockType | null>(null);

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAddBlock = (type: BlockType) => {
    const block = createDefaultBlock(type);
    dispatch({ type: 'ADD_BLOCK', payload: { block } });
    dispatch({ type: 'SAVE_HISTORY' });
  };

  const handleDragStart = (e: React.DragEvent, type: BlockType) => {
    setDraggedType(type);
    e.dataTransfer.setData('blockType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedType(null);
  };

  const filteredCategories = componentCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Panel tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => dispatch({ type: 'SET_LEFT_PANEL', payload: 'components' })}
          className={`flex-1 py-3 text-xs font-medium transition-colors ${state.leftPanel === 'components' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Componentes
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_LEFT_PANEL', payload: 'pages' })}
          className={`flex-1 py-3 text-xs font-medium transition-colors ${state.leftPanel === 'pages' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Páginas
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_LEFT_PANEL', payload: 'layers' })}
          className={`flex-1 py-3 text-xs font-medium transition-colors ${state.leftPanel === 'layers' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Capas
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {state.leftPanel === 'components' && (
          <div className="p-3">
            {/* Search */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Buscar componentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Categories */}
            {filteredCategories.map(category => (
              <div key={category.name} className="mb-2">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center justify-between w-full px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>{category.name}</span>
                  {expandedCategories[category.name] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {expandedCategories[category.name] && (
                  <div className="grid grid-cols-2 gap-1.5 px-1 pb-2">
                    {category.items.map(item => (
                      <div
                        key={item.type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.type)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleAddBlock(item.type)}
                        className={`flex flex-col items-center p-2.5 rounded-xl border cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 group ${
                          draggedType === item.type ? 'border-indigo-400 bg-indigo-50 shadow-md' : 'border-gray-150 bg-white'
                        }`}
                        title={item.description}
                      >
                        <div className="text-gray-500 group-hover:text-indigo-600 transition-colors mb-1">
                          {getIcon(item.icon)}
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 group-hover:text-indigo-700 text-center leading-tight">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {state.leftPanel === 'pages' && (
          <div className="p-3">
            <button
              onClick={() => {
                const name = `Página ${state.pages.length + 1}`;
                dispatch({ type: 'ADD_PAGE', payload: createDefaultPage(name, false) });
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 mb-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Plus size={16} />
              Nueva Página
            </button>
            <div className="space-y-1">
              {state.pages.map(page => (
                <div
                  key={page.id}
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: page.id })}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all ${
                    state.currentPageId === page.id ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className={state.currentPageId === page.id ? 'text-indigo-600' : 'text-gray-400'} />
                    <div>
                      <span className="text-sm font-medium text-gray-700">{page.name}</span>
                      {page.isHome && <span className="ml-1.5 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Inicio</span>}
                    </div>
                  </div>
                  {state.pages.length > 1 && !page.isHome && (
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DELETE_PAGE', payload: page.id }); }}
                      className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {state.leftPanel === 'layers' && (
          <LayersPanel />
        )}
      </div>
    </div>
  );
};

const LayersPanel: React.FC = () => {
  const { state, dispatch } = useEditor();
  const currentPage = state.pages.find(p => p.id === state.currentPageId);

  const renderLayer = (block: any, depth: number = 0) => (
    <div key={block.id}>
      <div
        className={`flex items-center justify-between py-1.5 px-2 rounded-md cursor-pointer transition-all text-sm ${
          state.selectedBlockId === block.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => dispatch({ type: 'SELECT_BLOCK', payload: block.id })}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60">{block.type}</span>
          {block.hidden && <EyeOff size={12} className="text-orange-400" />}
          {block.locked && <Lock size={12} className="text-red-400" />}
        </div>
        <div className="flex items-center gap-0.5">
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_BLOCK_VISIBILITY', payload: block.id }); }} className="p-0.5 rounded hover:bg-gray-200">
            {block.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'LOCK_BLOCK', payload: block.id }); }} className="p-0.5 rounded hover:bg-gray-200">
            {block.locked ? <Lock size={12} /> : <Unlock size={12} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'MOVE_BLOCK', payload: { id: block.id, direction: 'up' } }); }} className="p-0.5 rounded hover:bg-gray-200">
            <ArrowUp size={12} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'MOVE_BLOCK', payload: { id: block.id, direction: 'down' } }); }} className="p-0.5 rounded hover:bg-gray-200">
            <ArrowDown size={12} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DELETE_BLOCK', payload: block.id }); dispatch({ type: 'SAVE_HISTORY' }); }} className="p-0.5 rounded hover:bg-red-100 text-red-400 hover:text-red-600">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      {block.children?.map((child: any) => renderLayer(child, depth + 1))}
    </div>
  );

  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <Layers size={16} className="text-gray-500" />
        <span className="text-sm font-semibold text-gray-700">Estructura de Capas</span>
      </div>
      {currentPage?.blocks.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">No hay bloques en esta página</p>
      )}
      <div className="space-y-0.5">
        {currentPage?.blocks.map(block => renderLayer(block))}
      </div>
    </div>
  );
};
