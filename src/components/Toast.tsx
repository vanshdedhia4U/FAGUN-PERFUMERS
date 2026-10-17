import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in">
      <div className="bg-[#25221F] text-[#F8F4EC] px-4 py-3 rounded shadow-2xl border border-[#B08D57]/40 flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-[#B08D57] shrink-0" />
        <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
};
