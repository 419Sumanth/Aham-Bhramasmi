import React, { useEffect, useState } from 'react';
import { ExternalLink, Play, Sparkles, X } from 'lucide-react';
import { DeityMediaItem } from '../data/articles';

interface DeityMediaSectionProps {
  mediaItems: DeityMediaItem[];
  isDark: boolean;
}

export const DeityMediaSection: React.FC<DeityMediaSectionProps> = ({
  mediaItems,
  isDark,
}) => {
  const [selectedDeity, setSelectedDeity] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<DeityMediaItem | null>(null);
  const filteredItems =
    selectedDeity === 'all'
      ? mediaItems
      : mediaItems.filter((item) => item.deity === selectedDeity);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const filters = [
    { id: 'all', label: `ಎಲ್ಲಾ (${mediaItems.length})` },
    { id: 'ಗಣಪತಿ', label: 'ಶ್ರೀ ಗಣಪತಿ' },
    { id: 'ಶಿವ', label: 'ಪರಮಶಿವ' },
    { id: 'ದೇವಿ', label: 'ಶ್ರೀ ಲಲಿತಾ' },
    { id: 'ಕೃಷ್ಣ', label: 'ಶ್ರೀಕೃಷ್ಣ' },
  ];

  return (
    <section id="deity-section" className="mt-14 scroll-mt-20 sm:mt-20">
      <div className="ornament-divider mb-8">
        <span className="select-none text-base text-[#c6923b]">✦</span>
      </div>

      <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
        <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#c6923b]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>ಉಪಾಸನಾ ದರ್ಶನ</span>
        </div>
        <h2 className="font-serif text-xl font-bold text-balance sm:text-3xl">
          ದೇವತಾ ಚಿತ್ರಗಳು ಹಾಗೂ ಪ್ರವಚನಗಳು
        </h2>
        <p className={`mt-2 text-xs leading-relaxed sm:text-sm ${isDark ? 'text-[#b8a694]' : 'text-[#625143]'}`}>
          ಶ್ರೀ ಗಣಪತಿ, ಪರಮಶಿವ, ಶ್ರೀ ಲಲಿತಾ ಪರಮೇಶ್ವರಿ ಹಾಗೂ ಶ್ರೀಕೃಷ್ಣನ ಪಾವನ ಸ್ವರೂಪ
          ಮತ್ತು ಉಪಾಸನಾ ವಿಚಾರಗಳು.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {filters.map((filter) => {
          const isActive = selectedDeity === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedDeity(filter.id)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 sm:text-sm ${
                isActive
                  ? 'bg-[#c6923b] text-white shadow-sm'
                  : isDark
                    ? 'bg-[#291e18] text-[#c7b7a5] hover:bg-[#342720]'
                    : 'bg-[#f0e7d8] text-[#5c493a] hover:bg-[#e7dcce]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <li key={item.id} className="h-full">
            <button
              type="button"
              onClick={() => setSelectedItem(item)}
              title={`${item.title} - ವಿವರಗಳನ್ನು ಓದಿ`}
              className={`group flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#c6923b] hover:shadow-lg ${
                isDark ? 'border-[#85541e]/30 bg-[#221a15]' : 'border-[#c6923b]/25 bg-white'
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#efe5d5]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-amber-200 backdrop-blur-xs">
                  {item.deityLabel}
                </span>
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c6923b]/95 text-white shadow-lg transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                <div>
                  <h3
                    className={`line-clamp-2 font-serif text-sm font-semibold leading-relaxed transition-colors sm:text-base ${
                      isDark
                        ? 'text-[#f5ebd7] group-hover:text-[#d8a349]'
                        : 'text-[#241a14] group-hover:text-[#9a6f23]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-1.5 line-clamp-2 text-[11px] leading-relaxed sm:text-xs ${
                      isDark ? 'text-[#b8a694]' : 'text-[#625143]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2.5 text-[11px] text-[#8c6d48] dark:border-white/5">
                  <span>{item.duration || 'ವಿಡಿಯೋ ಪ್ರವಚನ'}</span>
                  <span className="flex items-center gap-1 font-medium text-[#9a6f23] dark:text-[#d8a349]">
                    <span>ವಿವರಗಳು</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="deity-preview-title"
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-4"
        >
          <button
            type="button"
            aria-label="ಮುಚ್ಚಿ"
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />
          <div
            className={`relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl shadow-2xl sm:max-w-2xl sm:rounded-2xl ${
              isDark
                ? 'border sm:border-[#85541e]/40 bg-[#1f1713] text-[#f2e7d5]'
                : 'border sm:border-[#c6923b]/30 bg-[#faf6f0] text-[#2c2018]'
            }`}
          >
            <div
              className={`flex items-center justify-between border-b px-5 py-3.5 ${
                isDark ? 'border-[#85541e]/30 bg-[#261c17]' : 'border-[#c6923b]/20 bg-[#f2ece0]'
              }`}
            >
              <span className="text-sm font-semibold text-[#c6923b]">
                {selectedItem.deityLabel}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="ಮುಚ್ಚಿ"
                title="ಮುಚ್ಚಿ"
                className={`rounded-lg p-1.5 transition-colors ${
                  isDark
                    ? 'text-[#c7b7a5] hover:bg-[#342720] hover:text-white'
                    : 'text-[#705e4f] hover:bg-[#eae2d3] hover:text-black'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 overflow-y-auto p-5 sm:p-7">
              <img
                src={selectedItem.image}
                alt={selectedItem.deityLabel}
                className="max-h-72 w-full rounded-xl border border-[#c6923b]/30 object-cover"
              />
              <div>
                <h3 id="deity-preview-title" className="font-serif text-xl font-bold sm:text-2xl">
                  {selectedItem.title}
                </h3>
                {selectedItem.duration && (
                  <p className="mt-2 text-xs text-[#8c6d48]">{selectedItem.duration}</p>
                )}
              </div>
              <div
                className={`space-y-4 text-sm leading-relaxed sm:text-base ${
                  isDark ? 'text-[#dfd0be]' : 'text-[#423326]'
                }`}
              >
                <p>{selectedItem.description}</p>
                <p>
                  {selectedItem.deityLabel} ಸಂಬಂಧಿಸಿದ ಈ ವಿಷಯದಲ್ಲಿ ಇನ್ನಷ್ಟು ಹಿನ್ನೆಲೆ,
                  ಮುಖ್ಯ ವಿಚಾರಗಳು ಮತ್ತು ಉಪಾಸನಾ ಮಹತ್ತ್ವವನ್ನು ವಿವರವಾಗಿ ಓದಿ.
                </p>
              </div>
              <div
                className={`flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end ${
                  isDark ? 'border-[#85541e]/30' : 'border-[#c6923b]/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    isDark
                      ? 'border-[#85541e]/40 text-[#c7b7a5] hover:bg-[#342720]'
                      : 'border-[#c6923b]/30 text-[#625143] hover:bg-[#eae2d3]'
                  }`}
                >
                  ಮುಚ್ಚಿ
                </button>
                <a
                  href={`/deity/${selectedItem.id}`}
                  className="rounded-lg border border-[#c6923b]/50 bg-[#c6923b] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#9a6f23]"
                >
                  ವಿಸ್ತೃತವಾಗಿ ಓದಿ
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
