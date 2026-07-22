import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'kash' | 'marigold' | 'sparkle';
  vx: number;
  vy: number;
  opacity: number;
  rotation: number;
}

export const CursorFollower: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const [, setTick] = useState(0);

  useEffect(() => {
    // Add bel-pata-cursor class to body
    if (enabled) {
      document.body.classList.add('bel-pata-cursor');
    } else {
      document.body.classList.remove('bel-pata-cursor');
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Spawn particles on movement
      if (enabled && Math.random() < 0.35) {
        const types: ('kash' | 'marigold' | 'sparkle')[] = ['kash', 'marigold', 'sparkle'];
        const type = types[Math.floor(Math.random() * types.length)];
        const colors = {
          kash: '#F8FAFC',
          marigold: '#F59E0B',
          sparkle: '#FDE047'
        };

        particlesRef.current.push({
          id: Math.random(),
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: type === 'kash' ? Math.random() * 8 + 6 : Math.random() * 6 + 4,
          color: colors[type],
          type,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.5 + 0.5, // float down softly
          opacity: 0.9,
          rotation: Math.random() * 360
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (!enabled) return;

      // Burst of marigold & Kash Phool petals on click
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = Math.random() * 3 + 2;
        particlesRef.current.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 6,
          color: i % 2 === 0 ? '#F59E0B' : '#DC2626',
          type: 'marigold',
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          opacity: 1,
          rotation: Math.random() * 360
        });
      }
    };

    const handleMouseUp = () => setIsClicking(false);

    // Track hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Particle animation loop
    const interval = setInterval(() => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          opacity: p.opacity - 0.025,
          rotation: p.rotation + 2
        }))
        .filter((p) => p.opacity > 0);

      setTick((t) => t + 1);
    }, 25);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(interval);
      document.body.classList.remove('bel-pata-cursor');
    };
  }, [enabled]);

  if (!enabled || pos.x < 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Particles trail */}
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full transition-opacity"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size * (p.type === 'kash' ? 1.8 : 1)}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: p.type === 'sparkle' ? '0 0 8px #fef08a' : 'none',
            borderRadius: p.type === 'kash' ? '50% 50% 20% 20%' : '50%'
          }}
        />
      ))}

      {/* Bel Pata Custom Cursor Follower Graphic */}
      <div
        className="absolute transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : isHovered ? 1.35 : 1}) rotate(${isHovered ? 15 : 0}deg)`,
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))'
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem of Bel Pata */}
          <path
            d="M18 24V33"
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Top Center Leaf */}
          <path
            d="M18 4C14.5 9 10 13 10 18C10 22.4 13.6 24 18 24C22.4 24 26 22.4 26 18C26 13 21.5 9 18 4Z"
            fill="#15803D"
            stroke="#FEF08A"
            strokeWidth="1.2"
          />
          <path
            d="M18 8V22"
            stroke="#4ADE80"
            strokeWidth="1"
            strokeDasharray="1 1"
          />

          {/* Left Leaf */}
          <path
            d="M14 18C9.5 15 4 16 2 20C0.2 23.6 3 26 7 25C11.5 24 13.5 20.5 14 18Z"
            fill="#166534"
            stroke="#FEF08A"
            strokeWidth="1"
          />

          {/* Right Leaf */}
          <path
            d="M22 18C26.5 15 32 16 34 20C35.8 23.6 33 26 29 25C24.5 24 22.5 20.5 22 18Z"
            fill="#166534"
            stroke="#FEF08A"
            strokeWidth="1"
          />

          {/* Sacred Golden Dot in Center */}
          <circle cx="18" cy="19" r="2.5" fill="#F59E0B" />
        </svg>
      </div>
    </div>
  );
};
