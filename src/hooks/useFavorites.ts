'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Trend } from '@/types/trend';

const FAVORITES_KEY = 'trendpulse-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Trend[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: Trend[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, []);

  const addFavorite = useCallback((trend: Trend) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === trend.id);
      if (exists) {
        return prev;
      }
      const newFavorites = [...prev, trend];
      saveFavorites(newFavorites);
      return newFavorites;
    });
  }, [saveFavorites]);

  const removeFavorite = useCallback((trendId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.id !== trendId);
      saveFavorites(newFavorites);
      return newFavorites;
    });
  }, [saveFavorites]);

  const isFavorite = useCallback((trendId: string): boolean => {
    return favorites.some(fav => fav.id === trendId);
  }, [favorites]);

  const toggleFavorite = useCallback((trend: Trend) => {
    if (isFavorite(trend.id)) {
      removeFavorite(trend.id);
    } else {
      addFavorite(trend);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
