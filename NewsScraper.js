import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, ExternalLink, AlertTriangle, Loader2, Globe, BookOpen } from 'lucide-react';

const NewsScraper = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showEthicalInfo, setShowEthicalInfo] = useState(false);

  const sampleArticles = [
    {
      id: 1,
      headline: "AI Revolution: New Machine Learning Breakthrough Changes Everything",
      author: "Dr. Sarah Chen",
      publicationDate: "2025-06-10",
      source: "TechNews Daily",
      url: "https://technews.com/ai-breakthrough",
      category: "technology",
      summary: "Researchers have developed a new AI model that can learn and adapt in real-time."
    },
    {
      id: 2,
      headline: "Global Climate Summit Reaches Historic Carbon Reduction Agreement",
      author: "Michael Rodriguez",
      publicationDate: "2025-06-09",
      source: "World Environmental News",
      url: "https://worldnews.com/climate-summit",
      category: "environment",
      summary: "World leaders commit to unprecedented carbon reduction targets."
    },
    {
      id: 3,
      headline: "Stock Market Soars as Tech Giants Report Record Q2 Earnings",
      author: "Jennifer Walsh",
      publicationDate: "2025-06-08",
      source: "Financial Times",
      url: "https://ft.com/market-record",
      category: "finance",
      summary: "Major technology companies exceeded earnings expectations."
    }
  ];

  const popularSources = [
    { name: "BBC News", url: "https://www.bbc.com/news", category: "general" },
    { name: "TechCrunch", url: "https://techcrunch.com", category: "technology" },
    { name: "Reuters", url: "https://www.reuters.com", category: "general" },
    { name: "The Verge", url: "https://www.theverge.com", category: "technology" }
  ];

  useEffect(() => {
    setArticles(sampleArticles);
  }, [sampleArticles]);

  const scrapeWebsite = async (url) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockScrapedData = [
        {
          id: Date.now(),
          headline: `Sample headline from ${new URL(url).hostname}`,
          author: "Web Scraper",
          publicationDate: new Date().toISOString().split('T')[0],
          source: new URL(url).hostname,
          url: url,
          category: "general",
          summary: "This is a simulated article extracted for demonstration purposes."
        }
      ];
      
      setArticles(prev => [...mockScrapedData, ...prev]);
      setCustomUrl('');
    } catch (err) {
      setError('Failed to scrape website. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedArticles = articles
    .filter(article => 
      filterKeyword === '' || 
      article.headline.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      article.category.toLowerCase().includes(filterKeyword.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      }
      return 0;
    });

  const handleScrapeSubmit = () => {
    if (customUrl.trim()) {
      scrapeWebsite(customUrl.trim());
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">News Scraper Dashboard</h1>
        <p className="text-gray-600 mb-6">Extract and analyze news content using Cheerio</p>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Access - Popular News Sources:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularSources.map((source, index) => (
              <button
                key={index}
                onClick={() => setCustomUrl(source.url)}
                className="p-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="truncate">{source.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-3">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter website URL to scrape..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleScrapeSubmit()}
            />
            <button
              onClick={handleScrapeSubmit}
              disabled={loading || !customUrl.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? 'Scraping...' : 'Scrape'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              placeholder="Filter by keyword..."
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="relevance">Sort by Relevance</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowEthicalInfo(!showEthicalInfo)}
          className="mb-4 flex items-center gap-2 text-orange-600 hover:text-orange-700"
        >
          <AlertTriangle className="w-4 h-4" />
          {showEthicalInfo ? 'Hide' : 'Show'} Ethical Considerations
        </button>

        {showEthicalInfo && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">Ethical Web Scraping Guidelines</h3>
            <div className="text-sm text-orange-700 space-y-2">
              <p><strong>When is scraping allowed?</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Public data that doesn't require authentication</li>
                <li>When explicitly permitted by the website's ToS</li>
                <li>For personal use, research, or journalism</li>
                <li>When respecting rate limits and robots.txt</li>
              </ul>
              
              <p><strong>Respecting robots.txt:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Always check website.com/robots.txt first</li>
                <li>Respect crawl delays and disallowed paths</li>
                <li>Use polite crawling with reasonable delays</li>
              </ul>
              
              <p><strong>Legal alternatives:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Official APIs (NewsAPI, RSS feeds)</li>
                <li>Licensed data providers</li>
                <li>Public datasets and archives</li>
                <li>Content syndication services</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Extracted Articles ({filteredAndSortedArticles.length})
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span>Demo Mode - Using Sample Data</span>
          </div>
        </div>
        
        {filteredAndSortedArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800 leading-tight pr-4">
                {article.headline}
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap font-medium">
                {article.category}
              </span>
            </div>
            
            {article.summary && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {article.summary}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Author:</span>
                <span>{article.author || 'Unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Date:</span>
                <span>{formatDate(article.publicationDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Source:</span>
                <span className="font-medium text-blue-600">{article.source}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Read Full Article
              </a>
              <span className="text-xs text-gray-400">
                ID: {article.id}
              </span>
            </div>
          </div>
        ))}
        
        {filteredAndSortedArticles.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No articles found. Try adjusting your filters or scrape a new website.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsScraper;