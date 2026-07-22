import React, { useState } from 'react';
import { Sparkles, X, Copy, Check, RefreshCw, Heart } from 'lucide-react';
import { GeneratedPoem } from '../types';

interface AiPoemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiPoemModal: React.FC<AiPoemModalProps> = ({ isOpen, onClose }) => {
  const [recipientName, setRecipientName] = useState('প্রিয় বন্ধু (Dear Friend)');
  const [theme, setTheme] = useState('কাশফুলের দোলা ও ঢাকের আওয়াজ (Kash Phool & Dhak Beats)');
  const [mood, setMood] = useState('উৎসবমুখর ও আনন্দময় (Joyful Festive)');
  const [loading, setLoading] = useState(false);
  const [poemData, setPoemData] = useState<GeneratedPoem | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientName, theme, mood }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setPoemData(resData.data);
      } else if (resData.fallback) {
        setPoemData(resData.fallback);
      }
    } catch (err) {
      console.error('Error generating poem:', err);
      // Fallback
      setPoemData({
        bengaliTitle: 'কাশফুলের হাওয়ায় - Winds of Kash Phool',
        poemLines: [
          'কাশফুলের দোলা (Kash Phool sways) in autumn breeze so bright,',
          'ঢাকের কাঠিতে (Dhak beat resonates) through the starlit night.',
          'মা দুর্গার আগমন (Mother Durga arrives) to bless our hearth and home,',
          'শুভ শারদীয়া (Shubho Sharodiya) to all wherever you roam.'
        ],
        greetingText: 'May the festive rhythm of Dhak and the aroma of Shiuli flowers bring endless joy, peace, and prosperity to you and your family this Durga Puja 2026!',
        culturalNote: 'Kash Phool (silver feather grass) blooming along riverbanks signals the sacred onset of Sharodotsav in Bengal.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPoem = () => {
    if (!poemData) return;
    const fullText = `${poemData.bengaliTitle}\n\n${poemData.poemLines.join('\n')}\n\n${poemData.greetingText}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] max-w-2xl w-full rounded-3xl border-4 border-[#D97706] p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#D97706]" />
            <h3 className="font-bengali-serif text-xl font-bold text-[#7F1D1D]">
              এআই আগমনী কবিতা ও শুভেচ্ছা (AI Sharodiya Poet)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-gray-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
          <div>
            <label className="text-xs font-bold text-gray-700 font-bengali-sans block mb-1">
              যার উদ্দেশ্যে (Dedicated To):
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 font-bengali-sans block mb-1">
              ভাবালুতা বা মেজাজ (Poetic Mood):
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            >
              <option>উৎসবমুখর ও আনন্দময় (Joyful Festive)</option>
              <option>স্মৃতিমেদুর ও নস্টালজিক (Nostalgic Memory)</option>
              <option>ভক্তি ও আধ্যাত্মিক (Devotional Spiritual)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-gray-700 font-bengali-sans block mb-1">
              মূল ভাবনা বা বিষয়বস্তু (Theme / Imagery):
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            >
              <option>কাশফুলের দোলা ও ঢাকের আওয়াজ (Kash Phool & Dhak Beats)</option>
              <option>শিউলি ফুলের গন্ধ ও শরতের আকাশ (Shiuli Fragrance & Autumn Skies)</option>
              <option>মহালয়ার ভোর ও মা দুর্গার আগমন (Mahalaya Dawn & Durga Arrival)</option>
              <option>বিজয়া দশমীর সিঁদুর খেলা ও কোলাকুলি (Dashami Sindoor Khela & Hugs)</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-[#D97706] to-[#991B1B] text-white font-bold text-xs rounded-xl font-bengali-sans shadow hover:opacity-95 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-[#FEF08A]" />
              <span>এআই কাব্য রচিত হচ্ছে... (Composing Poetry)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#FEF08A]" />
              <span>শুভ শারদীয়া কবিতা রচনা করুন (Generate Poem)</span>
            </>
          )}
        </button>

        {/* Generated Poem Card Output */}
        {poemData && (
          <div className="p-6 bg-gorod-texture rounded-2xl border-2 border-[#D97706] shadow-inner space-y-4 text-left">
            
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <h4 className="font-bengali-serif font-bold text-xl text-[#7F1D1D]">
                {poemData.bengaliTitle}
              </h4>
              <button
                onClick={handleCopyPoem}
                className="p-1.5 bg-white text-gray-700 rounded-lg border border-amber-300 hover:bg-amber-100 text-xs flex items-center gap-1"
                title="Copy Poem & Wish"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-bengali-sans hidden sm:inline">কপি করুন</span>
              </button>
            </div>

            {/* Verse Lines */}
            <div className="space-y-2 bg-white/90 p-4 rounded-xl border border-amber-200 shadow-sm">
              {poemData.poemLines.map((line, idx) => (
                <p key={idx} className="font-bengali-serif text-sm sm:text-base text-gray-900 font-medium">
                  {line}
                </p>
              ))}
            </div>

            {/* Heartfelt Sharodiya Greeting */}
            <div className="p-3 bg-amber-100/80 rounded-xl text-xs text-gray-800 space-y-1">
              <span className="font-bold text-[#991B1B] font-bengali-sans block">
                শারদীয়া শুভেচ্ছা বার্তা (Wish Message):
              </span>
              <p className="leading-relaxed">{poemData.greetingText}</p>
            </div>

            {/* Cultural Note */}
            {poemData.culturalNote && (
              <p className="text-[11px] text-gray-500 italic">
                Note: {poemData.culturalNote}
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
