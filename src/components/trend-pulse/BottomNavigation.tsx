'use client';

import { Home, Globe, Bookmark, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type TabType = 'home' | 'categories' | 'favorites' | 'profile';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, icon: Home, label: 'Home' },
  { id: 'categories' as TabType, icon: Globe, label: 'Categories' },
  { id: 'favorites' as TabType, icon: Bookmark, label: 'Favorites' },
  { id: 'profile' as TabType, icon: UserCircle, label: 'Profile' },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyan-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center gap-1 h-auto py-2 px-4
                  transition-all duration-300
                  ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-gray-500 hover:text-cyan-400'
                  }
                `}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md"></div>
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
