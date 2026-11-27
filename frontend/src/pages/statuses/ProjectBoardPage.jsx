import React, { useState } from "react";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetProjectById } from "../../hooks/queries/projects/useGetProjectsById";
import { useGetStatuses } from "../../hooks/queries/statuses/useGetStatuses";
import { useGetIssues } from "../../hooks/queries/issues/useGetIssues";
import { useMoveIssue } from "../../hooks/mutations/issues/useMoveIssue";
import { useOrgSocket } from "../../hooks/useOrgSocket";
import { useDebounce } from "../../hooks/useDebounce";
import { StatusBoardHeader } from "../../components/statuses/StatusBoardHeader";
import { StatusColumnList } from "../../components/statuses/StatusColumnList";
import { StatusEmptyState } from "../../components/statuses/StatusEmptyStatus";
import { CreateStatusModal } from "../../components/statuses/CreateStatusModal";
import { EditStatusModal } from "../../components/statuses/EditStatusModal";
import { DeleteStatusModal } from "../../components/statuses/DeleteStatusModal";
import { CreateIssueModal } from "../../components/issues/CreateIssueModal";
import { EditIssueModal } from "../../components/issues/EditIssueModal";
import { DeleteIssueModal } from "../../components/issues/DeleteIssueModal";
import {ProjectBoardSkeleton} from '../../components/skeletons/ProjectBoardSkeleton'
export const ProjectBoardPage = () => {
    const { orgSlug, projectId } = useParams();

    // Filter States
    const [search, setSearch] = useState("");
    const [statusId, setStatusId] = useState("");
    const [priority, setPriority] = useState("");
    const [assigneeId, setAssigneeId] = useState("");

    const debouncedSearch = useDebounce(search, 400);

    // Status Modals States
    const [isCreateStatusOpen, setIsCreateStatusOpen] = useState(false);
    const [editingStatus, setEditingStatus] = useState(null);
    const [deletingStatus, setDeletingStatus] = useState(null);

    // Issue Modals States
    const [createIssueStatusId, setCreateIssueStatusId] = useState(null);
    const [editingIssue, setEditingIssue] = useState(null);
    const [deletingIssue, setDeletingIssue] = useState(null);

    // Queries
    const { data: projectRes, isLoading: isProjectLoading } = useGetProjectById({
        orgSlug,
        projectId,
    });

    const {
        data: statusRes,
        isLoading: isStatusLoading,
        isError,
    } = useGetStatuses({ orgSlug, projectId });

    const {
        data: issuesRes,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetIssues({
        orgSlug,
        projectId,
        filters: {
            statusId,
            priority,
            assigneeId,
            search: debouncedSearch,
        },
    });

    const { mutate: moveIssue } = useMoveIssue({ orgSlug, projectId });

    const project = projectRes?.project || projectRes?.data || projectRes;
    const statuses = Array.isArray(statusRes)
        ? statusRes
        : statusRes?.statuses || statusRes?.data || [];
    const issues = issuesRes?.pages?.flatMap((page) => page?.data || []) || [];
    useOrgSocket(project?.organizationId || project?.orgId);


    

    if (isError) {
        return (
            <div className="px-4 py-8 text-center text-sm text-red-500 sm:p-8">
                Failed to load project board.
            </div>
        );
    }

    return (
        <div className="min-w-0 max-w-full px-3 py-4 sm:px-6 sm:py-6">
            <StatusBoardHeader
                project={project}
                orgSlug={orgSlug}
                onOpenCreateStatus={() => setIsCreateStatusOpen(true)}
            />
            {isProjectLoading && <ProjectBoardSkeleton/>}

            {statuses.length === 0 ? (
                <StatusEmptyState onOpenCreate={() => setIsCreateStatusOpen(true)} />
            ) : (
                <div className="min-w-0">
                    {/* Filter Bar */}
                    <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:w-80">
                            <Search
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search issues..."
                                className="w-full rounded-lg border border-gray-200/80 bg-gray-50/80 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:py-1.5"
                            />
                        </div>
                    </div>

                    <div className="min-w-0 overflow-x-auto pb-2">
                        <StatusColumnList
                            statuses={statuses}
                            issues={issues}
                            onMoveIssue={moveIssue}
                            projectKey={project?.key}
                            onEditStatus={(status) => setEditingStatus(status)}
                            onDeleteStatus={(status) => setDeletingStatus(status)}
                            onOpenCreateIssue={(statusId) => setCreateIssueStatusId(statusId)}
                            onEditIssue={(issue) => setEditingIssue(issue)}
                            onDeleteIssue={(issue) => setDeletingIssue(issue)}
                        />
                    </div>

                    {hasNextPage && (
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:w-auto sm:py-2"
                            >
                                {isFetchingNextPage ? "Loading more..." : "Load More Issues"}
                            </button>
                        </div>
                    )}
                </div>
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