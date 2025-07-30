import React from "react";

const ThemeSelector = ({ theme, onThemeChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
        <i data-lucide="palette" className="w-4 h-4 mr-2"></i>
        THEME
      </h3>
      <select
        className="cyber-input w-full text-sm"
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
      >
        <option value="cyberpunk">Cyberpunk</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSelector;