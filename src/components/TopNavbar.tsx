import React from "react";
import { Bookmark, Moon, Sun, Type, Search, Download } from "lucide-react";

interface TopNavbarProps {
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  fontSize: "normal" | "large" | "larger";
  onCycleFontSize: () => void;
  onOpenSearch: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenBookmarks,
  bookmarksCount,
  isDark,
  onToggleTheme,
  fontSize,
  onCycleFontSize,
  onOpenSearch,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors border-b ${
        isDark
          ? "bg-[#1a1411]/90 border-[#85541e]/30 text-[#f5ebd7]"
          : "bg-[#faf7f2]/90 border-[#c6923b]/25 text-[#2c221e]"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Zone: Strict single element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6923b] rounded-md px-1 py-1"
        >
          <span className="text-[#c6923b] font-serif text-xl sm:text-2xl font-bold tracking-tight select-none">
            ॐ
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-tight group-hover:text-[#c6923b] transition-colors leading-tight">
              ಶಾಸ್ತ್ರ ನಿರಂತರ ದರ್ಶನ
            </span>
            <span className="text-[10px] uppercase tracking-wider opacity-60 hidden xs:inline">
              Shastra Nirantara
            </span>
          </div>
        </a>

        {/* Navigation links - hidden on mobile, visible on md+ */}
        {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#articles-section"
            className="hover:text-[#c6923b] transition-colors whitespace-nowrap"
          >
            ವಿಮರ್ಶಾ ಲೇಖನಗಳು
          </a>
          <a
            href="#deity-section"
            className="hover:text-[#c6923b] transition-colors whitespace-nowrap"
          >
            ದೇವತಾ ಮಾಧ್ಯಮ
          </a>
          <a
            href="#invocation-section"
            className="hover:text-[#c6923b] transition-colors whitespace-nowrap"
          >
            ಮಂಗಲಾಚರಣೆ
          </a>
          <a
            href="#about-section"
            className="hover:text-[#c6923b] transition-colors whitespace-nowrap"
          >
            ಪರಿಚಯ
          </a>
        </nav> */}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Download ZIP */}
          {/* <a
            href="/shastra-nirantara-darshana.zip"
            download="shastra-nirantara-darshana.zip"
            aria-label="ಪ್ರಾಜೆಕ್ಟ್ ಜಿಪ್ ಡೌನ್‌ಲೋಡ್ (Download ZIP)"
            title="ಪ್ರಾಜೆಕ್ಟ್ ಜಿಪ್ ಡೌನ್‌ಲೋಡ್ (Download ZIP 1.2MB)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#c6923b]/15 text-[#9a6f23] dark:text-[#f0c375] hover:bg-[#c6923b] hover:text-white transition-all border border-[#c6923b]/30 shadow-2xs active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-sans">ZIP ಡೌನ್‌ಲೋಡ್</span>
            <span className="sm:hidden font-sans">ZIP</span>
          </a> */}

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            aria-label="ಹುಡುಕಿ"
            title="ಲೇಖನಗಳನ್ನು ಹುಡುಕಿ"
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
              isDark
                ? "hover:bg-[#2e231e] text-[#e0cfbb]"
                : "hover:bg-[#efe6d6] text-[#6b5847]"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Font Size Adjuster */}
          <button
            onClick={onCycleFontSize}
            aria-label="ಅಕ್ಷರ ಗಾತ್ರ ಬದಲಾಯಿಸಿ"
            title={`ಅಕ್ಷರ ಗಾತ್ರ: ${fontSize === "normal" ? "ಸಾಮಾನ್ಯ" : fontSize === "large" ? "ದೊಡ್ಡದು" : "ಅತಿ ದೊಡ್ಡದು"}`}
            className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
              isDark
                ? "hover:bg-[#2e231e] text-[#e0cfbb] border border-[#85541e]/40"
                : "hover:bg-[#efe6d6] text-[#6b5847] border border-[#c6923b]/30"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[11px]">
              {fontSize === "normal"
                ? "ಅ"
                : fontSize === "large"
                  ? "ಅ+"
                  : "ಅ++"}
            </span>
          </button>

          {/* Bookmarks Counter Button */}
          {/* <button
            onClick={onOpenBookmarks}
            aria-label="ಉಳಿಸಿದ ಲೇಖನಗಳು"
            title="ಉಳಿಸಿದ ಲೇಖನಗಳು"
            className={`relative p-2 rounded-lg transition-colors flex items-center justify-center ${
              isDark
                ? "hover:bg-[#2e231e] text-[#e0cfbb]"
                : "hover:bg-[#efe6d6] text-[#6b5847]"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c6923b] text-[10px] font-bold text-white shadow-sm">
                {bookmarksCount}
              </span>
            )}
          </button> */}

          {/* Dark / Parchment Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? "ಬೆಳಕಿನ ಮೋಡ್" : "ಕತ್ತಲೆಯ ಮೋಡ್"}
            title={isDark ? "ಬೆಳಕಿನ ಮೋಡ್" : "ಕತ್ತಲೆಯ ಮೋಡ್"}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
              isDark
                ? "hover:bg-[#2e231e] text-[#d9aa52]"
                : "hover:bg-[#efe6d6] text-[#8c571e]"
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
