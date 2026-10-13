import React from 'react';
import { useEditor, createDefaultBlock } from '../store';
import { Block } from '../types';
import { X } from 'lucide-react';

interface Template {
  name: string;
  description: string;
  thumbnail: string;
  blocks: () => Block[];
}

const templates: Template[] = [
  {
    name: 'Landing Page SaaS',
    description: 'Página de aterrizaje para producto SaaS con hero, features, pricing y CTA',
    thumbnail: '🚀',
    blocks: () => [
      createDefaultBlock('navbar'),
      createDefaultBlock('hero'),
      createDefaultBlock('stats'),
      createDefaultBlock('features'),
      createDefaultBlock('testimonial'),
      createDefaultBlock('pricing'),
      createDefaultBlock('cta'),
      createDefaultBlock('footer'),
    ],
  },
  {
    name: 'Portfolio Personal',
    description: 'Portfolio profesional con hero, proyectos y contacto',
    thumbnail: '🎨',
    blocks: () => [
      createDefaultBlock('navbar'),
      createDefaultBlock('hero'),
      createDefaultBlock('team'),
      createDefaultBlock('features'),
      createDefaultBlock('testimonial'),
      createDefaultBlock('newsletter'),
      createDefaultBlock('footer'),
    ],
  },
  {
    name: 'Agencia Digital',
    description: 'Sitio web para agencia con servicios, equipo y contacto',
    thumbnail: '💼',
    blocks: () => [
      createDefaultBlock('navbar'),
      createDefaultBlock('hero'),
      createDefaultBlock('features'),
      createDefaultBlock('stats'),
      createDefaultBlock('team'),
      createDefaultBlock('testimonial'),
      createDefaultBlock('cta'),
      createDefaultBlock('footer'),
    ],
  },
  {
    name: 'E-commerce',
    description: 'Tienda online con productos, testimonios y newsletter',
    thumbnail: '🛒',
    blocks: () => [
      createDefaultBlock('navbar'),
      createDefaultBlock('hero'),
      createDefaultBlock('features'),
      createDefaultBlock('pricing'),
      createDefaultBlock('testimonial'),
      createDefaultBlock('newsletter'),
      createDefaultBlock('footer'),
    ],
  },
  {
    name: 'Blog / Magazine',
    description: 'Diseño tipo blog con contenido y newsletter',
    thumbnail: '📝',
    blocks: () => [
      createDefaultBlock('navbar'),
      createDefaultBlock('hero'),
      createDefaultBlock('features'),
      createDefaultBlock('newsletter'),
      createDefaultBlock('footer'),
    ],
  },
  {
    name: 'Restaurante',
    description: 'Sitio para restaurante con menú, galería y reservas',
    thumbnail: '🍽️',
    blocks: () => [
      createDefaultBlock('navbar'),
      createDefaultBlock('hero'),
      createDefaultBlock('features'),
      createDefaultBlock('gallery'),
      createDefaultBlock('testimonial'),
      createDefaultBlock('newsletter'),
      createDefaultBlock('footer'),
    ],
  },
  {
    name: 'Página en Blanco',
    description: 'Comienza desde cero sin bloques predefinidos',
    thumbnail: '📄',
    blocks: () => [],
  },
];

export const TemplateModal: React.FC = () => {
  const { state, dispatch } = useEditor();

  if (!state.showTemplates) return null;

  const handleSelectTemplate = (template: Template) => {
    dispatch({ type: 'LOAD_TEMPLATE', payload: template.blocks() });
    dispatch({ type: 'SAVE_HISTORY' });
    dispatch({ type: 'TOGGLE_TEMPLATES' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="font-bold text-xl text-gray-800">Templates</h2>
            <p className="text-sm text-gray-500 mt-0.5">Elige una plantilla para comenzar rápidamente</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_TEMPLATES' })}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Templates grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleSelectTemplate(template)}
                className="group p-5 border-2 border-gray-100 rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all text-left"
              >
                <div className="text-4xl mb-3">{template.thumbnail}</div>
                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {template.description}
                </p>
                <div className="mt-3 text-xs text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Click para usar →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
