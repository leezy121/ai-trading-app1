'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Trend, TrendCategory } from '@/types/trend';
import { fetchAllTrends } from '@/lib/api';

export function useTrends() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  const loadTrends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllTrends();
      setTrends(data);
      setLastUpdated(Date.now());
    } catch (err) {
      setError('Failed to load trends. Please try again.');
      console.error('Error loading trends:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadTrends();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loadTrends]);

  const refreshTrends = useCallback(() => {
    loadTrends();
  }, [loadTrends]);

  const filterByCategory = useCallback((category: TrendCategory): Trend[] => {
    if (category === 'All') {
      return trends;
    }
    return trends.filter(trend => trend.category === category);
  }, [trends]);

  const searchTrends = useCallback((query: string): Trend[] => {
    if (!query.trim()) {
      return trends;
    }
    
    const searchLower = query.toLowerCase();
    return trends.filter(trend => 
      trend.title.toLowerCase().includes(searchLower) ||
      trend.description.toLowerCase().includes(searchLower) ||
      trend.source.toLowerCase().includes(searchLower)
    );
  }, [trends]);

  return {
    trends,
    loading,
    error,
    lastUpdated,
    refreshTrends,
    filterByCategory,
    searchTrends,
  };
}
