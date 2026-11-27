import React from 'react';
import  Skeleton  from './Skeleton';

export const ProjectBoardSkeleton = ({ columns = 3 }) => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: columns }).map((_, colIdx) => (
            <div
                key={colIdx}
                className="space-y-3 rounded-xl border border-gray-200 bg-gray-100/70 p-3.5"
            >
                <div className="flex items-center justify-between px-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-5 w-7 rounded-full" />
                </div>
                {[1, 2, 3].map((cardIdx) => (
                    <div
                        key={cardIdx}
                        className="space-y-3 rounded-lg border border-gray-200 bg-white p-3.5"
                    >
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-3 w-full" />
                        <div className="flex items-center justify-between pt-1">
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
);