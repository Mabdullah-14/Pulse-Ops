import React from 'react';
import  Skeleton  from './Skeleton';

export const WorkspaceLayoutSkeleton = () => (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 lg:flex-row">
        {/* Mobile Top Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex items-center gap-2.5">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-16 rounded" />
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white p-5 lg:flex">
            <div className="space-y-6">
                <Skeleton className="h-3 w-28" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-16 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-9 w-full rounded-lg" />
                    <Skeleton className="h-9 w-full rounded-lg" />
                    <Skeleton className="h-9 w-full rounded-lg" />
                    <Skeleton className="h-9 w-full rounded-lg" />
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-44" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-lg sm:w-32" />
                </div>
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        </main>
    </div>
);