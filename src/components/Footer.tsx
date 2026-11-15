import React from 'react';
import { ArrowUp, Facebook, Heart, Download } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="about-section"
      className={`border-t transition-colors mt-20 py-12 text-center ${
        isDark
          ? 'border-[#85541e]/40 bg-[#16100c] text-[#bdae9c]'
          : 'border-[#c6923b]/30 bg-[#f4ece0] text-[#5e4d3f]'
      }`}
    >
      <div className="mx-auto max-w-5xl px-5 space-y-6">
        {/* Sacred Sanskrit OM Ornament */}
        <div className="ornament-divider mx-auto max-w-xs">
          <span className="text-[#c6923b] font-serif font-bold text-sm tracking-widest select-none">
            ॥ ॐ ॥
          </span>
        </div>

        {/* Site Identity & Mission Statement */}
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#c6923b]">
            ಶಾಸ್ತ್ರ ನಿರಂತರ ದರ್ಶನ
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed">
            ಆದಿ ಶಂಕರ ಭಗವತ್ಪಾದರ ಅದ್ವೈತ ಸಿದ್ಧಾಂತ, ಶ್ರೀವಿದ್ಯಾ ಸೌಂದರ್ಯಲಹರೀ ರಹಸ್ಯಗಳು,
            ಮತ್ತು ಪೌರಾಣಿಕ ಅಪಪ್ರಚಾರಗಳ ಶಾಸ್ತ್ರೀಯ ನಿರಸನ ಕುರಿತ ಜ್ಞಾನನಿಧಿ.
          </p>
        </div>

        {/* Primary Notice & Download Action */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-xs text-[#8c6d48]">
            <Facebook className="w-3.5 h-3.5 text-[#1877f2]" />
            <span>ಎಲ್ಲಾ ಲೇಖನಗಳು ಫೇಸ್‌ಬುಕ್‌ನಲ್ಲಿ ಪ್ರಕಟವಾಗಿವೆ.</span>
          </div> */}

          {/* <a
            href="/shastra-nirantara-darshana.zip"
            download="shastra-nirantara-darshana.zip"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c6923b]/15 text-[#9a6f23] dark:text-[#f0c375] hover:bg-[#c6923b] hover:text-white transition-all text-xs font-semibold border border-[#c6923b]/30 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ಪ್ರಾಜೆಕ್ಟ್ ಜಿಪ್ ಡೌನ್‌ಲೋಡ್ (1.2 MB)</span>
          </a> */}
        </div>

        {/* Back to top & Copyright */}
        <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ಶಾಸ್ತ್ರ ನಿರಂತರ ದರ್ಶನ ಸಂಗ್ರಹ. ಸರ್ವೇ ಭವಂತು ಸುಖಿನಃ.</p>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer active:scale-95 ${
              isDark
                ? 'border-[#85541e]/40 hover:bg-[#261c17] text-[#e0cfbb]'
                : 'border-[#c6923b]/30 hover:bg-[#eae2d3] text-[#5a483a]'
            }`}
          >
            <span>ಮೇಲಕ್ಕೆ ಹೋಗಿ</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
