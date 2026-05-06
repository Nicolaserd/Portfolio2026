import React, { useState, useEffect, useRef } from 'react';
import './ThemeToggle.css';

interface Star {
  id: number;
  sz: number;
  left: number;
  top: number;
  delay: number;
}

const CLOUDS = [
  { l: '11%', t: '25%', w: '17%', h: '8%', o: 0.55 },
  { l: '33%', t: '16%', w: '13%', h: '6%', o: 0.45 },
  { l: '70%', t: '27%', w: '20%', h: '9%', o: 0.6 },
  { l: '85%', t: '14%', w: '11%', h: '6%', o: 0.5 },
];

const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light';
  });
  const [slashing, setSlashing] = useState(false);
  const [direction, setDirection] = useState<'to-day' | 'to-night' | ''>('');
  const busyRef = useRef(false);

  const stars = useRef<Star[]>([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < 14; i++) {
      stars.current.push({
        id: i,
        sz: Math.random() * 1.5 + 0.8,
        left: Math.random() * 85 + 5,
        top: Math.random() * 55 + 5,
        delay: Math.random() * 2.6,
      });
    }
  }

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const flip = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    const goingDay = !isLight;
    setSlashing(true);
    setDirection(goingDay ? 'to-day' : 'to-night');

    /* Cambio de tema exactamente en el frame de impacto (50 % × 900 ms) */
    setTimeout(() => {
      setIsLight(goingDay);
    }, 450);

    setTimeout(() => {
      setSlashing(false);
      setDirection('');
      busyRef.current = false;
    }, 920);
  };

  const cls = [
    'kt-toggle',
    isLight ? 'is-day' : '',
    slashing ? 'slashing' : '',
    direction,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cls}
      onClick={flip}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          flip();
        }
      }}
      role="switch"
      aria-checked={isLight}
      tabIndex={0}
    >
      {/* Sky */}
      <div className="kt-sky">
        <div className="kt-layer kt-night" />
        <div className="kt-layer kt-day" />
      </div>

      {/* Stars */}
      <div className="kt-stars">
        {stars.current.map((s) => (
          <i
            key={s.id}
            style={{
              width: s.sz + 'px',
              height: s.sz + 'px',
              left: s.left + '%',
              top: s.top + '%',
              animationDelay: s.delay + 's',
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <div className="kt-clouds">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="kt-cloud"
            style={{ left: c.l, top: c.t, width: c.w, height: c.h, opacity: c.o }}
          />
        ))}
      </div>

      {/* Ground silhouette */}
      <div className="kt-ground">
        <svg viewBox="0 0 540 84" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,84 L0,55 L60,32 L120,52 L180,28 L240,48 L300,26 L360,46 L420,30 L480,52 L540,38 L540,84 Z"
            fill="rgba(0,0,0,.45)"
          />
          <path
            d="M0,84 L0,68 L80,54 L160,66 L240,52 L320,68 L400,56 L480,70 L540,60 L540,84 Z"
            fill="rgba(0,0,0,.55)"
          />
        </svg>
      </div>

      {/* Orb (sun / moon) */}
      <div className="kt-orb-wrap">
        <div className="kt-orb">
          <div className="kt-glow kt-moon-glow" />
          <div className="kt-glow kt-sun-glow" />
          <div className="kt-orb-rays-wrap">
            <div className="kt-rays" />
          </div>
          <div className="kt-half kt-l">
            <div className="kt-face kt-moon" />
            <div className="kt-face kt-sun" />
          </div>
          <div className="kt-half kt-r">
            <div className="kt-face kt-moon" />
            <div className="kt-face kt-sun" />
          </div>
        </div>
      </div>

      {/* Slash flash line */}
      <div className="kt-slash-line" />

      {/* Katana — hidden at rest, appears only during the slash */}
      <svg
        className="kt-katana"
        viewBox="0 0 520 36"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kt-bladeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#cfd6dc" />
            <stop offset=".25" stopColor="#ffffff" />
            <stop offset=".55" stopColor="#e5eaef" />
            <stop offset="1" stopColor="#9aa3ae" />
          </linearGradient>
          <linearGradient id="kt-edgeGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".15" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset=".95" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="kt-tsukaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2b2b2e" />
            <stop offset=".5" stopColor="#0e0e10" />
            <stop offset="1" stopColor="#2b2b2e" />
          </linearGradient>
        </defs>

        {/* Blade */}
        <polygon points="110,12 510,16 515,18 510,20 110,24" fill="url(#kt-bladeGrad)" />
        <rect x="115" y="17" width="395" height="1.2" fill="url(#kt-edgeGrad)" opacity=".95" />
        <path
          d="M115,21 Q200,22 280,21 T500,21"
          stroke="rgba(255,255,255,.35)"
          strokeWidth=".6"
          fill="none"
        />

        {/* Tsuba (guard) */}
        <rect x="95" y="6" width="14" height="24" rx="2" fill="#eef0f2" stroke="#9aa0a8" strokeWidth=".8" />
        <rect x="98" y="9" width="8" height="18" fill="#cfd3d8" />

        {/* Tsuka (handle) */}
        <rect x="8" y="9" width="86" height="18" rx="3" fill="url(#kt-tsukaGrad)" />
        <g stroke="#3a3a3e" strokeWidth=".7" fill="none" opacity=".9">
          <path d="M10,9 L24,27 M22,9 L36,27 M34,9 L48,27 M46,9 L60,27 M58,9 L72,27 M70,9 L84,27 M82,9 L94,25" />
          <path d="M10,27 L24,9 M22,27 L36,9 M34,27 L48,9 M46,27 L60,9 M58,27 L72,9 M70,27 L84,9 M82,27 L94,11" />
        </g>
        <circle cx="50" cy="18" r="2.6" fill="#d4a64a" stroke="#7a5a1f" strokeWidth=".5" />
        <rect x="2" y="8" width="8" height="20" rx="2" fill="#0a0a0c" />
        <rect x="88" y="8" width="8" height="20" rx="1.5" fill="#1a1a1c" />
      </svg>
    </div>
  );
};

export default ThemeToggle;
