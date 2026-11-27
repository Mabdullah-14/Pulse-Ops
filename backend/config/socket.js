const { Server } = require('socket.io');
const { and, eq } = require('drizzle-orm');
const {db} = require('../config/db')
const {organizationMembers} = require('../database/schema/organization_members')
const { socketMiddleware } = require('../middleware/socketMiddleware');

let io;

async function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
            credentials: true,
        },
        transports:['polling','websocket']
    });

    io.use(socketMiddleware);

    io.on('connection', (socket) => {
        socket.on('join_org', async (orgId) => {
            try {
                if (!orgId) return;
                const userId = socket.user?.id || socket.user?.userId;

                const membership = await db.query.organizationMembers.findFirst({
                    where: and(
                        eq(organizationMembers.organizationsId, orgId),
                        eq(organizationMembers.userId, userId)
                    ),
                });

                if (!membership) {
                    return socket.emit('socket_error', {
                        message: 'Access Denied: Not a member of this organization',
                    });
                }

                socket.join(`org:${orgId}`);
            } catch (err) {
                console.error('JOIN ORG SOCKET ERROR:', err);
            }
        });

        socket.on('leave_org', (orgId) => {
            if (orgId) socket.leave(`org:${orgId}`);
        });
    });

    console.log('Socket initialized');
    return io;
}

function getIo() {
    if (!io) {
        throw new Error('Socket.IO was not initialized! Run initSocket(server) first');
    }
    return io;
}

module.exports = {
    initSocket,
    getIo,
};
