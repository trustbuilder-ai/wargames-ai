import React, { useState } from "react";

const ModeSelector = ({ initialMode = "single", onModeChange }) => {
  const [mode, setMode] = useState(initialMode);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
        <i data-lucide="toggle-left" className="w-4 h-4 mr-2"></i>
        MODE
      </h3>
      <div className="flex space-x-3">
        <button 
          className={`option-button flex-1 ${mode === 'single' ? 'active' : ''}`}
          onClick={() => handleModeChange('single')}
        >
          Single
        </button>
        <button 
          className={`option-button flex-1 ${mode === 'batch' ? 'active' : ''}`}
          onClick={() => handleModeChange('batch')}
        >
          Batch
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;