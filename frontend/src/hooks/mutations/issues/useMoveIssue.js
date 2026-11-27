import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateIssue } from "../../../services/issue";

export const useMoveIssue = ({ orgSlug, projectId }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ issueId, statusId, version }) =>
            updateIssue({ orgSlug, projectId, issueId }, { statusId, version }),

        onMutate: async ({ issueId, statusId }) => {
            await queryClient.cancelQueries({ queryKey: ["issues", orgSlug, projectId] });

            const previousQueries = queryClient.getQueriesData({
                queryKey: ["issues", orgSlug, projectId],
            });

            queryClient.setQueriesData(
                { queryKey: ["issues", orgSlug, projectId] },
                (oldData) => {
                    if (!oldData?.pages) return oldData;
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            data: page.data.map((issue) =>
                                issue.id === issueId ? { ...issue, statusId } : issue
                            ),
                        })),
                    };
                }
            );

            return { previousQueries };
        },

        onError: (error, _variables, context) => {
            if (context?.previousQueries) {
                context.previousQueries.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }

            if (error?.status === 409) {
                toast.warning("Conflict: Someone else moved or updated this issue. Refreshing...");
            } else {
                toast.error(error?.message || "Failed to move issue");
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["issues", orgSlug, projectId] });
        },
    });
};
