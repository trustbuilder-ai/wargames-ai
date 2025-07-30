import React, { useEffect, useRef } from "react";

const ModelOutput = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessageTypeStyle = (type) => {
    switch (type) {
      case 'system':
        return 'text-cyan-400';
      case 'model':
        return 'text-green-400';
      case 'user':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getMessageLabel = (type) => {
    switch (type) {
      case 'system':
        return '[SYSTEM]';
      case 'model':
        return '[MODEL]';
      case 'user':
        return '[USER]';
      default:
        return '[UNKNOWN]';
    }
  };

  return (
    <div className="cyber-card glow-border flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-green-400">MODEL OUTPUT</h2>
        <button className="text-gray-400 hover:text-green-400 transition-colors">
          <i data-lucide="maximize-2" className="w-5 h-5"></i>
        </button>
      </div>
      <div className="bg-black/50 rounded p-6 min-h-[450px] max-h-[550px] overflow-y-auto font-mono text-sm">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className={getMessageTypeStyle(message.type)}>
                {getMessageLabel(message.type)}
              </span>
              <p className="text-gray-300">{message.text}</p>
            </div>
          ))}
          <div className="typing-cursor" ref={messagesEndRef}></div>
        </div>
      </div>
    </div>
  );
};

export default ModelOutput;