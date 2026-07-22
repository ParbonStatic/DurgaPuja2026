import React, { useRef, useState, useEffect } from 'react';
import { PenTool, RotateCcw, Download, Sparkles, Layers, RefreshCw } from 'lucide-react';

export const AlpanaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [symmetry, setSymmetry] = useState<number>(8); // 4, 8, or 1 (none)
  const [color, setColor] = useState<string>('#FFFFFF');
  const [lineWidth, setLineWidth] = useState<number>(4);
  const [activeStamp, setActiveStamp] = useState<string | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 600;

    // Fill traditional dark crimson/terracotta background
    drawBackground(ctx);
  }, []);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#7F1D1D'; // Deep Crimson Terracotta
    ctx.fillRect(0, 0, 600, 600);

    // Subtle guide circle
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 300, 200, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300, 300, 100, 0, Math.PI * 2);
    ctx.stroke();
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, 600, 600);
    setHistory((prev) => [...prev.slice(-10), data]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = history[history.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    saveState();
    drawBackground(ctx);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    saveState();
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // If a motif stamp is selected, draw stamp at point
    if (activeStamp) {
      drawMotifStamp(ctx, activeStamp, x, y);
      setIsDrawing(false);
      return;
    }

    // Radial Symmetry Math
    const angleStep = (Math.PI * 2) / symmetry;

    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * angleStep);

      // Point relative to center
      const rx = x - centerX;
      const ry = y - centerY;

      ctx.beginPath();
      ctx.arc(rx, ry, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  };

  const drawMotifStamp = (ctx: CanvasRenderingContext2D, stamp: string, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    if (stamp === 'lotus') {
      // Lotus Petals
      for (let i = 0; i < 6; i++) {
        ctx.rotate((Math.PI * 2) / 6);
        ctx.beginPath();
        ctx.ellipse(0, -15, 8, 16, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (stamp === 'belpata') {
      // Bel Pata 3-leaf
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 12, 0, 0, Math.PI * 2);
      ctx.ellipse(-10, 5, 6, 12, -0.5, 0, Math.PI * 2);
      ctx.ellipse(10, 5, 6, 12, 0.5, 0, Math.PI * 2);
      ctx.stroke();
    } else if (stamp === 'conch') {
      // Conch Shell spiral
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI);
      ctx.stroke();
    }

    ctx.restore();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-bengali-alpana.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="alpana" className="py-20 bg-[#FFFDF7] border-t border-[#D97706]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] text-xs font-semibold">
            <PenTool className="w-3.5 h-3.5" />
            <span className="font-bengali-sans">ডিজিটাল পিঠুলি আল্পনা স্টুডিও</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#7F1D1D]">
            Digital Alpana & <span className="font-bengali-serif text-[#D97706]">আল্পনা ক্যানভাস</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base font-light">
            Draw sacred Bengali rice-paste floor patterns (আল্পনা) with automatic 4-way or 8-way radial symmetry. Select traditional motif stamps and export your creation!
          </p>
        </div>

        {/* Alpana Studio Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Canvas Element */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative p-3 bg-[#7F1D1D] rounded-3xl border-4 border-[#D97706] shadow-2xl overflow-hidden max-w-full">
              
              {/* Corner Traditional Alpana Frame Labels */}
              <div className="absolute top-2 left-3 text-[#FEF08A] text-xs font-bengali-serif">
                শুভ শারদীয়া আল্পনা
              </div>

              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-2xl cursor-crosshair bg-[#7F1D1D] touch-none shadow-inner"
              />
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="lg:col-span-5 bg-gorod-texture p-6 sm:p-8 rounded-3xl border-2 border-[#D97706]/40 shadow-xl space-y-6">
            
            <h3 className="font-bengali-serif font-bold text-xl text-[#7F1D1D] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
              আল্পনা ডিজাইন টুলস (Design Controls)
            </h3>

            {/* Symmetry Radial Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 font-bengali-sans block">
                সমমিতি বা প্রতিসাম্য (Symmetry Modes):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 8, labelBn: '৮-মুখী আল্পনা', labelEn: '8-Fold Mandala' },
                  { count: 4, labelBn: '৪-মুখী নকশা', labelEn: '4-Fold Square' },
                  { count: 1, labelBn: 'মুক্ত তুলি', labelEn: 'Freehand Stroke' }
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => {
                      setSymmetry(item.count);
                      setActiveStamp(null);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition ${
                      symmetry === item.count && !activeStamp
                        ? 'bg-[#991B1B] text-white border-[#D97706] shadow'
                        : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="font-bengali-sans">{item.labelBn}</div>
                    <div className="text-[10px] opacity-70">{item.labelEn}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 font-bengali-sans block">
                রং নির্বাচন (Rice Paste & Festival Colors):
              </label>
              <div className="flex items-center space-x-3">
                {[
                  { hex: '#FFFFFF', name: 'পিঠুলি সাদা (Rice Paste White)' },
                  { hex: '#FEF08A', name: 'গাঁদা হলুদ (Marigold Yellow)' },
                  { hex: '#DC2626', name: 'লাল সিঁদুর (Crimson Red)' },
                  { hex: '#F59E0B', name: 'স্বর্ণাভ (Gold Accent)' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    className={`w-9 h-9 rounded-full border-2 transition transform hover:scale-110 shadow-md ${
                      color === c.hex ? 'ring-4 ring-[#D97706]/50 border-black scale-110' : 'border-white'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Width Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                <span className="font-bengali-sans">তুলির বেধ (Stroke Width):</span>
                <span>{lineWidth}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-full accent-[#991B1B]"
              />
            </div>

            {/* Motif Stamp Tools */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 font-bengali-sans block">
                নকশার ছাপ (Motif Stamp Tools):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'lotus', labelBn: 'পদ্ম ফুল', icon: '🌸' },
                  { id: 'belpata', labelBn: 'বেল পাতা', icon: '🌿' },
                  { id: 'conch', labelBn: 'শঙ্খ সর্পি', icon: '🐚' }
                ].map((stamp) => (
                  <button
                    key={stamp.id}
                    onClick={() => setActiveStamp(activeStamp === stamp.id ? null : stamp.id)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activeStamp === stamp.id
                        ? 'bg-[#D97706] text-white border-[#991B1B] shadow'
                        : 'bg-white text-gray-800 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <span>{stamp.icon}</span>
                    <span className="font-bengali-sans">{stamp.labelBn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons: Undo, Clear, Download PNG */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-2">
              <button
                onClick={handleUndo}
                className="flex-1 px-3 py-2 bg-white border border-amber-300 text-gray-800 rounded-xl text-xs font-bold font-bengali-sans hover:bg-amber-100 transition flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                পূর্বাবস্থায় (Undo)
              </button>

              <button
                onClick={handleClear}
                className="flex-1 px-3 py-2 bg-white border border-amber-300 text-[#991B1B] rounded-xl text-xs font-bold font-bengali-sans hover:bg-red-50 transition flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                পুনরায় শুরু (Clear)
              </button>

              <button
                onClick={handleDownload}
                className="w-full px-4 py-2.5 bg-[#991B1B] hover:bg-[#7F1D1D] text-[#FEF08A] rounded-xl text-xs font-bold font-bengali-sans transition shadow flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                আল্পনা ডাউনলোড করুন (Download PNG)
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
