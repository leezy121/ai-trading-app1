'use client';

import type { Trend } from '@/types/trend';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TrendCardProps {
  trend: Trend;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
}

const categoryColors: Record<string, string> = {
  Tech: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Crypto: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Fashion: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
  Entertainment: 'bg-red-500/20 text-red-400 border-red-500/50',
  Sports: 'bg-green-500/20 text-green-400 border-green-500/50',
};

export function TrendCard({ trend, isFavorite, onToggleFavorite, onViewDetails }: TrendCardProps) {
  const timeAgo = formatDistanceToNow(trend.timestamp, { addSuffix: true });

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-black/90 to-gray-900/90 border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02]">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-magenta-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={categoryColors[trend.category] || 'bg-gray-500/20 text-gray-400'}>
                {trend.category}
              </Badge>
              <span className="text-xs text-gray-500">{trend.source}</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>

            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
              {trend.title}
            </h3>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className="shrink-0 hover:bg-cyan-500/20 transition-colors"
          >
            {isFavorite ? (
              <BookmarkCheck className="h-5 w-5 text-cyan-400" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400 group-hover:text-cyan-400" />
            )}
          </Button>
        </div>

        {/* Image */}
        {trend.imageUrl && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-black/50">
            <img
              src={trend.imageUrl}
              alt={trend.title}
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {trend.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">
              {trend.popularityScore}
            </span>
            <span className="text-xs text-gray-500">popularity</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewDetails}
              className="hover:bg-cyan-500/20 hover:text-cyan-400"
            >
              View Details
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(trend.url, '_blank')}
              className="h-8 w-8 hover:bg-magenta-500/20 hover:text-magenta-400"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
