// /components/Modal.jsx

import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-gray-900">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-base mb-4">{children}</div>
        <button onClick={onClose} className="btn btn-primary">
          Close
        </button>
      </div>
    </div>
  );
}
