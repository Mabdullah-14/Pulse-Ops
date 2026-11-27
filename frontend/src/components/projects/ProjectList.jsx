import React from 'react';
import { ProjectCard } from './ProjectCard';

export const ProjectList = ({ projects = [], orgSlug, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          orgSlug={orgSlug}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};