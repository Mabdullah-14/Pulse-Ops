import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrgCard = ({ org }) => {
  const navigate = useNavigate();
  const roleName = typeof org.role === 'object' ? org.role?.name : org.role;

  return (
    <div
      onClick={() => navigate(`/orgs/${org.slug}`)}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{org.name}</h3>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
          {roleName || 'member'}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">/{org.slug}</p>
      <div className="mt-4 flex items-center text-xs font-medium text-blue-600">
        Open Workspace →
      </div>
    </div>
  );
};

export default OrgCard;
