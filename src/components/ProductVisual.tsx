import React from 'react';

interface ProductVisualProps {
  imageKey: string;
  name: string;
  category?: string;
  variant?: string;
  className?: string;
  aspectRatio?: '4:5' | '16:9' | '1:1';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  imageKey,
  name,
  category,
  variant,
  className = '',
  aspectRatio = '4:5'
}) => {
  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : 'aspect-[4/5]';

  // Palette schemes for the fragrance families
  const getTheme = () => {
    switch (imageKey) {
      case 'sandalwood':
        return {
          bg: 'from-[#F5EFE6] via-[#E8DEC8] to-[#D5C2A5]',
          boxColor: '#B08D57',
          accent: '#8C6A35',
          tag: 'MYSORE CHANDAN',
          sticksColor: '#785536'
        };
      case 'kasturi':
        return {
          bg: 'from-[#F3ECE6] via-[#E2D4C8] to-[#CCAFA0]',
          boxColor: '#54202B',
          accent: '#B08D57',
          tag: 'VRINDAVAN KASTURI',
          sticksColor: '#4A3B32'
        };
      case 'loban':
        return {
          bg: 'from-[#F4F1EA] via-[#E5DFCE] to-[#CFC4A8]',
          boxColor: '#3F3B36',
          accent: '#B08D57',
          tag: 'KASHI BENZOIN',
          sticksColor: '#524A42'
        };
      case 'rose':
        return {
          bg: 'from-[#FAF1F2] via-[#F0DCDD] to-[#DCB2B6]',
          boxColor: '#54202B',
          accent: '#D47B88',
          tag: 'DAMASK ROSE',
          sticksColor: '#59383E'
        };
      case 'parijat':
        return {
          bg: 'from-[#F6F5ED] via-[#EBE6D4] to-[#D9D1B4]',
          boxColor: '#6B705C',
          accent: '#DDBEA9',
          tag: 'NIGHT JASMINE',
          sticksColor: '#60584C'
        };
      case 'giftbox':
        return {
          bg: 'from-[#F7F1E5] via-[#EBDCBA] to-[#D4BD88]',
          boxColor: '#54202B',
          accent: '#B08D57',
          tag: 'PANCHAMRIT SELECTION',
          sticksColor: '#8C6A35'
        };
      case 'vetiver':
        return {
          bg: 'from-[#F2F4EB] via-[#DEE4CE] to-[#C1CCAA]',
          boxColor: '#4A5340',
          accent: '#B08D57',
          tag: 'KHUS & GENDA',
          sticksColor: '#464D3F'
        };
      case 'havan':
        return {
          bg: 'from-[#F7EDE2] via-[#E8D4BE] to-[#CEB090]',
          boxColor: '#4A2810',
          accent: '#B08D57',
          tag: 'AGNIHOTRA HAVAN',
          sticksColor: '#3E2412'
        };
      case 'col_incense':
        return {
          bg: 'from-[#F4EFE6] via-[#E5DAC4] to-[#CDBEA0]',
          boxColor: '#54202B',
          accent: '#B08D57',
          tag: 'SACRED AGARBATTI',
          sticksColor: '#6A4D32'
        };
      case 'col_dhoop':
        return {
          bg: 'from-[#F0ECE1] via-[#DDD5C0] to-[#C3B89E]',
          boxColor: '#3A3835',
          accent: '#B08D57',
          tag: 'BAMBOOLEES DHOOP',
          sticksColor: '#4A4641'
        };
      case 'col_premium':
        return {
          bg: 'from-[#F8F4EC] via-[#E8DEC5] to-[#C8B892]',
          boxColor: '#B08D57',
          accent: '#54202B',
          tag: 'TEMPLE HARVEST',
          sticksColor: '#7D5F33'
        };
      case 'col_gift':
        return {
          bg: 'from-[#FAF2E6] via-[#EDDCB5] to-[#D6BD82]',
          boxColor: '#54202B',
          accent: '#B08D57',
          tag: 'FESTIVE HAMPER',
          sticksColor: '#8C6A35'
        };
      default:
        return {
          bg: 'from-[#F6F2EB] via-[#E8DFD0] to-[#D6C8B2]',
          boxColor: '#54202B',
          accent: '#B08D57',
          tag: 'FAGUN PERFUMERS',
          sticksColor: '#594F45'
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} bg-gradient-to-b ${theme.bg} flex items-center justify-center p-6 select-none group-hover:scale-[1.02] transition-transform duration-500 ease-out ${className}`}
    >
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle traditional Indian geometric lattice backdrop */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`pattern-${imageKey}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="8" fill="none" stroke="#25221F" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="4" fill="none" stroke="#B08D57" strokeWidth="0.5" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="#25221F" strokeWidth="0.25" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#25221F" strokeWidth="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pattern-${imageKey})`} />
      </svg>

      {/* Central luxury packaging representation */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[220px]">
        {/* Slender Incense Sticks fan-out preview behind box */}
        <div className="absolute -top-12 flex items-center justify-center space-x-1 opacity-80">
          <div
            className="w-1 h-14 origin-bottom -rotate-12 rounded-t-full shadow-sm"
            style={{ backgroundColor: theme.sticksColor }}
          />
          <div
            className="w-1 h-16 origin-bottom -rotate-6 rounded-t-full shadow-sm"
            style={{ backgroundColor: theme.sticksColor }}
          />
          <div
            className="w-1 h-16 origin-bottom rotate-0 rounded-t-full shadow-sm"
            style={{ backgroundColor: theme.sticksColor }}
          />
          <div
            className="w-1 h-16 origin-bottom rotate-6 rounded-t-full shadow-sm"
            style={{ backgroundColor: theme.sticksColor }}
          />
          <div
            className="w-1 h-14 origin-bottom rotate-12 rounded-t-full shadow-sm"
            style={{ backgroundColor: theme.sticksColor }}
          />
        </div>

        {/* The Luxury Cylinder / Box */}
        <div
          className="relative w-full rounded-sm shadow-xl border border-white/20 p-5 flex flex-col items-center text-center backdrop-blur-[2px]"
          style={{
            backgroundColor: theme.boxColor,
            boxShadow: '0 20px 30px -10px rgba(37, 34, 31, 0.25), 0 0 0 1px rgba(176, 141, 87, 0.3)'
          }}
        >
          {/* Gold Foil Top Border */}
          <div className="w-12 h-0.5 bg-[#B08D57] mb-3 opacity-80" />

          {/* Brand Seal Motif */}
          <div className="w-9 h-9 rounded-full border border-[#B08D57]/60 flex items-center justify-center mb-2 bg-black/10">
            <span className="font-serif text-[#B08D57] text-sm tracking-wider font-semibold">
              FP
            </span>
          </div>

          <p className="text-[9px] tracking-[0.25em] text-[#B08D57] font-medium uppercase mb-1">
            Fagun Perfumers
          </p>

          <h4 className="font-serif text-white text-base tracking-wide font-normal leading-tight line-clamp-2 px-1">
            {name}
          </h4>

          {variant && (
            <p className="text-[10px] text-white/70 font-light mt-1 tracking-wider line-clamp-1">
              {variant}
            </p>
          )}

          {/* Gold Foil Accent Seal */}
          <div className="mt-3 pt-2 border-t border-[#B08D57]/30 w-full flex items-center justify-center gap-2">
            <span className="text-[8px] tracking-[0.2em] text-[#B08D57] font-semibold uppercase">
              {theme.tag}
            </span>
          </div>
        </div>

        {/* Grounding Base Shadow */}
        <div className="w-4/5 h-3 bg-black/20 rounded-full blur-[6px] mt-1" />
      </div>

      {/* Discrete Corner Heritage Watermark */}
      <div className="absolute bottom-3 right-3 text-[9px] font-serif tracking-widest text-[#25221F]/40 uppercase pointer-events-none">
        Handcrafted · Bharat
      </div>
    </div>
  );
};
