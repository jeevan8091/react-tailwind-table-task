// InfoBox.jsx – reusable informational component
import React from 'react';
import { FiInfo } from 'react-icons/fi';

const InfoBox = ({ title, message }) => {
  return (
    <div className="flex items-start bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg mb-4">
      <FiInfo className="flex-shrink-0 mr-2 mt-0.5" size={20} />
      <div>
        {title && <p className="font-medium mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default InfoBox;
