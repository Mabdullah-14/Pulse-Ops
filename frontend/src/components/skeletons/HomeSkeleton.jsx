import React from 'react';
import  Skeleton  from './Skeleton';

export const HomeSkeleton = () => (
  <div className="space-y-6 sm:space-y-8">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-4"
        >
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      ))}
    </div>

    {/* Organizations Grid */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex min-h-[150px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
              <div className="min-w-0 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-14 shrink-0 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-3 w-full" />
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      ))}
    </div>
  </div>
);