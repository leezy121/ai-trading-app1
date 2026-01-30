'use client';

import type { Trend } from '@/types/trend';
import { TrendCard } from './TrendCard';
import { Loader2 } from 'lucide-react';

interface TrendFeedProps {
  trends: Trend[];
  loading: boolean;
  isFavorite: (trendId: string) => boolean;
  onToggleFavorite: (trend: Trend) => void;
  onViewDetails: (trend: Trend) => void;
}

export function TrendFeed({ 
  trends, 
  loading, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetails 
}: TrendFeedProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
        <p className="text-gray-400">Loading trends...</p>
      </div>
    );
  }

  if (trends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-6xl opacity-50">🔍</div>
        <p className="text-gray-400 text-lg">No trends found</p>
        <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trends.map((trend) => (
        <TrendCard
          key={trend.id}
          trend={trend}
          isFavorite={isFavorite(trend.id)}
          onToggleFavorite={() => onToggleFavorite(trend)}
          onViewDetails={() => onViewDetails(trend)}
        />
      ))}
    </div>
  );
}
