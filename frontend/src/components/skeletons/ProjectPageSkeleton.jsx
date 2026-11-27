import React from 'react';
import Skeleton from './Skeleton';

export const ProjectsPageSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="flex flex-col justify-between space-y-4 rounded-xl border border-gray-200 bg-white p-5"
            >
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-5 w-12 rounded" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
        ))}
    </div>
);