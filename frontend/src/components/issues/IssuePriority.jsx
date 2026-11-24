import React from 'react';

const priorityStyles = {
  LOW: 'bg-gray-100 text-gray-700 border-gray-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
  HIGH: 'bg-amber-50 text-amber-700 border-amber-200',
  URGENT: 'bg-red-50 text-red-700 border-red-200',
};

export const IssuePriorityBadge = ({ priority = 'MEDIUM' }) => {
  const key = priority?.toUpperCase() || 'MEDIUM';
  const style = priorityStyles[key] || priorityStyles.MEDIUM;

  return (
    <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded border ${style}`}>
      {key}
    </span>
  );
};
