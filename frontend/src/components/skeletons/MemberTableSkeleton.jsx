import React from 'react';
import  Skeleton  from './Skeleton';

export const MembersTableSkeleton = ({ rows = 5 }) => (
  <div className="w-full min-w-0">
    {/* Mobile Cards */}
    <div className="space-y-3 md:hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="space-y-3 rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <Skeleton className="h-7 w-28 rounded-lg" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>

    {/* Desktop Table */}
    <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
      <div className="grid grid-cols-3 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-3.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-7 w-28 rounded-lg" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        ))}
      </div>
    </div>
  </div>
);