import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ExternalLink, Clock, Search } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState({
    world: [],
    pakistan: [],
    technology: [],
    business: []
  });
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState({});
  const [activeTab, setActiveTab] = useState('world');
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Simplified API configuration with reliable sources
  const API_CONFIGS = {
    world: [
      'https://feeds.bbci.co.uk/news/world/rss.xml',
      'https://feeds.reuters.com/reuters/topNews'
    ],
    pakistan: [
      'https://www.dawn.com/feeds/newspaper/front-page',
      'https://www.geo.tv/rss/1/1'
    ],
    technology: [
      'https://feeds.feedburner.com/TechCrunch',
      'https://feeds.reuters.com/reuters/technologyNews'
    ],
    business: [
      'https://feeds.reuters.com/reuters/businessNews',
      'https://feeds.bbci.co.uk/news/business/rss.xml'
    ]
  };

  // Clean category configuration
  const CATEGORY_CONFIG = {
    world: { name: 'World', icon: '🌍' },
    pakistan: { name: 'Pakistan', icon: '🇵🇰' },
    technology: { name: 'Technology', icon: '💻' },
    business: { name: 'Business', icon: '📊' }
  };

  const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

  // Simplified content filtering
  const filterRelevantContent = (articles, category) => {
    const keywords = {
      world: ['international', 'global', 'world', 'country'],
      pakistan: ['pakistan', 'karachi', 'lahore', 'islamabad'],
      technology: ['tech', 'AI', 'software', 'digital', 'innovation'],
      business: ['business', 'economy', 'finance', 'market', 'trade']
    };

    return articles.filter(article => {
      const content = (article.title + ' ' + article.description).toLowerCase();
      return keywords[category]?.some(keyword => content.includes(keyword)) || category === 'world';
    });
  };

  const fetchRSSNews = async (urls, category) => {
    const fetchPromises = urls.map(async (url) => {
      try {
        const response = await fetch(`${RSS_TO_JSON_API}${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
          let articles = data.items.slice(0, 10).map((item, index) => ({
            id: `${category}-${Date.now()}-${index}`,
            title: item.title || 'No title available',
            description: item.description ? 
              item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 
              'No description available',
            url: item.link || '#',
            urlToImage: item.enclosure?.link || 
                       `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop&auto=format`,
            publishedAt: item.pubDate || new Date().toISOString(),
            source: { name: data.feed?.title || 'News Source' },
            category: category
          }));

          return filterRelevantContent(articles, category);
        }
        return [];
      } catch (error) {
        console.warn(`Failed to fetch from ${url}:`, error.message);
        return [];
      }
    });

    try {
      const results = await Promise.allSettled(fetchPromises);
      return results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .filter(article => article && article.title)
        .slice(0, 8);
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      return generateFallbackNews(category);
    }
  };

  const fetchCategoryNews = useCallback(async (category) => {
    setCategoryLoading(prev => ({ ...prev, [category]: true }));
    
    try {
      const categoryNews = await fetchRSSNews(API_CONFIGS[category] || [], category);
      setNews(prev => ({
        ...prev,
        [category]: categoryNews.length > 0 ? categoryNews : generateFallbackNews(category)
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

  const generateFallbackNews = (category) => {
    const fallbackData = {
      world: [
        {
          id: `fallback-${category}-1`,
          title: "Global Markets Show Resilience Amid Economic Challenges",
          description: "International markets demonstrate stability as economies navigate through ongoing uncertainties with strategic policy implementations.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&auto=format",
          publishedAt: new Date().toISOString(),
          source: { name: "Global News" },
          category
        }
      ],
      pakistan: [
        {
          id: `fallback-${category}-1`,
          title: "Pakistan's Digital Infrastructure Development Accelerates",
          description: "Government initiatives in technology and connectivity are driving significant improvements across urban and rural areas.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop&auto=format",
          publishedAt: new Date().toISOString(),
          source: { name: "Pakistan Today" },
          category
        }
      ],
      technology: [
        {
          id: `fallback-${category}-1`,
          title: "AI Innovation Continues to Transform Industries",
          description: "Latest developments in artificial intelligence are creating new opportunities and reshaping traditional business models globally.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&auto=format",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech News" },
          category
        }
      ],
      business: [
        {
          id: `fallback-${category}-1`,
          title: "Market Analysis: Sustainable Growth Strategies Gain Momentum",
          description: "Companies worldwide are adopting innovative approaches to balance profitability with environmental and social responsibility.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format",
          publishedAt: new Date().toISOString(),
          source: { name: "Business Weekly" },
          category
        }
      ]
    };

    return fallbackData[category] || [];
  };

  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categories = Object.keys(API_CONFIGS);
      await Promise.all(categories.map(category => fetchCategoryNews(category)));
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to fetch latest news. Showing cached content.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabSwitch = async (category) => {
    setActiveTab(category);
    if (!news[category] || news[category].length === 0) {
      await fetchCategoryNews(category);
    }
  };

  useEffect(() => {
    fetchAllNews();
    const interval = setInterval(fetchAllNews, 1800000); // 30 minutes
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 60) return `${diffMins || 1}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  // Filter articles based on search term
  const filteredArticles = news[activeTab].filter(article =>
    searchTerm === '' || 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '2rem 1.5rem',
      textAlign: 'center'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '0.5rem',
      margin: '0'
    },
    subtitle: {
      color: '#6b7280',
      maxWidth: '32rem',
      margin: '0 auto',
      fontSize: '1rem',
      lineHeight: '1.5'
    },
    searchContainer: {
      marginTop: '1.5rem',
      maxWidth: '24rem',
      margin: '1.5rem auto 0',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      outline: 'none',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      width: '1rem',
      height: '1rem'
    },
    navigation: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    navContainer: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      gap: '2rem'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 0.5rem',
      borderBottom: '2px solid transparent',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      color: '#6b7280'
    },
    activeNavButton: {
      borderBottomColor: '#3b82f6',
      color: '#2563eb'
    },
    mainContent: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '2rem 1.5rem'
    },
    errorBanner: {
      backgroundColor: '#fef3cd',
      border: '1px solid #fbbf24',
      color: '#92400e',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      fontSize: '0.875rem'
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '3rem 0'
    },
    loadingText: {
      color: '#6b7280',
      marginTop: '1rem'
    },
    articlesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    articleCard: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column'
    },
    articleImage: {
      width: '100%',
      height: '12rem',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    articleContent: {
      padding: '1.5rem',
      flex: '1',
      display: 'flex',
      flexDirection: 'column'
    },
    articleTitle: {
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem',
      fontSize: '1rem',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      transition: 'color 0.2s ease'
    },
    articleDescription: {
      color: '#6b7280',
      fontSize: '0.875rem',
      marginBottom: '1rem',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      flex: '1',
      lineHeight: '1.5'
    },
    articleFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    articleSource: {
      fontWeight: '500',
      color: '#2563eb'
    },
    articleTime: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    noArticles: {
      textAlign: 'center',
      padding: '3rem 0'
    },
    noArticlesText: {
      color: '#6b7280',
      marginBottom: '1rem'
    },
    refreshButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s ease'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      maxWidth: '42rem',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    modalImageContainer: {
      position: 'relative'
    },
    modalImage: {
      width: '100%',
      height: '16rem',
      objectFit: 'cover'
    },
    modalCloseButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '2rem',
      height: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#ffffff',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      transition: 'background-color 0.2s ease'
    },
    modalBody: {
      padding: '1.5rem',
      overflowY: 'auto',
      flex: '1'
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '1rem',
      lineHeight: '1.4'
    },
    modalMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    modalMetaSource: {
      fontWeight: '500',
      color: '#2563eb'
    },
    modalText: {
      color: '#374151',
      marginBottom: '1.5rem',
      lineHeight: '1.6'
    },
    modalReadButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: '0.5rem',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s ease'
    },
    floatingButton: {
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      width: '3rem',
      height: '3rem',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 40,
      transition: 'all 0.2s ease'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h1 style={styles.title}>News Hub</h1>
          <p style={styles.subtitle}>Stay informed with curated news from trusted sources</p>
          
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <Search style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...styles.searchInput,
                ':focus': { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.navigation}>
        <div style={styles.navContainer}>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleTabSwitch(key)}
              style={{
                ...styles.navButton,
                ...(activeTab === key ? styles.activeNavButton : {})
              }}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.target.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.target.style.color = '#6b7280';
                }
              }}
            >
              <span>{config.icon}</span>
              <span>{config.name}</span>
              {categoryLoading[key] && (
                <RefreshCw style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {error && (
          <div style={styles.errorBanner}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={styles.loadingContainer}>
            <RefreshCw style={{ width: '2rem', height: '2rem', color: '#3b82f6', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={styles.loadingText}>Loading latest news...</p>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div style={styles.articlesGrid}>
              {filteredArticles.map(article => (
                <article
                  key={article.id}
                  style={styles.articleCard}
                  onClick={() => setSelectedArticle(article)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    const title = e.currentTarget.querySelector('[data-title]');
                    if (title) title.style.color = '#2563eb';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    const title = e.currentTarget.querySelector('[data-title]');
                    if (title) title.style.color = '#111827';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{ backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={styles.articleImage}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop&auto=format";
                      }}
                    />
                  </div>
                  <div style={styles.articleContent}>
                    <h3 data-title style={styles.articleTitle}>
                      {article.title}
                    </h3>
                    <p style={styles.articleDescription}>
                      {article.description}
                    </p>
                    <div style={styles.articleFooter}>
                      <span style={styles.articleSource}>{article.source.name}</span>
                      <div style={styles.articleTime}>
                        <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div style={styles.noArticles}>
                <p style={styles.noArticlesText}>
                  {searchTerm ? 'No articles match your search.' : 'No articles available.'}
                </p>
                <button
                  onClick={() => fetchCategoryNews(activeTab)}
                  style={styles.refreshButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                  }}
                >
                  <RefreshCw style={{ width: '1rem', height: '1rem' }} />
                  <span>Refresh</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div style={styles.modal} onClick={() => setSelectedArticle(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalImageContainer}>
              <img
                src={selectedArticle.urlToImage}
                alt={selectedArticle.title}
                style={styles.modalImage}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop&auto=format";
                }}
              />
              <button
                onClick={() => setSelectedArticle(null)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>{selectedArticle.title}</h2>
              <div style={styles.modalMeta}>
                <span style={styles.modalMetaSource}>{selectedArticle.source.name}</span>
                <span>{formatDate(selectedArticle.publishedAt)}</span>
              </div>
              <p style={styles.modalText}>{selectedArticle.description}</p>
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.modalReadButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                }}
              >
                <span>Read Full Article</span>
                <ExternalLink style={{ width: '1rem', height: '1rem' }} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Refresh Button */}
      <button
        onClick={() => fetchCategoryNews(activeTab)}
        style={styles.floatingButton}
        disabled={categoryLoading[activeTab]}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#2563eb';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#3b82f6';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        <RefreshCw style={{
          width: '1.25rem', 
          height: '1.25rem',
          ...(categoryLoading[activeTab] && { animation: 'spin 1s linear infinite' })
        }} />
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default News;