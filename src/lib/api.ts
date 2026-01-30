import type { Trend, TrendCategory } from '@/types/trend';

// Fetch Reddit hot topics
export async function fetchRedditTrends(): Promise<Trend[]> {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocol: 'https',
        origin: 'www.reddit.com',
        path: '/r/all/hot.json?limit=15',
        method: 'GET',
        headers: {},
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Reddit trends');
    }

    const data = await response.json();
    const posts = data.data?.children || [];

    return posts.map((post: any, index: number) => {
      const postData = post.data;
      const category = categorizeRedditPost(postData.subreddit);
      
      return {
        id: `reddit-${postData.id}`,
        title: postData.title,
        source: `r/${postData.subreddit}`,
        category,
        popularityScore: Math.min(100, Math.floor(postData.ups / 100)),
        description: postData.selftext?.slice(0, 200) || 'Check out this trending post on Reddit',
        url: `https://www.reddit.com${postData.permalink}`,
        imageUrl: postData.thumbnail && postData.thumbnail.startsWith('http') ? postData.thumbnail : undefined,
        timestamp: postData.created_utc * 1000,
        sentiment: postData.ups > postData.downs ? 'positive' : 'neutral',
        chartData: generateMockChartData(postData.ups),
      };
    });
  } catch (error) {
    console.error('Error fetching Reddit trends:', error);
    return [];
  }
}

// Fetch CoinGecko crypto trends
export async function fetchCryptoTrends(): Promise<Trend[]> {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocol: 'https',
        origin: 'api.coingecko.com',
        path: '/api/v3/search/trending',
        method: 'GET',
        headers: {},
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch crypto trends');
    }

    const data = await response.json();
    const coins = data.coins || [];

    return coins.slice(0, 10).map((coin: any) => {
      const item = coin.item;
      return {
        id: `crypto-${item.id}`,
        title: `${item.name} (${item.symbol})`,
        source: 'CoinGecko',
        category: 'Crypto' as TrendCategory,
        popularityScore: item.market_cap_rank ? Math.max(1, 100 - item.market_cap_rank) : 50,
        description: `Rank #${item.market_cap_rank || 'N/A'} - ${item.name} is trending in crypto markets`,
        url: `https://www.coingecko.com/en/coins/${item.id}`,
        imageUrl: item.thumb || item.small,
        timestamp: Date.now(),
        sentiment: 'positive',
        chartData: generateMockChartData(item.market_cap_rank ? 100 - item.market_cap_rank : 50),
      };
    });
  } catch (error) {
    console.error('Error fetching crypto trends:', error);
    return [];
  }
}

// Fetch news trends from NewsAPI
export async function fetchNewsTrends(): Promise<Trend[]> {
  try {
    // Using NewsAPI.org free tier endpoint
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocol: 'https',
        origin: 'newsapi.org',
        path: '/v2/top-headlines?country=us&pageSize=15&apiKey=demo',
        method: 'GET',
        headers: {},
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news trends');
    }

    const data = await response.json();
    const articles = data.articles || [];

    return articles.map((article: any, index: number) => {
      const category = categorizeNews(article.title, article.description);
      
      return {
        id: `news-${index}-${Date.now()}`,
        title: article.title,
        source: article.source?.name || 'News',
        category,
        popularityScore: Math.floor(Math.random() * 50 + 50),
        description: article.description || article.content?.slice(0, 200) || 'Breaking news story',
        url: article.url,
        imageUrl: article.urlToImage,
        timestamp: new Date(article.publishedAt).getTime(),
        sentiment: 'neutral',
        relatedNews: [],
        chartData: generateMockChartData(Math.floor(Math.random() * 100)),
      };
    });
  } catch (error) {
    console.error('Error fetching news trends:', error);
    return [];
  }
}

// Fetch all trends
export async function fetchAllTrends(): Promise<Trend[]> {
  try {
    const [redditTrends, cryptoTrends, newsTrends] = await Promise.all([
      fetchRedditTrends(),
      fetchCryptoTrends(),
      fetchNewsTrends(),
    ]);

    const allTrends = [...redditTrends, ...cryptoTrends, ...newsTrends];
    
    // Sort by popularity score
    return allTrends.sort((a, b) => b.popularityScore - a.popularityScore);
  } catch (error) {
    console.error('Error fetching all trends:', error);
    return [];
  }
}

// Helper function to categorize Reddit posts
function categorizeRedditPost(subreddit: string): TrendCategory {
  const sub = subreddit.toLowerCase();
  
  if (sub.includes('tech') || sub.includes('programming') || sub.includes('gaming')) {
    return 'Tech';
  }
  if (sub.includes('crypto') || sub.includes('bitcoin') || sub.includes('ethereum')) {
    return 'Crypto';
  }
  if (sub.includes('fashion') || sub.includes('style')) {
    return 'Fashion';
  }
  if (sub.includes('movies') || sub.includes('music') || sub.includes('television')) {
    return 'Entertainment';
  }
  if (sub.includes('sports') || sub.includes('nba') || sub.includes('nfl') || sub.includes('soccer')) {
    return 'Sports';
  }
  
  return 'Entertainment';
}

// Helper function to categorize news
function categorizeNews(title: string, description: string): TrendCategory {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.match(/tech|ai|software|app|digital|cyber/)) {
    return 'Tech';
  }
  if (text.match(/crypto|bitcoin|blockchain|ethereum/)) {
    return 'Crypto';
  }
  if (text.match(/fashion|style|runway|designer/)) {
    return 'Fashion';
  }
  if (text.match(/movie|music|celebrity|entertainment|actor|singer/)) {
    return 'Entertainment';
  }
  if (text.match(/sport|game|player|team|championship|league/)) {
    return 'Sports';
  }
  
  return 'Entertainment';
}

// Generate mock chart data for visualization
function generateMockChartData(baseValue: number): Array<{ time: string; value: number }> {
  const now = Date.now();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const time = new Date(now - i * 3600000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const variance = Math.random() * 20 - 10;
    const value = Math.max(0, Math.min(100, baseValue + variance));
    data.push({ time, value: Math.floor(value) });
  }
  
  return data;
}
