import React from 'react';
import { useEditor } from '../store';
import {
  Monitor, Tablet, Smartphone, Eye, Code, Undo2, Redo2,
  ZoomIn, ZoomOut, Save, Download, Settings, Menu
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const { state, dispatch } = useEditor();

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-gray-800 text-lg hidden sm:block">WebBuilder</span>
        </div>
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <button
          onClick={() => dispatch({ type: 'UNDO' })}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          title="Deshacer (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={() => dispatch({ type: 'REDO' })}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          title="Rehacer (Ctrl+Y)"
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Center section - View modes */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'desktop' })}
          className={`p-2 rounded-lg transition-all ${state.viewMode === 'desktop' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          title="Vista Desktop"
        >
          <Monitor size={18} />
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'tablet' })}
          className={`p-2 rounded-lg transition-all ${state.viewMode === 'tablet' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          title="Vista Tablet"
        >
          <Tablet size={18} />
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'mobile' })}
          className={`p-2 rounded-lg transition-all ${state.viewMode === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          title="Vista Móvil"
        >
          <Smartphone size={18} />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
          <button
            onClick={() => dispatch({ type: 'SET_ZOOM', payload: Math.max(50, state.zoom - 10) })}
            className="p-1 rounded hover:bg-gray-200 text-gray-600"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-xs font-medium text-gray-600 min-w-[35px] text-center">{state.zoom}%</span>
          <button
            onClick={() => dispatch({ type: 'SET_ZOOM', payload: Math.min(150, state.zoom + 10) })}
            className="p-1 rounded hover:bg-gray-200 text-gray-600"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <button
          onClick={() => dispatch({ type: 'TOGGLE_TEMPLATES' })}
          className="px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors flex items-center gap-1.5"
        >
          <Menu size={16} />
          <span className="hidden md:inline">Templates</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'SET_RIGHT_PANEL', payload: 'settings' })}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          title="Configuración"
        >
          <Settings size={18} />
        </button>

        <button
          onClick={() => dispatch({ type: 'TOGGLE_CODE_EXPORT' })}
          className="px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors flex items-center gap-1.5"
        >
          <Code size={16} />
          <span className="hidden md:inline">HTML</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'TOGGLE_PREVIEW' })}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
        >
          <Eye size={16} />
          <span className="hidden md:inline">Vista Previa</span>
        </button>

        <button
          onClick={() => {
            const data = JSON.stringify(state, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'proyecto-web.json';
            a.click();
          }}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Save size={16} />
          <span className="hidden md:inline">Guardar</span>
        </button>
      </div>
    </div>
  );
};
