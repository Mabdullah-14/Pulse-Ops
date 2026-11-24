import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjects } from '../../hooks/queries/projects/useGetProject';
import { ProjectHeader } from '../../components/projects/ProjectHeader';
import { ProjectList } from '../../components/projects/ProjectList';
import { ProjectEmptyState } from '../../components/projects/ProjectEmptyState';
import { CreateProjectModal } from '../../components/projects/CreateProjectModal';
import { EditProjectModal } from '../../components/projects/EditProjectModal';
import { DeleteProjectModal } from '../../components/projects/DeleteProjectModal';

export const ProjectsPage = () => {
    const { orgSlug } = useParams();
    const { data, isLoading, isError } = useGetProjects({ orgSlug });

    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [deletingProject, setDeletingProject] = useState(null);

    const projects = Array.isArray(data) ? data : data?.data || [];

    const filteredProjects = projects.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Failed to load projects.</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <ProjectHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenCreate={() => setIsCreateOpen(true)}
            />

            {filteredProjects.length === 0 ? (
                <ProjectEmptyState onOpenCreate={() => setIsCreateOpen(true)} />
            ) : (
                <ProjectList
                    projects={filteredProjects}
                    orgSlug={orgSlug}
                    onEdit={(project) => setEditingProject(project)}
                    onDelete={(project) => setDeletingProject(project)}
                />
            )}

            <CreateProjectModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                orgSlug={orgSlug}
            />

            <EditProjectModal
                project={editingProject}
                onClose={() => setEditingProject(null)}
                orgSlug={orgSlug}
            />

            <DeleteProjectModal
                project={deletingProject}
                onClose={() => setDeletingProject(null)}
                orgSlug={orgSlug}
            />
        </div>
    );
};
