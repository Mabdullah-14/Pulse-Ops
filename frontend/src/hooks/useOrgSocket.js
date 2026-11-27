import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSocket } from "../../context/SocketContext"
import { useAuth } from "../../context/AuthContext";
export const useOrgSocket = (orgId) => {
    const socket = useSocket();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket || !orgId) return;

        socket.emit("join_org", orgId);

        const handleIssueEvent = (payload) => {
            if (payload?.actorId && payload.actorId !== user?.id) {
                toast.info(payload.message || "Board updated");
            }
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
        };

        socket.on("ISSUE_CREATED", handleIssueEvent);
        socket.on("ISSUE_UPDATED", handleIssueEvent);
        socket.on("ISSUE_MOVED", handleIssueEvent);
        socket.on("ISSUE_DELETED", handleIssueEvent);

        return () => {
            socket.emit("leave_org", orgId);
            socket.off("ISSUE_CREATED", handleIssueEvent);
            socket.off("ISSUE_UPDATED", handleIssueEvent);
            socket.off("ISSUE_MOVED", handleIssueEvent);
            socket.off("ISSUE_DELETED", handleIssueEvent);
        };
    }, [socket, orgId, user?.id, queryClient]);
};
