import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full animate-pulse space-y-8 mt-4">
      {/* Title Section Skeleton */}
      <div className="flex flex-col items-center space-y-3 mb-10">
        <div className="h-8 bg-slate-700/50 rounded-lg w-3/4 max-w-2xl"></div>
        <div className="h-5 bg-slate-800 rounded-lg w-48"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Summary Card Skeleton */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-5 h-5 bg-slate-700/50 rounded mr-2"></div>
              <div className="h-5 bg-slate-700/50 rounded w-32"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-700/30 rounded w-full"></div>
              <div className="h-4 bg-slate-700/30 rounded w-full"></div>
              <div className="h-4 bg-slate-700/30 rounded w-11/12"></div>
              <div className="h-4 bg-slate-700/30 rounded w-full"></div>
              <div className="h-4 bg-slate-700/30 rounded w-5/6"></div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700/30">
              <div className="h-4 bg-slate-700/30 rounded w-24 mb-3"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-slate-700/40 rounded-full w-20"></div>
                <div className="h-6 bg-slate-700/40 rounded-full w-24"></div>
                <div className="h-6 bg-slate-700/40 rounded-full w-16"></div>
              </div>
            </div>
          </div>

          {/* Timestamps Card Skeleton */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-5 h-5 bg-slate-700/50 rounded mr-2"></div>
              <div className="h-5 bg-slate-700/50 rounded w-40"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-6 bg-slate-800/80 rounded flex-shrink-0"></div>
                  <div className="h-6 bg-slate-700/30 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metadata Column Skeleton */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 h-fit sticky top-24">
          <div className="flex items-center mb-6">
            <div className="w-5 h-5 bg-slate-700/50 rounded mr-2"></div>
            <div className="h-5 bg-slate-700/50 rounded w-28"></div>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-3 bg-slate-700/30 rounded w-20 mb-2"></div>
                <div className="h-6 bg-slate-700/50 rounded w-32"></div>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-700/30">
                <div className="h-3 bg-slate-700/30 rounded w-16 mb-2"></div>
                <div className="h-6 bg-slate-700/50 rounded w-40 mb-1"></div>
                <div className="h-4 bg-slate-700/30 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

       {/* Channel Analysis Skeleton Row */}
       <div className="mt-8 space-y-6">
          <div className="h-8 bg-slate-700/50 rounded w-64 mb-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 h-80"></div>
             <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 h-80"></div>
          </div>
       </div>
    </div>
  );
};

export default SkeletonLoader;
