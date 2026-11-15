import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, DEITY_MEDIA, ArticleItem } from './data/articles';
import { TopNavbar } from './components/TopNavbar';
import { HeroHeader } from './components/HeroHeader';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { DeityMediaSection } from './components/DeityMediaSection';
import { InvocationBanner } from './components/InvocationBanner';
import { BookmarksModal } from './components/BookmarksModal';
import { Footer } from './components/Footer';
import { Search, LayoutGrid, List, X, Filter, Check, Share2, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // Theme & Reading preferences (Persisted in localStorage)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('sn_theme') === 'dark';
  });
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>(() => {
    return (localStorage.getItem('sn_font_size') as 'normal' | 'large' | 'larger') || 'normal';
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sn_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync theme to localStorage and html tag
  useEffect(() => {
    localStorage.setItem('sn_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Sync font size
  useEffect(() => {
    localStorage.setItem('sn_font_size', fontSize);
  }, [fontSize]);

  // Sync bookmarks
  useEffect(() => {
    localStorage.setItem('sn_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
      showToast('ಲೇಖನವನ್ನು ಪಟ್ಟಿಯಿಂದ ತೆಗೆಯಲಾಗಿದೆ');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast('ಲೇಖನವನ್ನು ಉಳಿಸಲಾಗಿದೆ ✓');
    }
  };

  const handleShare = async (article: ArticleItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `${article.title} — ಶಾಸ್ತ್ರ ನಿರಂತರ ದರ್ಶನ`,
          url: article.url,
        });
        showToast('ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ!');
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(article.url);
      setCopiedId(article.id);
      showToast('ಫೇಸ್‌ಬುಕ್ ಲೇಖನದ ಲಿಂಕ್ ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!');
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      showToast('ಲಿಂಕ್ ಕಾಪಿ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const handleOpenArticle = (article: ArticleItem) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const handleCycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('larger');
    else setFontSize('normal');
  };

  // Filtered articles calculation
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' || art.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.categoryLabel.toLowerCase().includes(q) ||
        (art.scriptureRef && art.scriptureRef.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const bookmarkedArticlesList = useMemo(() => {
    return ARTICLES.filter((a) => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: ARTICLES.length,
      ಸೌಂದರ್ಯಲಹರೀ: 0,
      ಸಾಮೋಪಾಸನೆ: 0,
      ಗರುಡಪುರಾಣ: 0,
      ಶಂಕರತತ್ತ್ವ: 0,
    };
    ARTICLES.forEach((a) => {
      if (counts[a.category] !== undefined) {
        counts[a.category]++;
      }
    });
    return counts;
  }, []);

  // Text scaling class applied to root main container
  const fontSizeClass =
    fontSize === 'larger'
      ? 'text-lg [&_h1]:text-4xl sm:[&_h1]:text-6xl [&_h2]:text-2xl sm:[&_h2]:text-4xl [&_h3]:text-lg sm:[&_h3]:text-xl'
      : fontSize === 'large'
      ? 'text-base [&_h1]:text-3xl sm:[&_h1]:text-5xl [&_h2]:text-xl sm:[&_h2]:text-3xl [&_h3]:text-base sm:[&_h3]:text-lg'
      : '';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#18120e] text-[#f2e7d5]' : 'bg-[#faf7f2] text-[#2c221e]'
      } ${fontSizeClass}`}
    >
      {/* Top Navbar */}
      <TopNavbar
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarkedIds.length}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        fontSize={fontSize}
        onCycleFontSize={handleCycleFontSize}
        onOpenSearch={() => {
          const el = document.getElementById('search-input');
          el?.focus();
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      />

      {/* Hero Header with Shankaracharya circular artwork */}
      <HeroHeader
        isDark={isDark}
        onExploreClick={() => {
          const el = document.getElementById('articles-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onDeityClick={() => {
          const el = document.getElementById('deity-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14">
        {/* Section 1: Published Articles */}
        <section id="articles-section" className="scroll-mt-20">
          {/* Top Divider */}
          <div className="ornament-divider mb-8">
            <span className="text-[#c6923b] text-base select-none">✦</span>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-bold font-serif text-balance">
              ಪ್ರಕಟಿತ ವಿಮರ್ಶಾ ಲೇಖನಗಳು
            </h2>
            <p
              className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-[#b8a694]' : 'text-[#625143]'
              }`}
            >
              ಸೌಂದರ್ಯಲಹರೀ, ವಾಮದೇವ್ಯ ಸಾಮೋಪಾಸನೆ, ಗರುಡಪುರಾಣ ಮಣಿಮಾನ್ ಪ್ರಕ್ಷೇಪ ಮತ್ತು
              ಶಂಕರನಿಂದನೆಯ ಶಾಸ್ತ್ರೋಕ್ತ ಸತ್ಯಶೋಧನೆ.
            </p>
          </div>

          {/* Search Bar & View Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c6d48]" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ಲೇಖನಗಳು, ಶ್ಲೋಕ, ಉಪಾಸನೆ ಹುಡುಕಿ..."
                  className={`w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-[#221a15] border-[#85541e]/40 text-[#f5ebd7] placeholder-[#8c6d48] focus:border-[#c6923b] focus:ring-1 focus:ring-[#c6923b]'
                      : 'bg-white border-[#c6923b]/30 text-[#2c221e] placeholder-[#8c6d48] focus:border-[#c6923b] focus:ring-1 focus:ring-[#c6923b]'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="ಹುಡುಕಾಟ ರದ್ದುಮಾಡಿ"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8c6d48] hover:text-[#c6923b]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle (Grid vs List) */}
              <div
                className={`flex items-center self-end sm:self-auto p-1 rounded-lg border ${
                  isDark ? 'border-[#85541e]/30 bg-[#221a15]' : 'border-[#c6923b]/30 bg-[#f4ece0]'
                }`}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  title="ಗ್ರಿಡ್ ನೋಟ"
                  aria-label="ಗ್ರಿಡ್ ನೋಟ"
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#c6923b] text-white shadow-xs'
                      : 'text-[#8c6d48] hover:text-[#533f2d]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="ಪಟ್ಟಿ ನೋಟ (ಮೊಬೈಲ್ ಓದಿಗೆ ಸೂಕ್ತ)"
                  aria-label="ಪಟ್ಟಿ ನೋಟ"
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#c6923b] text-white shadow-xs'
                      : 'text-[#8c6d48] hover:text-[#533f2d]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: `ಎಲ್ಲಾ (${categoryCounts.all})` },
                { id: 'ಸೌಂದರ್ಯಲಹರೀ', label: `ಸೌಂದರ್ಯಲಹರೀ (${categoryCounts['ಸೌಂದರ್ಯಲಹರೀ']})` },
                { id: 'ಗರುಡಪುರಾಣ', label: `ಗರುಡಪುರಾಣ (${categoryCounts['ಗರುಡಪುರಾಣ']})` },
                { id: 'ಸಾಮೋಪಾಸನೆ', label: `ಸಾಮೋಪಾಸನೆ (${categoryCounts['ಸಾಮೋಪಾಸನೆ']})` },
                { id: 'ಶಂಕರತತ್ತ್ವ', label: `ಶಂಕರತತ್ತ್ವ (${categoryCounts['ಶಂಕರತತ್ತ್ವ']})` },
              ].map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
                      isActive
                        ? 'bg-[#c6923b] text-white shadow-sm'
                        : isDark
                        ? 'bg-[#241a14] text-[#c7b7a5] hover:bg-[#2e231e]'
                        : 'bg-[#ede5d6] text-[#5c493a] hover:bg-[#e4dac8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filter summary if searching */}
          {searchQuery && (
            <div className="mb-4 text-xs text-[#8c6d48] flex items-center justify-between">
              <span>"{searchQuery}" ಫಲಿತಾಂಶಗಳು: {filteredArticles.length} ಲೇಖನಗಳು</span>
              <button
                onClick={() => setSearchQuery('')}
                className="underline hover:text-[#c6923b] cursor-pointer"
              >
                ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ
              </button>
            </div>
          )}

          {/* Articles Grid or List */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4 rounded-2xl border border-dashed border-[#c6923b]/30">
              <BookOpen className="w-12 h-12 mx-auto text-[#c6923b]/40" />
              <h3 className="font-serif text-lg font-bold">ಯಾವುದೇ ಲೇಖನ ಸಿಗಲಿಲ್ಲ</h3>
              <p className="text-xs sm:text-sm text-[#8c6d48] max-w-sm mx-auto">
                ನೀವು ಹುಡುಕಿದ ಪದಕ್ಕೆ ಸರಿಹೊಂದುವ ಲೇಖನಗಳು ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಪದವನ್ನು ಬಳಸಿ ಹುಡುಕಿ.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#c6923b] text-white shadow cursor-pointer hover:bg-[#b07e2c] transition-colors"
              >
                ಎಲ್ಲಾ ಲೇಖನಗಳನ್ನು ತೋರಿಸಿ
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filteredArticles.map((article) => (
                <li key={article.id} className="h-full">
                  <ArticleCard
                    article={article}
                    viewMode="grid"
                    isDark={isDark}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectArticle={handleOpenArticle}
                    onShare={handleShare}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  viewMode="list"
                  isDark={isDark}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectArticle={handleOpenArticle}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Deity Media (Matching original site's 'ದೇವತಾ ಚಿತ್ರಗಳು' section) */}
        <DeityMediaSection mediaItems={DEITY_MEDIA} isDark={isDark} />

        {/* Sacred Invocation / Mangalacharana Banner */}
        <InvocationBanner isDark={isDark} />
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Article Preview / Reading Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        isDark={isDark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onClose={() => {
          setIsArticleModalOpen(false);
          setSelectedArticle(null);
        }}
        onToggleBookmark={handleToggleBookmark}
        onShare={handleShare}
        copiedId={copiedId}
      />

      {/* Bookmarks Drawer Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        isDark={isDark}
        bookmarkedArticles={bookmarkedArticlesList}
        onRemoveBookmark={handleToggleBookmark}
        onSelectArticle={handleOpenArticle}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#251e1a] text-[#f7eee2] text-xs font-medium shadow-2xl border border-[#c6923b]/50 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-[#c6923b]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
