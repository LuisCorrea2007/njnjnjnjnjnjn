import React, { useReducer, useEffect } from 'react';
import { EditorContext, editorReducer, initialState } from './store';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { PreviewModal } from './components/PreviewModal';
import { TemplateModal } from './components/TemplateModal';
import { CodeExportModal } from './components/CodeExportModal';

function App() {
  const [state, dispatch] = useReducer(editorReducer, {
    ...initialState,
    currentPageId: initialState.pages[0]?.id || '',
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              dispatch({ type: 'REDO' });
            } else {
              e.preventDefault();
              dispatch({ type: 'UNDO' });
            }
            break;
          case 'y':
            e.preventDefault();
            dispatch({ type: 'REDO' });
            break;
          case 's':
            e.preventDefault();
            // Save
            const data = JSON.stringify(state, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'proyecto-web.json';
            a.click();
            break;
          case 'd':
            if (state.selectedBlockId) {
              e.preventDefault();
              dispatch({ type: 'DUPLICATE_BLOCK', payload: state.selectedBlockId });
              dispatch({ type: 'SAVE_HISTORY' });
            }
            break;
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedBlockId && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          dispatch({ type: 'DELETE_BLOCK', payload: state.selectedBlockId });
          dispatch({ type: 'SAVE_HISTORY' });
        }
      }
      if (e.key === 'Escape') {
        dispatch({ type: 'SELECT_BLOCK', payload: null });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);

  // Auto-save history
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SAVE_HISTORY' });
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.pages]);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50">
        {/* Top Toolbar */}
        <Toolbar />

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Canvas */}
          <Canvas />

          {/* Right Properties Panel */}
          <PropertiesPanel />
        </div>

        {/* Modals */}
        <PreviewModal />
        <TemplateModal />
        <CodeExportModal />
      </div>
    </EditorContext.Provider>
  );
}

export default App;
