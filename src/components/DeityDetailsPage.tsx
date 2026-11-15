import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { DeityMediaItem } from '../data/articles';

interface DeityDetailsPageProps {
  item: DeityMediaItem;
}

export const DeityDetailsPage: React.FC<DeityDetailsPageProps> = ({ item }) => {
  const isDark = localStorage.getItem('sn_theme') === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#18120e] text-[#f2e7d5]' : 'bg-[#faf7f2] text-[#2c221e]'
      }`}
    >
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <a
          href="/#deity-section"
          className={`mb-8 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
            isDark
              ? 'border-[#85541e]/40 text-[#c7b7a5] hover:bg-[#342720]'
              : 'border-[#c6923b]/30 text-[#625143] hover:bg-[#eae2d3]'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          ದೇವತಾ ಕಾರ್ಡ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ
        </a>

        <article className="space-y-6">
          <img
            src={item.image}
            alt={item.deityLabel}
            className="max-h-[28rem] w-full rounded-2xl border border-[#c6923b]/30 object-cover shadow-lg"
          />
          <header className="space-y-2">
            <p className="text-sm font-semibold text-[#c6923b]">{item.deityLabel}</p>
            <h1 className="font-serif text-2xl font-bold sm:text-4xl">{item.title}</h1>
            {item.duration && <p className="text-sm text-[#8c6d48]">{item.duration}</p>}
          </header>

          <div
            className={`space-y-5 text-sm leading-8 sm:text-base ${
              isDark ? 'text-[#dfd0be]' : 'text-[#423326]'
            }`}
          >
            <p>{item.description}</p>
            <p>
              {item.title} ವಿಷಯದ ಹಿನ್ನೆಲೆ, ಅದರಲ್ಲಿರುವ ಮುಖ್ಯ ವಿಚಾರಗಳು ಮತ್ತು
              {item.deityLabel} ಉಪಾಸನಾ ಪರಂಪರೆಯಲ್ಲಿನ ಅದರ ಮಹತ್ತ್ವವನ್ನು ಇಲ್ಲಿ
              ವಿವರವಾಗಿ ಓದಬಹುದು.
            </p>
            <p>
              ಈ ಪುಟವು {item.deityLabel} ಕುರಿತು ಪ್ರತ್ಯೇಕವಾಗಿ ಮೀಸಲಾಗಿದೆ. ಹೆಚ್ಚಿನ ವಿವರವಾದ
              ವಿಷಯವನ್ನು ನಂತರ ಸೇರಿಸಬಹುದು; ಸದ್ಯಕ್ಕೆ ಈ ಲೇಖನದ ಪರಿಚಯ ಮತ್ತು ಮುಖ್ಯ
              ಮಾಹಿತಿಯನ್ನು ಇಲ್ಲಿ ನೀಡಲಾಗಿದೆ.
            </p>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#c6923b] px-5 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-[#9a6f23]"
          >
            ಮೂಲ ವಿಡಿಯೋ ವೀಕ್ಷಿಸಿ
            <ExternalLink className="h-4 w-4" />
          </a>
        </article>
      </main>
    </div>
  );
};
