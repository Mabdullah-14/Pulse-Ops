import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectById } from '../../hooks/queries/projects/useGetProjectsById';
import { useGetStatuses } from '../../hooks/queries/statuses/useGetStatuses';
import { useGetIssues } from '../../hooks/queries/issues/useGetIssues';
import { StatusBoardHeader } from '../../components/statuses/StatusBoardHeader';
import { StatusColumnList } from '../../components/statuses/StatusColumnList';
import { StatusEmptyState } from '../../components/statuses/StatusEmptyStatus';
import { CreateStatusModal } from '../../components/statuses/CreateStatusModal';
import { EditStatusModal } from '../../components/statuses/EditStatusModal';
import { DeleteStatusModal } from '../../components/statuses/DeleteStatusModal';
import { CreateIssueModal } from '../../components/issues/CreateIssueModal';
import { EditIssueModal } from '../../components/issues/EditIssueModal';
import { DeleteIssueModal } from '../../components/issues/DeleteIssueModal';

export const ProjectBoardPage = () => {
    const { orgSlug, projectId } = useParams();

    const { data: projectRes, isLoading: isProjectLoading } = useGetProjectById({ orgSlug, projectId });
    const { data: statusRes, isLoading: isStatusLoading, isError } = useGetStatuses({ orgSlug, projectId });
    const { data: issuesRes, fetchNextPage, hasNextPage, isFetchingNextPage, } = useGetIssues({ orgSlug, projectId });

    // Status Modals States
    const [isCreateStatusOpen, setIsCreateStatusOpen] = useState(false);
    const [editingStatus, setEditingStatus] = useState(null);
    const [deletingStatus, setDeletingStatus] = useState(null);

    // Issue Modals States
    const [createIssueStatusId, setCreateIssueStatusId] = useState(null);
    const [editingIssue, setEditingIssue] = useState(null);
    const [deletingIssue, setDeletingIssue] = useState(null);

    const project = projectRes?.project || projectRes?.data || projectRes;
    const statuses = Array.isArray(statusRes) ? statusRes : statusRes?.statuses || statusRes?.data || [];
    const issues = issuesRes?.pages?.flatMap((page) => page?.data || []) || [];

    if (isProjectLoading || isStatusLoading) {
        return <div className="p-8 text-center text-gray-500">Loading board...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-500">Failed to load project board.</div>;
    }

    return (
        <div className="max-w-full">
            <StatusBoardHeader
                project={project}
                orgSlug={orgSlug}
                onOpenCreateStatus={() => setIsCreateStatusOpen(true)}
            />

            {statuses.length === 0 ? (
                <StatusEmptyState
                    onOpenCreate={() => setIsCreateStatusOpen(true)}
                />
            ) : (
                <>
                    <StatusColumnList
                        statuses={statuses}
                        issues={issues}
                        projectKey={project?.key}
                        onEditStatus={(status) => setEditingStatus(status)}
                        onDeleteStatus={(status) => setDeletingStatus(status)}
                        onOpenCreateIssue={(statusId) => setCreateIssueStatusId(statusId)}
                        onEditIssue={(issue) => setEditingIssue(issue)}
                        onDeleteIssue={(issue) => setDeletingIssue(issue)}
                    />

                    {hasNextPage && (
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                            >
                                {isFetchingNextPage ? 'Loading more...' : 'Load More Issues'}
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Status Modals */}
            <CreateStatusModal
                isOpen={isCreateStatusOpen}
                onClose={() => setIsCreateStatusOpen(false)}
                orgSlug={orgSlug}
                projectId={projectId}
                nextPosition={statuses.length + 1}
            />

            <EditStatusModal
                status={editingStatus}
                onClose={() => setEditingStatus(null)}
                orgSlug={orgSlug}
                projectId={projectId}
            />

            <DeleteStatusModal
                status={deletingStatus}
                onClose={() => setDeletingStatus(null)}
                orgSlug={orgSlug}
                projectId={projectId}
            />

            {/* Issue Modals */}
            <CreateIssueModal
                isOpen={!!createIssueStatusId}
                onClose={() => setCreateIssueStatusId(null)}
                orgSlug={orgSlug}
                projectId={projectId}
                statuses={statuses}
                defaultStatusId={createIssueStatusId}
            />

            <EditIssueModal
                issue={editingIssue}
                onClose={() => setEditingIssue(null)}
                orgSlug={orgSlug}
                projectId={projectId}
                statuses={statuses}
            />

            <DeleteIssueModal
                issue={deletingIssue}
                onClose={() => setDeletingIssue(null)}
                orgSlug={orgSlug}
                projectId={projectId}
            />
        </div>
    );
};
