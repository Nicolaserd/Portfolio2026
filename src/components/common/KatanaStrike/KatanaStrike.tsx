import React, { useEffect, useRef } from 'react';
import './KatanaStrike.css';

/* ═══════════════════════════════════════════════════
   DATOS DE TECNOLOGÍAS
═══════════════════════════════════════════════════ */
const TECH = [
  // Frontend
  { name: 'JavaScript', ico: 'JS', bg: '#f7df1e', fg: '#0a0b0d', cat: 'frontend' },
  { name: 'TypeScript', ico: 'TS', bg: '#3178c6', fg: '#fff', cat: 'frontend' },
  { name: 'React', ico: '⚛', bg: '#61dafb', fg: '#0a0b0d', cat: 'frontend' },
  { name: 'Next.js', ico: 'N', bg: '#000', fg: '#fff', cat: 'frontend' },
  { name: 'Tailwind', ico: '~', bg: '#38bdf8', fg: '#fff', cat: 'frontend' },
  // Backend
  { name: 'Node.js', ico: '⬢', bg: '#5fa04e', fg: '#fff', cat: 'backend' },
  { name: 'Express', ico: 'Ex', bg: null, fg: '#e8e4dc', cat: 'backend', ol: true },
  { name: 'MongoDB', ico: 'M', bg: '#10aa50', fg: '#fff', cat: 'backend' },
  { name: 'PostgreSQL', ico: 'Pg', bg: '#336791', fg: '#fff', cat: 'backend' },
  { name: 'Supabase', ico: 'S', bg: '#3ecf8e', fg: '#0a3d2a', cat: 'backend' },
  { name: 'Prisma', ico: 'Pr', bg: '#2d3748', fg: '#fff', cat: 'backend' },
  // Data
  { name: 'Power BI', ico: 'PB', bg: '#f2c811', fg: '#0a0b0d', cat: 'data' },
  { name: 'Pwr Query', ico: 'PQ', bg: '#376a37', fg: '#fff', cat: 'data' },
  { name: 'DAX', ico: 'DA', bg: '#e8a33d', fg: '#0a0b0d', cat: 'data' },
  { name: 'ETL', ico: 'ET', bg: null, fg: '#e8e4dc', cat: 'data', ol: true },
  // Tools
  { name: 'Git', ico: 'git', bg: '#f05033', fg: '#fff', cat: 'tools', svg: 'git' },
  { name: 'GitHub', ico: 'gh', bg: '#1f1f1f', fg: '#fff', cat: 'tools', svg: 'github' },
  { name: 'VSCode', ico: 'vs', bg: '#007acc', fg: '#fff', cat: 'tools', svg: 'vscode' },
];

const RELATIONS: Record<string, boolean> = {
  'JavaScript-TypeScript': true, 'JavaScript-React': true, 'JavaScript-Next.js': true,
  'TypeScript-React': true, 'TypeScript-Next.js': true, 'React-Next.js': true,
  'React-Tailwind': true, 'Next.js-Tailwind': true,
  'Node.js-Express': true, 'Node.js-MongoDB': true, 'Node.js-PostgreSQL': true,
  'Express-MongoDB': true, 'Express-PostgreSQL': true, 'PostgreSQL-Supabase': true,
  'PostgreSQL-Prisma': true, 'MongoDB-Prisma': true, 'Supabase-Prisma': true,
  'Node.js-Prisma': true,
  'Power BI-Pwr Query': true, 'Power BI-DAX': true, 'Pwr Query-ETL': true,
  'Power BI-ETL': true, 'Pwr Query-DAX': true,
  'Git-GitHub': true, 'Git-VSCode': true, 'GitHub-VSCode': true,
};

function areRelated(a: string, b: string) {
  return !!(RELATIONS[`${a}-${b}`] || RELATIONS[`${b}-${a}`]);
}

function svgIco(type: string) {
  if (type === 'git') return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L21 12L12 21L3 12Z"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="9" r="1.5" fill="currentColor"/><circle cx="15" cy="15" r="1.5" fill="currentColor"/><path d="M9 12L15 9M9 12L15 15"/></svg>`;
  if (type === 'github') return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.21c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.13-4.56-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.21 10.21 0 0 0 22 12.21C22 6.58 17.52 2 12 2z"/></svg>`;
  if (type === 'vscode') return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3.5L8 12L15.5 20.5"/><path d="M8 3.5L8 20.5" stroke-opacity="0.4"/></svg>`;
  return '';
}

const KatanaStrike: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const katanaRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const ribbonCoreRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const grpFrontRef = useRef<HTMLDivElement>(null);
  const grpBackRef = useRef<HTMLDivElement>(null);
  const grpDataRef = useRef<HTMLDivElement>(null);
  const grpToolsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesDivRef = useRef<HTMLDivElement>(null);

  // References for animation state to clear on unmount
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let nodeData: any[] = [];
    
    const wait = (ms: number) => new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      timeoutsRef.current.push(t);
    });

    const halo = haloRef.current;
    const katana = katanaRef.current;
    const ribbon = ribbonRef.current;
    const ribbonC = ribbonCoreRef.current;
    const titleEl = titleRef.current;
    const grpFront = grpFrontRef.current;
    const grpBack = grpBackRef.current;
    const grpData = grpDataRef.current;
    const grpTools = grpToolsRef.current;
    const canvas = canvasRef.current;
    const nodesDiv = nodesDivRef.current;
    const stage = stageRef.current;

    if (!halo || !katana || !ribbon || !ribbonC || !titleEl || !grpFront || !grpBack || !grpData || !grpTools || !canvas || !nodesDiv || !stage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper to get theme-aware colors
    const getCatColor = (cat: string) => {
      return getComputedStyle(stage).getPropertyValue(`--cat-${cat}`).trim() || '#fff';
    };

    /* ═══════════════════════════════════════════════════
       KATANA — animación manual con rAF
    ═══════════════════════════════════════════════════ */
    function animateKatana() {
      return new Promise<void>(async resolve => {
        if (isCancelled) return resolve();
        // Fase 1: aparecer suave
        halo!.style.opacity = '1';
        katana!.style.transition = 'opacity 1.4s ease, filter 1.4s ease, transform 1.4s ease';
        katana!.style.opacity = '1';
        katana!.style.filter = 'blur(0)';
        katana!.style.transform = 'translate(0, 0) scale(1)';

        await wait(1400);
        if (isCancelled) return resolve();

        // Flotar
        katana!.style.transition = 'transform 1.2s ease-in-out';
        katana!.style.transform = 'translate(0, -6px) scale(1)';
        await wait(700);
        if (isCancelled) return resolve();
        katana!.style.transform = 'translate(0, 0) scale(1)';
        await wait(700);
        if (isCancelled) return resolve();

        // Wind-up
        katana!.style.transition = 'transform 0.35s ease-in';
        katana!.style.transform = 'translate(-90px, 0) scale(1)';
        await wait(350);
        if (isCancelled) return resolve();

        // ESTOCADA — animación rAF suave
        const startX = -90;
        const endX = window.innerWidth + 200;
        const dur = 420; // ms
        const t0 = performance.now();

        // Cinta aparece al mismo tiempo
        ribbon!.style.transition = 'none';
        ribbonC!.style.transition = 'none';
        ribbon!.style.opacity = '0';
        ribbonC!.style.opacity = '0';
        ribbon!.style.transform = 'scaleX(0)';
        ribbonC!.style.transform = 'scaleX(0)';

        function tick(now: number) {
          if (isCancelled) return resolve();
          const p = Math.min((now - t0) / dur, 1);
          const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // ease-in-out
          const x = startX + (endX - startX) * ease;
          katana!.style.transition = 'none';
          katana!.style.transform = `translate(${x}px, 0) rotate(${ease * 32}deg) scale(1.02)`;
          katana!.style.filter = p > 0.6 ? `blur(${(p - 0.6) * 6}px)` : 'blur(0)';
          katana!.style.opacity = p > 0.7 ? String(1 - (p - 0.7) / 0.3) : '1';

          // Cinta crece desde izquierda
          const rp = Math.min(p / 0.6, 1);
          ribbon!.style.transform = `scaleX(${rp})`;
          ribbonC!.style.transform = `scaleX(${rp})`;
          ribbon!.style.opacity = String(Math.min(rp * 1.4, 1));
          ribbonC!.style.opacity = String(Math.min(rp * 1.4, 1));

          if (p < 1) {
            animFrameIdRef.current = requestAnimationFrame(tick);
          } else {
            // Cinta se queda tenue
            ribbon!.style.transition = 'opacity 1s ease';
            ribbonC!.style.transition = 'opacity 1s ease';
            ribbon!.style.opacity = '0.45';
            ribbonC!.style.opacity = '0.45';
            halo!.style.opacity = '0';
            resolve();
          }
        }
        animFrameIdRef.current = requestAnimationFrame(tick);
      });
    }

    /* ═══════════════════════════════════════════════════
       MOSTRAR GRUPO (fade in → hold → fade out rápido)
    ═══════════════════════════════════════════════════ */
    async function showGroup(el: HTMLDivElement, holdMs = 2600) {
      if (isCancelled) return;
      el.style.transition = 'opacity 0.55s ease, filter 0.55s ease';
      el.style.opacity = '1';
      el.style.filter = 'blur(0)';
      await wait(holdMs);
      if (isCancelled) return;
      el.style.transition = 'opacity 0.18s ease';
      el.style.opacity = '0';
      await wait(200);
    }

    /* ═══════════════════════════════════════════════════
       RED NEURONAL
    ═══════════════════════════════════════════════════ */
    function buildNeuralNet() {
      if (!stage || !canvas || !nodesDiv) return;
      // Usamos el tamaño del contenedor en lugar de window.innerWidth para ser un componente amigable
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      canvas.width = W;
      canvas.height = H;

      nodesDiv.innerHTML = '';
      nodeData = [];

      // Layout: 2x2 cajas con margenes y espacio superior para el título principal
      const topReserve = Math.max(80, H * 0.16);
      const margin = Math.min(W, H) * 0.03;
      const gap = margin;
      const boxW = (W - margin * 2 - gap) / 2;
      const boxH = (H - topReserve - margin - gap) / 2;
      const layout: Record<string, { x: number, y: number }> = {
        frontend: { x: margin, y: topReserve },
        backend: { x: margin + boxW + gap, y: topReserve },
        data: { x: margin, y: topReserve + boxH + gap },
        tools: { x: margin + boxW + gap, y: topReserve + boxH + gap },
      };
      const titles: Record<string, string> = { frontend: 'Frontend', backend: 'Backend & DB', data: 'Data & BI', tools: 'Herramientas' };

      const boxes: Record<string, any> = {};
      Object.entries(layout).forEach(([cat, p]) => {
        const box = document.createElement('div');
        box.className = 'cluster-box';
        box.style.left = p.x + 'px';
        box.style.top = p.y + 'px';
        box.style.width = boxW + 'px';
        box.style.height = boxH + 'px';
        // Adjust opacity for the box border
        let rawColor = getCatColor(cat);
        let bcolor = rawColor.replace(/[\d.]+\)$/, '0.18)');
        box.style.borderColor = bcolor;
        const t = document.createElement('div');
        t.className = 'ctitle';
        t.style.color = rawColor;
        t.textContent = titles[cat];
        const inner = document.createElement('div');
        inner.className = 'cinner';
        box.appendChild(t);
        box.appendChild(inner);
        nodesDiv.appendChild(box);
        boxes[cat] = { box, inner, x: p.x, y: p.y, w: boxW, h: boxH };
        requestAnimationFrame(() => { box.style.opacity = '1'; });
      });

      // Distribuir nodos dentro de cada inner box
      const groups: Record<string, typeof TECH> = {};
      TECH.forEach(t => { (groups[t.cat] = groups[t.cat] || []).push(t); });

      Object.entries(groups).forEach(([cat, list]) => {
        const b = boxes[cat];
        // área útil del inner box
        const innerX = b.x + 8;
        const innerY = b.y + 38;
        const innerW = b.w - 16;
        const innerH = b.h - 46;
        // círculo de nodos centrado en la caja
        const cx = innerX + innerW / 2;
        const cy = innerY + innerH / 2;
        const r = Math.min(innerW, innerH) * 0.32;
        list.forEach((tech, idx) => {
          const angle = (idx / list.length) * Math.PI * 2 - Math.PI / 2;
          const radius = r * (0.78 + (idx % 2) * 0.22);
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;

          const node = document.createElement('div');
          node.className = 'node';
          node.style.left = x + 'px';
          node.style.top = y + 'px';
          node.style.opacity = '0';
          // Fix for light theme node shadow dynamically
          node.style.transition = 'opacity 0.6s ease';

          let icoHtml;
          if (tech.svg) icoHtml = `<span class="ico" style="background:${tech.bg};color:${tech.fg}">${svgIco(tech.svg)}</span>`;
          else if (tech.ol) icoHtml = `<span class="ico ol">${tech.ico}</span>`;
          else icoHtml = `<span class="ico" style="background:${tech.bg};color:${tech.fg}">${tech.ico}</span>`;
          node.innerHTML = `${icoHtml}<span class="name">${tech.name}</span>`;
          nodesDiv.appendChild(node);

          // Suspendido: oscilación acotada al box
          const phase = Math.random() * Math.PI * 2;
          const ampY = Math.min(14, innerH * 0.06);
          const ampX = Math.min(8, innerW * 0.03);
          const speed = 0.0006 + Math.random() * 0.0006;
          nodeData.push({
            el: node, bx: x, by: y, x, y,
            ampX, ampY, phase, speed,
            // límites de la caja para clamp
            minX: innerX + 50, maxX: innerX + innerW - 50,
            minY: innerY + 24, maxY: innerY + innerH - 24,
            tech,
          });
        });
      });
    }

    function drawLines() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodeData.length; i++) {
        for (let j = i + 1; j < nodeData.length; j++) {
          const a = nodeData[i], b = nodeData[j];
          if (a.tech.cat !== b.tech.cat) continue;
          if (!areRelated(a.tech.name, b.tech.name)) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = getCatColor(a.tech.cat);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Pulso viajante por líneas relacionadas
      const t = performance.now() * 0.001;
      nodeData.forEach((nd, i) => {
        const related = nodeData.filter((n, j) => j !== i && n.tech.cat === nd.tech.cat && areRelated(nd.tech.name, n.tech.name));
        if (related.length === 0) return;
        const target = related[Math.floor(t * 0.7 + i * 1.3) % related.length];
        const p = (t * 0.6 + i * 0.4) % 1;
        const px = nd.x + (target.x - nd.x) * p;
        const py = nd.y + (target.y - nd.y) * p;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = getCatColor(nd.tech.cat).replace(/[\d.]+\)$/, '0.9)');
        ctx.fill();
      });
    }

    function updateNodes() {
      const t = performance.now();
      nodeData.forEach(nd => {
        let nx = nd.bx + Math.sin(t * nd.speed + nd.phase) * nd.ampX;
        let ny = nd.by + Math.cos(t * nd.speed * 1.3 + nd.phase) * nd.ampY;
        // clamp dentro de la caja
        nx = Math.max(nd.minX, Math.min(nd.maxX, nx));
        ny = Math.max(nd.minY, Math.min(nd.maxY, ny));
        nd.x = nx; nd.y = ny;
        nd.el.style.left = nx + 'px';
        nd.el.style.top = ny + 'px';
      });
    }

    function neuralLoop() {
      if (isCancelled) return;
      updateNodes();
      drawLines();
      animFrameIdRef.current = requestAnimationFrame(neuralLoop);
    }

    async function showNeuralNet() {
      if (isCancelled) return;
      buildNeuralNet();

      titleEl!.style.top = '4%';
      titleEl!.style.transform = 'translate(-50%, 0)';
      titleEl!.style.transition = 'opacity 1.2s ease, filter 1.2s ease';
      titleEl!.style.opacity = '1';
      titleEl!.style.filter = 'blur(0)';

      canvas!.style.opacity = '1';
      nodesDiv!.style.opacity = '1';

      nodeData.forEach((nd, i) => {
        const t = setTimeout(() => { if (!isCancelled) nd.el.style.opacity = '1'; }, i * 80);
        timeoutsRef.current.push(t);
      });

      ribbon!.style.transition = 'opacity 1.2s ease';
      ribbonC!.style.transition = 'opacity 1.2s ease';
      ribbon!.style.opacity = '0';
      ribbonC!.style.opacity = '0';

      neuralLoop();
    }

    /* ═══════════════════════════════════════════════════
       MAIN SEQUENCE
    ═══════════════════════════════════════════════════ */
    async function main() {
      // 1. Katana aparece y atraviesa
      await animateKatana();
      if (isCancelled) return;
      await wait(300);
      if (isCancelled) return;

      // 2. Título "Stack principal"
      titleEl!.style.opacity = '1';
      titleEl!.style.filter = 'blur(0)';
      await wait(2200);
      if (isCancelled) return;
      titleEl!.style.transition = 'opacity 0.2s ease';
      titleEl!.style.opacity = '0';
      await wait(250);
      if (isCancelled) return;

      // 3. Grupos secuenciales
      await showGroup(grpFront!, 2600);
      if (isCancelled) return;
      await showGroup(grpBack!, 2600);
      if (isCancelled) return;
      await showGroup(grpData!, 2600);
      if (isCancelled) return;
      await showGroup(grpTools!, 2800);
      if (isCancelled) return;
      await wait(200);
      if (isCancelled) return;

      // 4. Red neuronal
      await showNeuralNet();
    }

    /* ═══════════════════════════════════════════════════
       INTERSECTION OBSERVER (Animar al hacer scroll)
    ═══════════════════════════════════════════════════ */
    const resetAnimation = () => {
      isCancelled = true;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      
      // Reset DOM state
      halo!.style.opacity = '0';
      katana!.style.opacity = '0';
      katana!.style.transform = 'translate(-40px, 8px) scale(0.98)';
      katana!.style.filter = 'blur(6px)';
      ribbon!.style.opacity = '0';
      ribbonC!.style.opacity = '0';
      ribbon!.style.transform = 'scaleX(0)';
      ribbonC!.style.transform = 'scaleX(0)';
      titleEl!.style.opacity = '0';
      titleEl!.style.filter = 'blur(4px)';
      grpFront!.style.opacity = '0';
      grpBack!.style.opacity = '0';
      grpData!.style.opacity = '0';
      grpTools!.style.opacity = '0';
      canvas!.style.opacity = '0';
      nodesDiv!.style.opacity = '0';
      nodesDiv!.innerHTML = '';
      nodeData = [];
      if (ctx) ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    };

    const startAnimation = () => {
      resetAnimation();
      isCancelled = false; // allow new animation to run
      main();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          resetAnimation();
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% visible

    if (stage) {
      observer.observe(stage);
    }

    const handleResize = () => {
      if (nodeData.length > 0 && stageRef.current && canvasRef.current) {
        canvasRef.current.width = stageRef.current.clientWidth;
        canvasRef.current.height = stageRef.current.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      resetAnimation();
      if (stage) observer.unobserve(stage);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="katana-section">
      <div className="stage" id="stage" ref={stageRef}>
        <div className="halo" id="halo" ref={haloRef}></div>

        {/* KATANA */}
        <div className="katana-wrap" id="katana" ref={katanaRef}>
          <div className="katana">
            <div className="kashira"></div>
            <div className="grip"></div>
            <div className="tsuba"></div>
            <div className="habaki"></div>
            <div className="blade"></div>
          </div>
        </div>

        {/* CINTA */}
        <div className="ribbon" id="ribbon" ref={ribbonRef}></div>
        <div className="ribbon core" id="ribbonCore" ref={ribbonCoreRef}></div>

        {/* TÍTULO */}
        <div className="stack-title" id="stackTitle" ref={titleRef}>
          <span className="pre">—&nbsp;</span>Stack principal<span className="pre">&nbsp;—</span>
        </div>

        {/* PANELES SECUENCIALES */}
        <div className="group-panel" id="grpFrontend" ref={grpFrontRef}>
          <div className="glabel">Frontend</div>
          <div className="row">
            <div className="chip"><span className="ico" style={{ background: '#f7df1e' }}>JS</span><span className="name">JavaScript</span></div>
            <div className="chip"><span className="ico" style={{ background: '#3178c6', color: '#fff' }}>TS</span><span className="name">TypeScript</span></div>
            <div className="chip"><span className="ico" style={{ background: '#61dafb' }}>⚛</span><span className="name">React</span></div>
            <div className="chip"><span className="ico" style={{ background: '#000', color: '#fff' }}>N</span><span className="name">Next.js</span></div>
            <div className="chip"><span className="ico" style={{ background: '#38bdf8', color: '#fff' }}>~</span><span className="name">Tailwind</span></div>
          </div>
        </div>

        <div className="group-panel" id="grpBackend" ref={grpBackRef}>
          <div className="glabel">Backend &amp; Base de datos</div>
          <div className="row">
            <div className="chip"><span className="ico" style={{ background: '#5fa04e', color: '#fff' }}>⬢</span><span className="name">Node.js</span></div>
            <div className="chip"><span className="ico ol">Ex</span><span className="name">Express</span></div>
            <div className="chip"><span className="ico" style={{ background: '#10aa50', color: '#fff' }}>M</span><span className="name">MongoDB</span></div>
            <div className="chip"><span className="ico" style={{ background: '#336791', color: '#fff' }}>Pg</span><span className="name">PostgreSQL</span></div>
            <div className="chip"><span className="ico" style={{ background: '#3ecf8e', color: '#0a3d2a' }}>S</span><span className="name">Supabase</span></div>
            <div className="chip"><span className="ico" style={{ background: '#2d3748', color: '#fff' }}>Pr</span><span className="name">Prisma</span></div>
          </div>
        </div>

        <div className="group-panel" id="grpData" ref={grpDataRef}>
          <div className="glabel">Data &amp; BI</div>
          <div className="row">
            <div className="chip"><span className="ico" style={{ background: '#f2c811' }}>PB</span><span className="name">Power BI</span></div>
            <div className="chip"><span className="ico" style={{ background: '#376a37', color: '#fff' }}>PQ</span><span className="name">Power Query</span></div>
            <div className="chip"><span className="ico" style={{ background: '#e8a33d' }}>DA</span><span className="name">DAX</span></div>
            <div className="chip"><span className="ico ol">ET</span><span className="name">ETL</span></div>
          </div>
        </div>

        <div className="group-panel" id="grpTools" ref={grpToolsRef}>
          <div className="glabel">Herramientas</div>
          <div className="row">
            <div className="chip">
              <span className="ico" style={{ background: '#f05033', color: '#fff' }} dangerouslySetInnerHTML={{ __html: svgIco('git') }}></span>
              <span className="name">Git</span>
            </div>
            <div className="chip">
              <span className="ico" style={{ background: '#1f1f1f', color: '#fff' }} dangerouslySetInnerHTML={{ __html: svgIco('github') }}></span>
              <span className="name">GitHub</span>
            </div>
            <div className="chip">
              <span className="ico" style={{ background: '#007acc', color: '#fff' }} dangerouslySetInnerHTML={{ __html: svgIco('vscode') }}></span>
              <span className="name">VSCode</span>
            </div>
          </div>
        </div>

        {/* RED NEURONAL */}
        <canvas id="neural-canvas" ref={canvasRef}></canvas>
        <div className="neural-nodes" id="neuralNodes" ref={nodesDivRef}></div>
      </div>
      
    </section>
  );
};

export default KatanaStrike;
