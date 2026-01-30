'use client';

import type { Trend } from '@/types/trend';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, Calendar, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

interface TrendDetailsProps {
  trend: Trend | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryColors: Record<string, string> = {
  Tech: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Crypto: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Fashion: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
  Entertainment: 'bg-red-500/20 text-red-400 border-red-500/50',
  Sports: 'bg-green-500/20 text-green-400 border-green-500/50',
};

export function TrendDetails({ trend, open, onOpenChange }: TrendDetailsProps) {
  if (!trend) {
    return null;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trend.title,
        text: trend.description,
        url: trend.url,
      }).catch(() => {
        // User cancelled or error
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-gradient-to-br from-black to-gray-900 border-cyan-500/30">
        <SheetHeader className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <SheetTitle className="text-2xl font-bold text-white mb-3">
                {trend.title}
              </SheetTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={categoryColors[trend.category] || 'bg-gray-500/20 text-gray-400'}>
                  {trend.category}
                </Badge>
                <span className="text-sm text-gray-400">{trend.source}</span>
              </div>
            </div>
          </div>

          <SheetDescription className="text-gray-300">
            {trend.description}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Image */}
          {trend.imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-cyan-500/20">
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-gray-400">Popularity</span>
              </div>
              <p className="text-2xl font-bold text-cyan-400">{trend.popularityScore}</p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-magenta-500/10 to-purple-500/10 border border-magenta-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-magenta-400" />
                <span className="text-sm text-gray-400">Posted</span>
              </div>
              <p className="text-sm font-medium text-magenta-400">
                {format(trend.timestamp, 'MMM dd, yyyy')}
              </p>
            </div>
          </div>

          {/* Chart */}
          {trend.chartData && trend.chartData.length > 0 && (
            <div className="p-4 rounded-lg bg-black/50 border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Popularity Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trend.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#6ee7b7"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6ee7b7"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #06b6d4',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#6ee7b7' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ fill: '#22d3ee', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Sentiment */}
          {trend.sentiment && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Social Sentiment</h3>
              <p className="text-lg font-semibold text-green-400 capitalize">
                {trend.sentiment}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => window.open(trend.url, '_blank')}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Source
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
