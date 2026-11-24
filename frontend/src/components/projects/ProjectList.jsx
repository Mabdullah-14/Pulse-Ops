import React from 'react';
import { ProjectCard } from './ProjectCard';

export const ProjectList = ({ projects, orgSlug, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
