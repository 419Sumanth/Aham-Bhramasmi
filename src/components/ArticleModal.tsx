import React, { useEffect } from "react";
import { ArticleItem } from "../data/articles";
import {
  X,
  ExternalLink,
  Bookmark,
  Share2,
  Check,
  BookOpen,
  ScrollText,
} from "lucide-react";

interface ArticleModalProps {
  article: ArticleItem | null;
  isOpen: boolean;
  isDark: boolean;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  onShare: (article: ArticleItem) => void;
  copiedId: string | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  isDark,
  isBookmarked,
  onClose,
  onToggleBookmark,
  onShare,
  copiedId,
}) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div
        className={`relative w-full sm:max-w-2xl md:max-w-3xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all transform duration-300 ${
          isDark
            ? "bg-[#1f1713] text-[#f2e7d5] border sm:border-[#85541e]/40"
            : "bg-[#faf6f0] text-[#2c2018] border sm:border-[#c6923b]/30"
        }`}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            isDark
              ? "border-[#85541e]/30 bg-[#261c17]"
              : "border-[#c6923b]/20 bg-[#f2ece0]"
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c6923b]">
            <ScrollText className="w-4 h-4" />
            <span>{article.categoryLabel} ವಿಮರ್ಶೆ</span>
            {article.scriptureRef && (
              <>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span className="opacity-80 font-normal">
                  {article.scriptureRef}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              aria-label={isBookmarked ? "ಉಳಿಸಲಾಗಿದೆ" : "ಉಳಿಸಿ"}
              title={isBookmarked ? "ಉಳಿಸಲಾಗಿದೆ" : "ಉಳಿಸಿ"}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-[#c6923b] bg-[#c6923b]/10"
                  : isDark
                    ? "text-[#c7b7a5] hover:bg-[#342720]"
                    : "text-[#705e4f] hover:bg-[#eae2d3]"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>

            <button
              onClick={() => onShare(article)}
              aria-label="ಹಂಚಿಕೊಳ್ಳಿ"
              title="ಹಂಚಿಕೊಳ್ಳಿ"
              className={`p-1.5 rounded-lg transition-colors ${
                copiedId === article.id
                  ? "text-emerald-500 bg-emerald-500/10"
                  : isDark
                    ? "text-[#c7b7a5] hover:bg-[#342720]"
                    : "text-[#705e4f] hover:bg-[#eae2d3]"
              }`}
            >
              {copiedId === article.id ? (
                <Check className="w-4 h-4" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="ಮುಚ್ಚಿ"
              title="ಮುಚ್ಚಿ"
              className={`p-1.5 rounded-lg transition-colors ${
                isDark
                  ? "text-[#c7b7a5] hover:bg-[#342720] hover:text-white"
                  : "text-[#705e4f] hover:bg-[#eae2d3] hover:text-black"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Main Visual & Title */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={article.image}
              alt={article.title}
              className="w-full sm:w-44 aspect-square rounded-xl object-cover border-2 border-[#c6923b]/30 shadow-md"
            />
            <div className="flex-1 space-y-2">
              <div className="text-xs text-[#8c6d48] flex items-center gap-2">
                <span>{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>ಮೂಲ ಫೇಸ್‌ಬುಕ್ ಪ್ರಕಟಣೆ</span>
              </div>
              <h2
                id="modal-title"
                className="font-serif text-xl sm:text-2xl font-bold leading-snug tracking-tight"
              >
                {article.title}
              </h2>
            </div>
          </div>

          {/* Detailed Summary */}
          <div
            className={`p-4 rounded-xl border leading-relaxed text-sm sm:text-base ${
              isDark
                ? "bg-[#291e18] border-[#85541e]/30 text-[#dfd0be]"
                : "bg-[#f4efe4] border-[#c6923b]/25 text-[#423326]"
            }`}
          >
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#c6923b] mb-2">
              ಲೇಖನದ ತಾತ್ಪರ್ಯ ಮತ್ತು ಹಿನ್ನೆಲೆ
            </h3>
            <p>{article.summary}</p>
          </div>

          {/* Key Highlights */}
          {article.keyPoints && article.keyPoints.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-[#c6923b]">
                ಪ್ರಮುಖ ಶಾಸ್ತ್ರೀಯ ಮುಖ್ಯಾಂಶಗಳು
              </h3>
              <ul className="space-y-2">
                {article.keyPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm"
                  >
                    <span className="text-[#c6923b] font-bold text-base leading-none">
                      ✦
                    </span>
                    <span
                      className={isDark ? "text-[#cfbeab]" : "text-[#534335]"}
                    >
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scripture Citation Note */}
          <div className="pt-2 text-xs text-[#8c6d48] border-t border-black/5 dark:border-white/5 flex items-center justify-between">
            <span>
              ಶಾಸ್ತ್ರೀಯ ಆಕರ: {article.scriptureRef || "ಸನಾತನ ವೈದಿಕ ಸಂಪ್ರದಾಯ"}
            </span>
            <span>ಆದಿ ಶಂಕರ ಭಗವತ್ಪಾದರ ಕೃತಿ ವಿಚಾರ</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
            isDark
              ? "border-[#85541e]/30 bg-[#261c17]"
              : "border-[#c6923b]/20 bg-[#f2ece0]"
          }`}
        >
          {/* <div className="text-xs text-[#8c6d48] hidden sm:block">
            ಸಂಪೂರ್ಣ ಲೇಖನವನ್ನು ಲೇಖಕರ ಅಧಿಕೃತ ಫೇಸ್‌ಬುಕ್ ಪುಟದಲ್ಲಿ ಓದಿ
          </div> */}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className={`flex-1 sm:flex-none px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors border ${
                isDark
                  ? "border-[#85541e]/40 text-[#c7b7a5] hover:bg-[#342720]"
                  : "border-[#c6923b]/30 text-[#625143] hover:bg-[#eae2d3]"
              }`}
            >
              ಮುಚ್ಚಿ
            </button>

            <a
              href="/read-more"
              className={`flex-1 sm:flex-none px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors border text-center ${
                isDark
                  ? "border-[#85541e]/40 text-[#c7b7a5] hover:bg-[#342720]"
                  : "border-[#c6923b]/30 text-[#625143] hover:bg-[#eae2d3]"
              }`}
            >
              ವಿಸ್ತೃತವಾಗಿ ಓದಿ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};











