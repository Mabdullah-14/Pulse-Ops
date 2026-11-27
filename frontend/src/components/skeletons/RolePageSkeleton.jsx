import React from 'react';
import Skeleton from './Skeleton';

export const RolesPageSkeleton = ({ count = 4 }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="space-y-4 rounded-xl border border-gray-200 bg-white p-5"
            >
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-24" />
                <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
            </div>
        ))}
    </div>
);