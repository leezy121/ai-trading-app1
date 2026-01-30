'use client';

import type { Trend } from '@/types/trend';
import { TrendCard } from './TrendCard';
import { BookmarkX } from 'lucide-react';

interface FavoritesPageProps {
  favorites: Trend[];
  onToggleFavorite: (trend: Trend) => void;
  onViewDetails: (trend: Trend) => void;
}

export function FavoritesPage({ favorites, onToggleFavorite, onViewDetails }: FavoritesPageProps) {
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <BookmarkX className="h-20 w-20 text-gray-600" />
        <p className="text-gray-400 text-lg">No favorites yet</p>
        <p className="text-gray-500 text-sm">Bookmark trends to save them for later</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
          Your Favorites
        </h2>
        <span className="text-sm text-gray-500">
          {favorites.length} {favorites.length === 1 ? 'trend' : 'trends'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((trend) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            isFavorite={true}
            onToggleFavorite={() => onToggleFavorite(trend)}
            onViewDetails={() => onViewDetails(trend)}
          />
        ))}
      </div>
    </div>
  );
}
