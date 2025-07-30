import React from "react";

const AuthStatus = ({ session }) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
        <i data-lucide="shield" className="w-4 h-4 mr-2"></i>
        AUTH STATUS
      </h3>
      <div className="p-3 bg-gray-900 rounded border border-gray-700">
        {session ? (
          <div className="text-sm">
            <span className="text-green-400">● Authenticated</span>
            <p className="text-gray-500 text-xs mt-1">{session.user.email}</p>
          </div>
        ) : (
          <div className="text-sm">
            <span className="text-red-400">● Not Authenticated</span>
            <p className="text-gray-500 text-xs mt-1">Use header menu to login</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;