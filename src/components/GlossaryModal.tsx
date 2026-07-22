import React from 'react';
import { BENGALI_GLOSSARY } from '../data/pujaData';
import { BookMarked, X, Search } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!isOpen) return null;

  const filteredGlossary = BENGALI_GLOSSARY.filter(
    (item) =>
      item.wordBn.includes(searchTerm) ||
      item.phonetic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] max-w-2xl w-full rounded-3xl border-4 border-[#D97706] p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200">
          <div className="flex items-center space-x-2">
            <BookMarked className="w-5 h-5 text-[#991B1B]" />
            <h3 className="font-bengali-serif text-xl font-bold text-[#7F1D1D]">
              বাংলা শব্দকোষ (Bengali Vocabulary Guide)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-gray-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Bengali word or English meaning..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-amber-50 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
          />
        </div>

        {/* Glossary List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm space-y-1 hover:border-[#D97706] transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-bengali-serif font-bold text-lg text-[#991B1B]">
                  {item.wordBn}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-[#D97706] font-semibold">
                  {item.category}
                </span>
              </div>

              <div className="text-xs text-gray-700 font-medium">
                <span className="italic text-gray-500">[{item.phonetic}]</span> — {item.englishMeaning}
              </div>

              <p className="text-[11px] text-gray-600 leading-relaxed font-light pt-1 border-t border-gray-100">
                {item.culturalContext}
              </p>
            </div>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-xs">
              No vocabulary words matched your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#991B1B] text-white text-xs font-bold rounded-xl font-bengali-sans"
          >
            বন্ধ করুন (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
