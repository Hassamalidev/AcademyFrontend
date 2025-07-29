import React, { useState, useEffect, useCallback } from 'react';

const News = () => {
  const [news, setNews] = useState({
    world: [],
    pakistan: [],
    technology: [],
    business: [],
    sports: [],
    health: []
  });
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState({});
  const [activeTab, setActiveTab] = useState('world');
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [lastUpdated, setLastUpdated] = useState({});

  // Enhanced API configurations with better category-specific sources
  const API_CONFIGS = {
    rss: {
      world: [
        'https://feeds.bbci.co.uk/news/world/rss.xml',
        'https://rss.cnn.com/rss/edition.rss',
        'https://feeds.reuters.com/reuters/topNews',
        'https://feeds.nbcnews.com/nbcnews/public/world'
      ],
      pakistan: [
        'https://www.dawn.com/feeds/newspaper/front-page',
        'https://www.dawn.com/feeds/newspaper/national',
        'https://www.geo.tv/rss/1/1',
        'https://www.thenews.com.pk/rss/1/1'
      ],
      technology: [
        'https://feeds.feedburner.com/TechCrunch',
        'https://rss.cnn.com/rss/edition_technology.rss',
        'https://feeds.reuters.com/reuters/technologyNews'
      ],
      business: [
        'https://feeds.reuters.com/reuters/businessNews',
        'https://rss.cnn.com/rss/money_latest.rss',
        'https://feeds.bbci.co.uk/news/business/rss.xml'
      ],
      sports: [
        'https://feeds.bbci.co.uk/sport/rss.xml',
        'https://rss.cnn.com/rss/edition_sport.rss',
        'https://feeds.reuters.com/reuters/sportsNews'
      ],
      health: [
        'https://feeds.reuters.com/reuters/health',
        'https://rss.cnn.com/rss/edition_health.rss',
        'https://feeds.bbci.co.uk/news/health/rss.xml'
      ]
    }
  };

  // Category configurations with subtle colors
  const CATEGORY_CONFIG = {
    world: {
      name: '🌍 World News',
      color: '#1f2937',
      keywords: ['international', 'global', 'world', 'countries', 'diplomatic'],
      excludeKeywords: ['pakistan', 'army', 'military', 'defense', 'tech', 'business', 'sport', 'health']
    },
    pakistan: {
      name: '🇵🇰 Pakistan',
      color: '#065f46',
      keywords: ['pakistan', 'karachi', 'lahore', 'islamabad', 'sindh', 'punjab', 'balochistan', 'kpk'],
      excludeKeywords: ['army', 'military', 'defense', 'forces', 'tech', 'business', 'sport']
    },
    technology: {
      name: '💻 Technology',
      color: '#581c87',
      keywords: ['technology', 'tech', 'AI', 'software', 'digital', 'internet', 'computer', 'innovation'],
      excludeKeywords: ['army', 'military', 'sport', 'health']
    },
    business: {
      name: '💼 Business',
      color: '#c2410c',
      keywords: ['business', 'economy', 'finance', 'market', 'trade', 'investment', 'stock', 'economic'],
      excludeKeywords: ['army', 'military', 'sport', 'health', 'tech']
    },
    sports: {
      name: '⚽ Sports',
      color: '#166534',
      keywords: ['sport', 'football', 'cricket', 'tennis', 'match', 'game', 'player', 'tournament'],
      excludeKeywords: ['army', 'military', 'business', 'tech', 'health']
    },
    health: {
      name: '🏥 Health',
      color: '#be123c',
      keywords: ['health', 'medical', 'hospital', 'doctor', 'disease', 'treatment', 'medicine', 'patient'],
      excludeKeywords: ['army', 'military', 'sport', 'business', 'tech']
    }
  };

  const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

  // Enhanced content filtering based on category
  const filterContentByCategory = (articles, category) => {
    const config = CATEGORY_CONFIG[category];
    if (!config) return articles;

    return articles.filter(article => {
      const title = article.title.toLowerCase();
      const description = (article.description || '').toLowerCase();
      const content = title + ' ' + description;

      const hasKeywords = config.keywords.some(keyword => 
        content.includes(keyword.toLowerCase())
      );

      const hasExcludedKeywords = config.excludeKeywords.some(keyword => 
        content.includes(keyword.toLowerCase())
      );

      return hasKeywords && !hasExcludedKeywords;
    });
  };

  const fetchRSSNews = async (urls, category) => {
    const fetchPromises = urls.map(async (url) => {
      try {
        const response = await fetch(`${RSS_TO_JSON_API}${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
          let articles = data.items.slice(0, 15).map((item, index) => ({
            id: `${category}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${index}`,
            title: item.title || 'No title available',
            description: item.description ? 
              item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 
              'No description available',
            url: item.link || '#',
            urlToImage: item.enclosure?.link || 
                       item.thumbnail || 
                       `https://source.unsplash.com/random/800x600/?${category},news&${Math.random()}`,
            publishedAt: item.pubDate || new Date().toISOString(),
            source: { 
              name: data.feed?.title || 'News Source' 
            },
            content: item.content ? 
              item.content.replace(/<[^>]*>/g, '').substring(0, 500) + '...' : 
              item.description?.replace(/<[^>]*>/g, '').substring(0, 500) + '...' || 
              'Content not available',
            category: category
          }));

          articles = filterContentByCategory(articles, category);
          
          return articles;
        }
        return [];
      } catch (error) {
        console.warn(`Failed to fetch from ${url}:`, error.message);
        return [];
      }
    });

    try {
      const results = await Promise.allSettled(fetchPromises);
      const allArticles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .filter(article => article && article.title)
        .slice(0, 12); 
      return allArticles;
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      return [];
    }
  };

  const fetchCategoryNews = useCallback(async (category) => {
    setCategoryLoading(prev => ({ ...prev, [category]: true }));
    
    try {
      const categoryNews = await fetchRSSNews(API_CONFIGS.rss[category] || [], category);
      
      setNews(prev => ({
        ...prev,
        [category]: categoryNews.length > 0 ? categoryNews : generateFallbackNews(category)
      }));

      setLastUpdated(prev => ({
        ...prev,
        [category]: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }));
      
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      setNews(prev => ({
        ...prev,
        [category]: generateFallbackNews(category)
      }));
    } finally {
      setCategoryLoading(prev => ({ ...prev, [category]: false }));
    }
  }, []);

  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categories = Object.keys(API_CONFIGS.rss);
      await Promise.all(categories.map(category => fetchCategoryNews(category)));
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(`Unable to fetch news: ${err.message}. Please check your internet connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackNews = (category) => {
    const fallbackNews = {
      world: [
        {
          id: `fallback-world-1-${Date.now()}`,
          title: "Global Markets Show Mixed Results Amid Economic Uncertainty",
          description: "International markets display varied performance as investors navigate ongoing economic challenges and policy changes worldwide.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?world,news",
          publishedAt: new Date().toISOString(),
          source: { name: "Global News Network" },
          content: "Economic indicators continue to show mixed signals across major markets...",
          category: category
        }
      ],
      pakistan: [
        {
          id: `fallback-pak-1-${Date.now()}`,
          title: "Pakistan's Economic Reforms Show Positive Trends",
          description: "Recent policy implementations demonstrate encouraging results in key economic sectors across the country.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?pakistan,news",
          publishedAt: new Date().toISOString(),
          source: { name: "Pakistan Today" },
          content: "Government initiatives in agriculture and technology sectors are yielding promising outcomes...",
          category: category
        }
      ],
      technology: [
        {
          id: `fallback-tech-1-${Date.now()}`,
          title: "AI Revolution Continues with New Breakthrough",
          description: "Latest developments in artificial intelligence are reshaping industries and creating new opportunities for innovation.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?technology,ai",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech Times" },
          content: "Researchers have unveiled new AI capabilities that could transform various sectors...",
          category: category
        }
      ],
      business: [
        {
          id: `fallback-biz-1-${Date.now()}`,
          title: "Stock Markets React to Federal Reserve Decision",
          description: "Financial markets show volatility following the latest monetary policy announcement from central banks.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?business,finance",
          publishedAt: new Date().toISOString(),
          source: { name: "Business Weekly" },
          content: "Investors are analyzing the implications of the recent policy changes on market dynamics...",
          category: category
        }
      ],
      sports: [
        {
          id: `fallback-sports-1-${Date.now()}`,
          title: "International Cricket Championship Updates",
          description: "Latest results from ongoing international cricket matches capturing global attention.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?sports,cricket",
          publishedAt: new Date().toISOString(),
          source: { name: "Sports Central" },
          content: "Teams are competing in high-stakes matches with significant implications for rankings...",
          category: category
        }
      ],
      health: [
        {
          id: `fallback-health-1-${Date.now()}`,
          title: "Medical Research Breakthrough in Treatment",
          description: "Scientists announce promising results from clinical trials for innovative treatment methods.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?health,medical",
          publishedAt: new Date().toISOString(),
          source: { name: "Medical Journal" },
          content: "The research findings could lead to new therapeutic approaches for patients...",
          category: category
        }
      ]
    };

    return fallbackNews[category] || [];
  };

  const handleTabSwitch = async (category) => {
    setActiveTab(category);
    
    if (!news[category] || news[category].length === 0) {
      await fetchCategoryNews(category);
    }
  };

  useEffect(() => {
    fetchAllNews();
    const interval = setInterval(fetchAllNews, 1200000); // 20 minutes
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (isNaN(diffMs)) return 'Recently';
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  const openArticleDetail = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleDetail = () => {
    setSelectedArticle(null);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && selectedArticle) {
        closeArticleDetail();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedArticle]);

  // Get trending topics from current news
  const getTrendingTopics = () => {
    const currentNews = news[activeTab] || [];
    const keywords = [];
    
    currentNews.forEach(article => {
      const words = article.title.toLowerCase().split(' ')
        .filter(word => word.length > 3 && !['with', 'from', 'this', 'that', 'they', 'will', 'have', 'been', 'said', 'says', 'news', 'after', 'more', 'over', 'than'].includes(word));
      keywords.push(...words.slice(0, 2));
    });

    const wordCount = {};
    keywords.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
  };

  // Clean, professional styles with white background
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px',
      padding: '48px 32px',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      position: 'relative'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '0 0 16px 0',
      color: '#1e293b',
      letterSpacing: '-0.025em'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#64748b',
      margin: '0 0 12px 0',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6'
    },
    lastUpdated: {
      fontSize: '0.875rem',
      color: '#94a3b8',
      fontStyle: 'italic'
    },
    tabContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '40px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '8px',
      border: '1px solid #e2e8f0',
      maxWidth: '1000px',
      margin: '0 auto 40px auto',
      gap: '4px'
    },
    tab: {
      padding: '12px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      backgroundColor: 'transparent',
      color: '#64748b',
      textAlign: 'center',
      minWidth: '120px',
      position: 'relative'
    },
    activeTab: {
      backgroundColor: '#ffffff',
      color: '#1e293b',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      fontWeight: '600'
    },
    newsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
      margin: '0'
    },
    newsCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    },
    newsImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    newsContent: {
      padding: '20px',
      flex: '1',
      display: 'flex',
      flexDirection: 'column'
    },
    newsTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '12px',
      lineHeight: '1.5',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    newsDescription: {
      color: '#64748b',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      marginBottom: '16px',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      flex: '1'
    },
    newsFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: '1px solid #e2e8f0',
      marginTop: 'auto'
    },
    newsSource: {
      fontWeight: '600',
      color: '#3b82f6',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    newsDate: {
      color: '#94a3b8',
      fontSize: '0.75rem'
    },
    loading: {
      textAlign: 'center',
      padding: '80px 20px',
      color: '#64748b',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      fontSize: '1.125rem'
    },
    categoryLoading: {
      textAlign: 'center',
      padding: '60px 20px',
      fontSize: '1rem',
      color: '#64748b',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    error: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#dc2626',
      fontSize: '1rem',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      margin: '20px 0'
    },
    refreshButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      marginTop: '16px'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    modalHeader: {
      position: 'relative'
    },
    modalImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      fontSize: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: '24px'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '16px',
      lineHeight: '1.4'
    },
    modalMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e2e8f0'
    },
    modalText: {
      color: '#374151',
      fontSize: '1rem',
      lineHeight: '1.7',
      marginBottom: '24px'
    },
    readMoreButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.2s ease'
    },
    noNews: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b',
      fontSize: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    trendingSection: {
      marginTop: '40px',
      padding: '24px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    trendingTitle: {
      color: '#1e293b',
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '20px'
    },
    trendingTags: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8px'
    },
    trendingTag: {
      padding: '6px 12px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      color: '#64748b',
      fontSize: '0.75rem',
      fontWeight: '500',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s ease'
    },
    floatingButton: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 100,
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      transition: 'all 0.2s ease'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>News Hub</h1>
        <p style={styles.subtitle}>Stay informed with the latest news from trusted sources around the world</p>
        <p style={styles.lastUpdated}>
          Last updated: {lastUpdated[activeTab] ? `${lastUpdated[activeTab]}` : 'Loading...'}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div style={styles.tabContainer}>
        {Object.keys(CATEGORY_CONFIG).map(category => (
          <button
            key={category}
            style={{
              ...styles.tab,
              ...(activeTab === category ? styles.activeTab : {})
            }}
            onClick={() => handleTabSwitch(category)}
            onMouseEnter={(e) => {
              if (activeTab !== category) {
                e.target.style.backgroundColor = '#f1f5f9';
                e.target.style.color = '#1e293b';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== category) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#64748b';
              }
            }}
          >
            {CATEGORY_CONFIG[category].name}
          </button>
        ))}
      </div>

      {/* Error Display */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Main Content Area */}
      {loading ? (
        <div style={styles.loading}>Loading news articles...</div>
      ) : categoryLoading[activeTab] ? (
        <div style={styles.categoryLoading}>Updating {CATEGORY_CONFIG[activeTab].name}...</div>
      ) : (
        <>
          {/* News Grid */}
          {news[activeTab].length === 0 ? (
            <div style={styles.noNews}>
              No articles found for {CATEGORY_CONFIG[activeTab].name}
              <button 
                style={styles.refreshButton} 
                onClick={() => fetchCategoryNews(activeTab)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                }}
              >
                Refresh News
              </button>
            </div>
          ) : (
            <div style={styles.newsGrid}>
              {news[activeTab].map(article => (
                <div 
                  key={article.id} 
                  style={styles.newsCard}
                  onClick={() => openArticleDetail(article)}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                  }}
                >
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    style={styles.newsImage}
                    onError={(e) => {                      e.target.src = `https://source.unsplash.com/random/800x600/?${article.category},news&${Math.random()}`;
                    }}
                  />
                  <div style={styles.newsContent}>
                    <h3 style={styles.newsTitle}>{article.title}</h3>
                    <p style={styles.newsDescription}>{article.description}</p>
                    <div style={styles.newsFooter}>
                      <span style={styles.newsSource}>{article.source.name}</span>
                      <span style={styles.newsDate}>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trending Topics Section */}
          {news[activeTab].length > 0 && (
            <div style={styles.trendingSection}>
              <h3 style={styles.trendingTitle}>Trending in {CATEGORY_CONFIG[activeTab].name}</h3>
              <div style={styles.trendingTags}>
                {getTrendingTopics().map((topic, index) => (
                  <span key={index} style={styles.trendingTag}>#{topic}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <img 
                src={selectedArticle.urlToImage} 
                alt={selectedArticle.title} 
                style={styles.modalImage}
                onError={(e) => {
                  e.target.src = `https://source.unsplash.com/random/800x600/?${selectedArticle.category},news&${Math.random()}`;
                }}
              />
              <button 
                style={styles.closeButton} 
                onClick={closeArticleDetail}
                aria-label="Close article"
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>{selectedArticle.title}</h2>
              <div style={styles.modalMeta}>
                <span style={styles.newsSource}>{selectedArticle.source.name}</span>
                <span style={styles.newsDate}>{formatDate(selectedArticle.publishedAt)}</span>
              </div>
              <p style={styles.modalText}>{selectedArticle.content}</p>
              <a 
                href={selectedArticle.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.readMoreButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                }}
              >
                Read Full Article
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Refresh Button */}
      <button 
        style={styles.floatingButton}
        onClick={() => fetchCategoryNews(activeTab)}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#2563eb';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#3b82f6';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Refresh News
      </button>
    </div>
  );
};

export default News;