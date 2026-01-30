'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export function TopHeader() {
  const [time, setTime] = useState<string>('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
              TrendPulse
            </h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-pulse">🔥</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
            TrendPulse
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-cyan-300">{time}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
