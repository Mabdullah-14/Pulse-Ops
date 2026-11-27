import React from 'react';
import Skeleton from './Skeleton';

export const AuditLogsSkeleton = ({ rows = 6 }) => (
    <div className="w-full min-w-0">
        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="space-y-2.5 rounded-xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-3.5 w-40" />
                    <Skeleton className="h-3 w-full" />
                </div>
            ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
            <div className="divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="grid grid-cols-4 items-center gap-4 px-6 py-4">
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-3.5 w-32" />
                        <Skeleton className="h-3.5 w-48" />
                        <Skeleton className="h-3.5 w-28" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);