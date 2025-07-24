import React, { useState, useEffect, useCallback } from 'react';

const News = () => {
  const [news, setNews] = useState({
    world: [],
    pakistan: [],
    pakArmy: [],
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
      pakArmy: [
        'https://www.dawn.com/feeds/newspaper/national',
        'https://www.thenews.com.pk/rss/1/6', // Defense section
        'https://www.radio.gov.pk/rss.xml'
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

  // Category configurations with specific filtering keywords
  const CATEGORY_CONFIG = {
    world: {
      name: '🌍 World News',
      color: '#3b82f6',
      keywords: ['international', 'global', 'world', 'countries', 'diplomatic'],
      excludeKeywords: ['pakistan', 'army', 'military', 'defense', 'tech', 'business', 'sport', 'health']
    },
    pakistan: {
      name: '🇵🇰 Pakistan',
      color: '#059669',
      keywords: ['pakistan', 'karachi', 'lahore', 'islamabad', 'sindh', 'punjab', 'balochistan', 'kpk'],
      excludeKeywords: ['army', 'military', 'defense', 'forces', 'tech', 'business', 'sport']
    },
    pakArmy: {
      name: '🛡️ Defense & Security',
      color: '#dc2626',
      keywords: ['army', 'military', 'defense', 'security', 'forces', 'navy', 'air force', 'ispr', 'coas'],
      excludeKeywords: ['civilian', 'politics', 'economy']
    },
    technology: {
      name: '💻 Technology',
      color: '#7c3aed',
      keywords: ['technology', 'tech', 'AI', 'software', 'digital', 'internet', 'computer', 'innovation'],
      excludeKeywords: ['army', 'military', 'sport', 'health']
    },
    business: {
      name: '💼 Business',
      color: '#ea580c',
      keywords: ['business', 'economy', 'finance', 'market', 'trade', 'investment', 'stock', 'economic'],
      excludeKeywords: ['army', 'military', 'sport', 'health', 'tech']
    },
    sports: {
      name: '⚽ Sports',
      color: '#16a34a',
      keywords: ['sport', 'football', 'cricket', 'tennis', 'match', 'game', 'player', 'tournament'],
      excludeKeywords: ['army', 'military', 'business', 'tech', 'health']
    },
    health: {
      name: '🏥 Health',
      color: '#e11d48',
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

      if (category === 'pakArmy') {
        return hasKeywords && !hasExcludedKeywords;
      }

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
      pakArmy: [
        {
          id: `fallback-army-1-${Date.now()}`,
          title: "Pakistan Armed Forces Conduct Joint Training Exercise",
          description: "Military units from all three services participate in comprehensive training operations to enhance readiness and coordination capabilities.",
          url: "#",
          urlToImage: "https://source.unsplash.com/random/800x600/?military,army",
          publishedAt: new Date().toISOString(),
          source: { name: "Defense Journal" },
          content: "The exercise involved multiple branches working together in simulated scenarios to test operational readiness...",
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

  // Improved styles with better spacing and visual hierarchy
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      padding: '30px 0',
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      margin: '0 0 15px 0',
      background: 'linear-gradient(135deg, #4e1faf 0%, #7c3aed 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      margin: '0 0 10px 0',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    lastUpdated: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      fontStyle: 'italic'
    },
    tabContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      maxWidth: '1200px',
      margin: '0 auto 40px auto',
      gap: '8px'
    },
    tab: {
      padding: '12px 20px',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
      color: '#64748b',
      textAlign: 'center',
      minWidth: '140px',
      position: 'relative'
    },
    activeTab: {
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
    },
    newsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      margin: '0'
    },
    newsCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    newsImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderBottom: '1px solid #e2e8f0'
    },
    newsContent: {
      padding: '20px',
      flex: '1',
      display: 'flex',
      flexDirection: 'column'
    },
    newsTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '12px',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    newsDescription: {
      color: '#64748b',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '20px',
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
      paddingTop: '15px',
      borderTop: '1px solid #f1f5f9',
      marginTop: 'auto'
    },
    newsSource: {
      fontWeight: '600',
      color: '#3b82f6',
      fontSize: '0.85rem'
    },
    newsDate: {
      color: '#94a3b8',
      fontSize: '0.8rem'
    },
    loading: {
      textAlign: 'center',
      padding: '80px 20px',
      fontSize: '1.3rem',
      color: '#64748b'
    },
    categoryLoading: {
      textAlign: 'center',
      padding: '40px 20px',
      fontSize: '1.1rem',
      color: '#64748b'
    },
    error: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#ef4444',
      fontSize: '1.2rem',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '15px',
      margin: '20px 0'
    },
    refreshButton: {
      backgroundColor: '#4e1faf',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '10px',
      cursor: 'pointer',
      marginTop: '15px',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '20px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative'
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
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: '25px'
    },
    modalTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '15px',
      lineHeight: '1.3'
    },
    modalMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '1px solid #e2e8f0'
    },
    modalText: {
      color: '#374151',
      fontSize: '1rem',
      lineHeight: '1.7',
      marginBottom: '25px'
    },
    readMoreButton: {
      backgroundColor: '#4e1faf',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease'
    },
    noNews: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b',
      fontSize: '1.2rem',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    },
    statsContainer: {
      textAlign: 'center',
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    statsTitle: {
      margin: '0 0 15px 0',
      color: '#1e293b',
      fontSize: '1.3rem'
    },
    statsGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap'
    },
    statItem: {
      padding: '10px 15px',
      backgroundColor: '#4e1faf',
      color: 'white',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      minWidth: '120px'
    },
    totalArticles: {
      margin: '15px 0 0 0',
      color: '#64748b',
      fontSize: '0.9rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={{fontSize: '3rem', marginBottom: '20px'}}>📰</div>
          Fetching latest news from all categories...
          <div style={{fontSize: '0.9rem', marginTop: '10px', color: '#94a3b8'}}>
            Loading from multiple sources with enhanced filtering
          </div>
        </div>
      </div>
    );
  }

  if (error && Object.values(news).every(categoryNews => categoryNews.length === 0)) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <div style={{fontSize: '2rem', marginBottom: '15px'}}>⚠️</div>
          {error}
          <br />
          <button 
            style={styles.refreshButton}
            onClick={fetchAllNews}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#3b82f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4e1faf'}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentNews = news[activeTab] || [];
  const isCurrentCategoryLoading = categoryLoading[activeTab];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📰 Frontline Prep News Hub</h1>
        <p style={styles.subtitle}>Real-time updates from categorized sources worldwide</p>
        {lastUpdated[activeTab] && (
          <p style={styles.lastUpdated}>
            {CATEGORY_CONFIG[activeTab]?.name} last updated: {lastUpdated[activeTab]}
          </p>
        )}
        {error && (
          <p style={{color: '#f59e0b', fontSize: '0.9rem', marginTop: '10px'}}>
            ⚠️ Some sources unavailable - showing available content
          </p>
        )}
      </div>

      <div style={styles.tabContainer}>
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
          <button
            key={key}
            style={{
              ...styles.tab,
              ...(activeTab === key ? {
                ...styles.activeTab,
                backgroundColor: config.color
              } : {}),
              ...(categoryLoading[key] ? {
                opacity: 0.7,
                cursor: 'not-allowed'
              } : {})
            }}
            onClick={() => !categoryLoading[key] && handleTabSwitch(key)}
            disabled={categoryLoading[key]}
          >
            {config.name} ({news[key]?.length || 0})
            {categoryLoading[key] && (
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                fontSize: '0.8rem'
              }}>
                🔄
              </div>
            )}
          </button>
        ))}
      </div>

      {isCurrentCategoryLoading ? (
        <div style={styles.categoryLoading}>
          <div style={{fontSize: '2rem', marginBottom: '15px'}}>🔄</div>
          Loading {CATEGORY_CONFIG[activeTab]?.name} news...
        </div>
      ) : currentNews.length === 0 ? (
        <div style={styles.noNews}>
          <div style={{fontSize: '3rem', marginBottom: '20px'}}>📭</div>
          No {CATEGORY_CONFIG[activeTab]?.name} available at the moment.
          <br />
          <button 
            style={{...styles.refreshButton, marginTop: '20px'}}
            onClick={() => fetchCategoryNews(activeTab)}
          >
            Refresh {CATEGORY_CONFIG[activeTab]?.name}
          </button>
        </div>
      ) : (
        <div style={styles.newsGrid}>
          {currentNews.map((article) => (
            <div
              key={article.id}
              style={styles.newsCard}
              onClick={() => openArticleDetail(article)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                style={styles.newsImage}
                onError={(e) => {
                  e.target.src = `https://source.unsplash.com/random/800x600/?${article.category},news`;
                }}
              />
              <div style={styles.newsContent}>
                <h3 style={styles.newsTitle}>
                  {article.title}
                </h3>
                <p style={styles.newsDescription}>
                  {article.description}
                </p>
                <div style={styles.newsFooter}>
                  <span style={styles.newsSource}>
                    {article.source?.name || 'News Source'}
                  </span>
                  <span style={styles.newsDate}>
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedArticle && (
        <div style={styles.modal} onClick={closeArticleDetail}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <img
                src={selectedArticle.urlToImage}
                alt={selectedArticle.title}
                style={styles.modalImage}
                onError={(e) => {
                  e.target.src = `https://source.unsplash.com/random/800x600/?${selectedArticle.category},news`;
                }}
              />
              <button
                style={styles.closeButton}
                onClick={closeArticleDetail}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>
                {selectedArticle.title}
              </h2>
              <div style={styles.modalMeta}>
                <span style={styles.newsSource}>
                  {selectedArticle.source?.name}
                </span>
                <span style={styles.newsDate}>
                  {formatDate(selectedArticle.publishedAt)}
                </span>
              </div>
              <div style={styles.modalText}>
                {selectedArticle.content || selectedArticle.description}
              </div>
              {selectedArticle.url && selectedArticle.url !== '#' && (
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.readMoreButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4e1faf'}
                >
                  Read Full Article →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          style={{
            ...styles.refreshButton,
            fontSize: '1rem',
            padding: '12px 25px'
          }}
          onClick={fetchAllNews}
          disabled={loading}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4e1faf')}
        >
          {loading ? '🔄 Refreshing All...' : '🔄 Refresh All Categories'}
        </button>
        
        <button
          style={{
            ...styles.refreshButton,
            fontSize: '1rem',
            padding: '12px 25px',
            backgroundColor: CATEGORY_CONFIG[activeTab]?.color || '#4e1faf'
          }}
          onClick={() => fetchCategoryNews(activeTab)}
          disabled={categoryLoading[activeTab]}
          onMouseEnter={(e) => !categoryLoading[activeTab] && (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => !categoryLoading[activeTab] && (e.target.style.opacity = '1')}
        >
          {categoryLoading[activeTab] ? '🔄 Refreshing...' : `🔄 Refresh ${CATEGORY_CONFIG[activeTab]?.name}`}
        </button>
      </div>

      <div style={styles.statsContainer}>
        <h3 style={styles.statsTitle}>
          📊 News Statistics
        </h3>
        <div style={styles.statsGrid}>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <div key={key} style={{
              ...styles.statItem,
              backgroundColor: config.color
            }}>
              {config.name.split(' ')[0]} {news[key]?.length || 0}
            </div>
          ))}
        </div>
        <p style={styles.totalArticles}>
          Total Articles: {Object.values(news).reduce((sum, categoryNews) => sum + categoryNews.length, 0)}
        </p>
      </div>
    </div>
  );
};

export default News;