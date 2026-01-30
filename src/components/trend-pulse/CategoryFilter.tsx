'use client';

import type { TrendCategory } from '@/types/trend';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  selectedCategory: TrendCategory;
  onCategoryChange: (category: TrendCategory) => void;
}

const categories: TrendCategory[] = ['All', 'Tech', 'Crypto', 'Fashion', 'Entertainment', 'Sports'];

const categoryColors: Record<TrendCategory, string> = {
  All: 'bg-gradient-to-r from-cyan-500 to-magenta-500',
  Tech: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  Crypto: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  Fashion: 'bg-gradient-to-r from-pink-500 to-purple-500',
  Entertainment: 'bg-gradient-to-r from-red-500 to-pink-500',
  Sports: 'bg-gradient-to-r from-green-500 to-teal-500',
};

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Badge
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300
            ${
              selectedCategory === category
                ? `${categoryColors[category]} text-white shadow-lg shadow-cyan-500/50 scale-105`
                : 'bg-black/50 text-gray-400 hover:text-white border border-cyan-500/30 hover:border-cyan-500'
            }
          `}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
