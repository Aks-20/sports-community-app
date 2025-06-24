import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default Input;
