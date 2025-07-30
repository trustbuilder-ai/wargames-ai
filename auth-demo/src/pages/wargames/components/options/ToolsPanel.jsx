import React from "react";

const ToolsPanel = ({ onHistoryClick, onExportClick, onSettingsClick, onHelpClick }) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
        <i data-lucide="wrench" className="w-4 h-4 mr-2"></i>
        TOOLS
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          className="option-button"
          onClick={onHistoryClick}
        >
          History
        </button>
        <button 
          className="option-button"
          onClick={onExportClick}
        >
          Export
        </button>
        <button 
          className="option-button"
          onClick={onSettingsClick}
        >
          Settings
        </button>
        <button 
          className="option-button"
          onClick={onHelpClick}
        >
          Help
        </button>
      </div>
    </div>
  );
};

export default ToolsPanel;