'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Trend, TrendCategory } from '@/types/trend';
import { useTrends } from '@/hooks/useTrends';
import { useFavorites } from '@/hooks/useFavorites';
import { TopHeader } from '@/components/trend-pulse/TopHeader';
import { SearchBar } from '@/components/trend-pulse/SearchBar';
import { CategoryFilter } from '@/components/trend-pulse/CategoryFilter';
import { TrendFeed } from '@/components/trend-pulse/TrendFeed';
import { TrendDetails } from '@/components/trend-pulse/TrendDetails';
import { FavoritesPage } from '@/components/trend-pulse/FavoritesPage';
import { ProfilePage } from '@/components/trend-pulse/ProfilePage';
import { BottomNavigation, type TabType } from '@/components/trend-pulse/BottomNavigation';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { sdk } from "@farcaster/miniapp-sdk";

export default function TrendPulsePage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<TrendCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const { trends, loading, refreshTrends, filterByCategory, searchTrends, lastUpdated } = useTrends();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Initialize Farcaster SDK
  useEffect(() => {
    const initFarcasterSDK = () => {
      const checkSDK = () => {
        if (typeof window !== 'undefined' && (window as any).sdk?.actions?.ready) {
          (window as any).sdk.actions.ready();
          return true;
        }
        return false;
      };

      if (!checkSDK()) {
        const interval = setInterval(() => {
          if (checkSDK()) {
            clearInterval(interval);
          }
        }, 50);

        setTimeout(() => {
          clearInterval(interval);
        }, 5000);
      }
    };

    initFarcasterSDK();
  }, []);

  // Filter trends based on active tab, category, and search
  const displayedTrends = useMemo(() => {
    if (activeTab === 'favorites') {
      return favorites;
    }

    let filtered = trends;

    if (selectedCategory !== 'All') {
      filtered = filterByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = searchTrends(searchQuery);
    }

    return filtered;
  }, [activeTab, trends, favorites, selectedCategory, searchQuery, filterByCategory, searchTrends]);

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // Handle refresh
  const handleRefresh = () => {
    refreshTrends();
    toast.success('Trends refreshed!', {
      description: 'Latest data has been loaded',
    });
  };

  // Handle view details
  const handleViewDetails = (trend: Trend) => {
    setSelectedTrend(trend);
    setDetailsOpen(true);
  };

  // Handle toggle favorite
  const handleToggleFavorite = (trend: Trend) => {
    toggleFavorite(trend);
    const message = isFavorite(trend.id) ? 'Removed from favorites' : 'Added to favorites';
    toast.success(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <TopHeader />

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Home & Categories tabs */}
        {(activeTab === 'home' || activeTab === 'categories') && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />

              <Button
                onClick={handleRefresh}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white shrink-0"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Trends Feed */}
            <TrendFeed
              trends={displayedTrends}
              loading={loading}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={handleViewDetails}
            />
          </div>
        )}

        {/* Favorites tab */}
        {activeTab === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <ProfilePage
            favoritesCount={favorites.length}
            lastUpdated={lastUpdated}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Trend Details Modal */}
      <TrendDetails
        trend={selectedTrend}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
