import React from "react";

const EvalPanel = ({ onRunEval, onViewResults }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
        <i data-lucide="bar-chart-3" className="w-4 h-4 mr-2"></i>
        EVAL
      </h3>
      <div className="space-y-3">
        <button 
          className="option-button w-full text-left"
          onClick={onRunEval}
        >
          Run Evaluation
        </button>
        <button 
          className="option-button w-full text-left"
          onClick={onViewResults}
        >
          View Results
        </button>
      </div>
    </div>
  );
};

export default EvalPanel;