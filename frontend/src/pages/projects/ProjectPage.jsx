import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjects } from '../../hooks/queries/projects/useGetProject';
import { ProjectHeader } from '../../components/projects/ProjectHeader';
import { ProjectList } from '../../components/projects/ProjectList';
import { ProjectEmptyState } from '../../components/projects/ProjectEmptyState';
import { CreateProjectModal } from '../../components/projects/CreateProjectModal';
import { EditProjectModal } from '../../components/projects/EditProjectModal';
import { DeleteProjectModal } from '../../components/projects/DeleteProjectModal';
import { ProjectsPageSkeleton } from '../../components/skeletons/ProjectPageSkeleton'
export const ProjectsPage = () => {
    const { orgSlug } = useParams();
    const { data, isLoading, isError } = useGetProjects({ orgSlug });

    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [deletingProject, setDeletingProject] = useState(null);

    const projects = Array.isArray(data) ? data : data?.data || [];

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredProjects = projects.filter(
        (p) =>
            p.name?.toLowerCase().includes(normalizedQuery) ||
            p.key?.toLowerCase().includes(normalizedQuery)
    );



    if (isError) {
        return (
            <div className="px-4 py-8 text-center text-sm text-red-500 sm:p-8">
                Failed to load projects.
            </div>
        );
    }

    return (
        <div className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            <ProjectHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenCreate={() => setIsCreateOpen(true)}
            />

            {isLoading && <ProjectsPageSkeleton />}

            <div className="mt-4 min-w-0 sm:mt-6">
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
            </div>

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