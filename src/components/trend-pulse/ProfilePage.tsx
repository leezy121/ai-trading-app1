'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Bookmark, Eye, Clock } from 'lucide-react';

interface ProfilePageProps {
  favoritesCount: number;
  lastUpdated: number;
}

export function ProfilePage({ favoritesCount, lastUpdated }: ProfilePageProps) {
  const lastUpdateTime = new Date(lastUpdated).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
          Your Profile
        </h2>
        <p className="text-gray-400">Track your trending activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-cyan-500/20">
              <Bookmark className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Saved Favorites</p>
              <p className="text-3xl font-bold text-cyan-400">{favoritesCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-magenta-500/10 to-purple-500/10 border-magenta-500/30">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-magenta-500/20">
              <TrendingUp className="h-6 w-6 text-magenta-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Trends Viewed</p>
              <p className="text-3xl font-bold text-magenta-400">24</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-black/90 to-gray-900/90 border-cyan-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Activity Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-cyan-400" />
              <span className="text-gray-400">Last Updated</span>
            </div>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              {lastUpdateTime}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-magenta-400" />
              <span className="text-gray-400">Auto-refresh</span>
            </div>
            <Badge variant="outline" className="border-magenta-500/30 text-magenta-400">
              Every 5 minutes
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-black/90 to-gray-900/90 border-cyan-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">About TrendPulse</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          TrendPulse aggregates real-time global trends from Reddit, CoinGecko, and news sources. 
          Stay ahead of what's trending in tech, crypto, fashion, entertainment, and sports. 
          Bookmark your favorite trends and track their popularity over time.
        </p>
      </Card>
    </div>
  );
}
