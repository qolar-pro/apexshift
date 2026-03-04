@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-midnight: #0a0a0a;
  --color-cyber-lime: #32FF7E;
  --color-apex-orange: #ff4d00;
}

@layer base {
  :root {
    --apex-accent-hue: 142; 
    --apex-accent: hsl(var(--apex-accent-hue), 100%, 60%);
    --apex-accent-glow: hsla(var(--apex-accent-hue), 100%, 60%, 0.3);
    --apex-accent-soft: hsla(var(--apex-accent-hue), 100%, 60%, 0.1);
    --bg-color: #0a0a0c;
    --text-color: #ffffff;
    --surface-color: rgba(15, 15, 20, 0.6);
    --border-color: rgba(255, 255, 255, 0.12);
  }

  :root.light {
    --bg-color: #0c0c0c;
    --text-color: #f0f0f0;
    --surface-color: hsla(var(--apex-accent-hue), 20%, 15%, 0.05);
    --border-color: hsla(var(--apex-accent-hue), 20%, 20%, 0.1);
  }

  body {
    @apply antialiased selection:bg-[var(--apex-accent)] selection:text-black transition-colors duration-300;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    overflow-x: hidden;
  }
}

@layer components {
  .liquid-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    /* Immersive Nebula Gradient */
    background: 
      radial-gradient(circle at 20% 30%, hsla(var(--apex-accent-hue), 100%, 60%, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, hsla(var(--apex-accent-hue), 80%, 40%, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, hsla(var(--apex-accent-hue), 60%, 20%, 0.05) 0%, transparent 80%),
      var(--bg-color);
    filter: contrast(1.1);
  }

  /* Starfield Effect */
  .starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    background-image: 
      radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
      radial-gradient(1.5px 1.5px at 50px 160px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 80px 120px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 110px 210px, #fff, rgba(0,0,0,0)),
      radial-gradient(1.5px 1.5px at 150px 240px, #fff, rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.1;
    animation: stars-drift 100s linear infinite;
  }

  @keyframes stars-drift {
    from { background-position: 0 0; }
    to { background-position: 200px 400px; }
  }

  /* Grid Overlay */
  .grid-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 10px 10px;
    opacity: 0.5;
  }

  /* Scanline Effect */
  .scanline {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(var(--apex-accent-hue), 100%, 60%, 0.02) 50%,
      transparent 100%
    );
    background-size: 100% 4px;
    animation: scan 8s linear infinite;
  }

  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  .liquid-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
    pointer-events: none;
  }

  /* Noise Texture Overlay */
  .liquid-bg::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  .liquid-blob {
    position: absolute;
    width: 450px;
    height: 450px;
    /* Softest theme gradient, minimal opacity to ensure zero UI interference */
    background: radial-gradient(circle at 30% 30%, hsla(var(--apex-accent-hue), 100%, 60%, 0.15), var(--apex-accent) 80%);
    border-radius: 50%;
    opacity: 0.1;
    animation: move1 25s infinite alternate ease-in-out, wobble 10s infinite ease-in-out;
    left: 10%;
    top: 10%;
  }

  .liquid-blob:nth-child(2) {
    width: 350px;
    height: 350px;
    animation: move2 20s infinite alternate-reverse ease-in-out;
    animation-delay: -5s;
    left: 50%;
    top: 20%;
  }

  .liquid-blob:nth-child(3) {
    width: 400px;
    height: 400px;
    animation: move3 22s infinite alternate ease-in-out;
    animation-delay: -10s;
    left: 20%;
    top: 50%;
  }

  .liquid-blob:nth-child(4) {
    width: 300px;
    height: 300px;
    animation: move4 18s infinite alternate-reverse ease-in-out;
    animation-delay: -15s;
    left: 60%;
    top: 60%;
  }

  .liquid-blob:nth-child(5) {
    width: 500px;
    height: 500px;
    animation: move1 30s infinite alternate-reverse ease-in-out;
    animation-delay: -20s;
    left: -10%;
    top: -10%;
  }

  .liquid-blob:nth-child(6) {
    width: 380px;
    height: 380px;
    animation: move2 28s infinite alternate ease-in-out;
    animation-delay: -12s;
    left: 70%;
    top: 10%;
  }

  .liquid-blob:nth-child(7) {
    width: 420px;
    height: 420px;
    animation: move3 24s infinite alternate-reverse ease-in-out;
    animation-delay: -8s;
    left: 40%;
    top: 70%;
  }

  .liquid-blob:nth-child(8) {
    width: 320px;
    height: 320px;
    animation: move4 26s infinite alternate ease-in-out;
    animation-delay: -18s;
    left: 10%;
    top: 80%;
  }

  @keyframes move1 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(50vw, 30vh) scale(1.2); }
  }
  @keyframes move2 {
    0% { transform: translate(0, 0) scale(1.1); }
    100% { transform: translate(-40vw, 40vh) scale(0.9); }
  }
  @keyframes move3 {
    0% { transform: translate(0, 0) scale(0.9); }
    100% { transform: translate(30vw, -40vh) scale(1.1); }
  }
  @keyframes move4 {
    0% { transform: translate(0, 0) scale(1.2); }
    100% { transform: translate(-30vw, -30vh) scale(0.8); }
  }

  @keyframes wobble {
    0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
    33% { border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%; }
    66% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
  }

  .liquid-glass {
    background: var(--surface-color);
    backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid var(--border-color);
    @apply rounded-[2rem] shadow-2xl relative;
  }

  .hud-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--apex-accent);
    opacity: 0.3;
    pointer-events: none;
  }

  .hud-corner-tl { top: 12px; left: 12px; border-right: 0; border-bottom: 0; }
  .hud-corner-tr { top: 12px; right: 12px; border-left: 0; border-bottom: 0; }
  .hud-corner-bl { bottom: 12px; left: 12px; border-right: 0; border-top: 0; }
  .hud-corner-br { bottom: 12px; right: 12px; border-left: 0; border-top: 0; }

  .data-stream {
    @apply font-mono text-[8px] opacity-10 uppercase tracking-tighter overflow-hidden whitespace-nowrap;
    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
  }

  /* Glow Line Animation */
  .glow-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, var(--apex-accent), transparent);
    height: 1px;
    width: 100px;
    opacity: 0.5;
    animation: slide-glow 4s linear infinite;
  }

  @keyframes slide-glow {
    0% { left: -100px; opacity: 0; }
    50% { opacity: 0.5; }
    100% { left: 100%; opacity: 0; }
  }

  /* HUD Ring Animation */
  .hud-ring {
    border: 1px dashed var(--apex-accent);
    border-radius: 50%;
    opacity: 0.1;
    animation: rotate-hud 20s linear infinite;
  }

  @keyframes rotate-hud {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Technical Glitch Effect */
  .glitch-text {
    position: relative;
    animation: glitch 5s infinite;
  }

  @keyframes glitch {
    0%, 90%, 100% { transform: translate(0); }
    92% { transform: translate(-2px, 1px); color: var(--apex-accent); }
    94% { transform: translate(2px, -1px); }
    96% { transform: translate(-1px, -2px); }
  }

  /* Scanning Animation */
  .btn-scan {
    position: relative;
    overflow: hidden;
  }
  .btn-scan::after {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, var(--apex-accent), transparent);
    opacity: 0.2;
    transition: top 0.5s ease;
  }
  .btn-scan:hover::after {
    top: 100%;
  }

  .accent-glow {
    filter: drop-shadow(0 0 12px var(--apex-accent-glow));
    animation: pulsate-glow 4s ease-in-out infinite;
  }

  @keyframes pulsate-glow {
    0%, 100% { filter: drop-shadow(0 0 8px var(--apex-accent-glow)); opacity: 0.8; }
    50% { filter: drop-shadow(0 0 16px var(--apex-accent-glow)); opacity: 1; }
  }

  /* Soft Shimmer Effect for Liquid Glass */
  .liquid-glass::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.03),
      transparent
    );
    transform: skewX(-25deg);
    animation: shimmer 12s infinite linear;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    20% { left: 150%; }
    100% { left: 150%; }
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
