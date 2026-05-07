import './Home.css';

const ALPACA_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDux6gdR03JLXdxuRN7n8LsXsB1vNNa5t3MT7qrRmNUM48jXax30CBAMeLQODarehN1SMs_Tybpnq6YRC5gvpm1bv9k0ggTvoTj-K92V9Ldh2uFZ1WzTDtLsa_jHF6BSvMwxbiikX3JAuBKjGR6mpXHORlHDgD3LXahZNweRya20vcMmqQjRCUBTJvoIK_95VwEcOWnDR8tzZ4Xo2VnOQvV01Q0lBY3C3Xcb7wU_vRKRxHmWPVzhxEwtlXNsVJ1lO_FasZ7yre8G5E';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="home-page">

      {/* ══ MOBILE ══ */}
      <section className="home-mobile">
        <div className="home-mobile-pattern chakana-pattern" />
        <div className="home-mobile-inner">
          <div className="home-mobile-hero-text">
            <div className="home-mobile-label-row">
              <span className="hero-label">SISTEMA_PORTAFOLIO v3.0</span>
              <div className="status-badge">
                <span className="status-dot status-dot--green" />
                <span className="status-text">SYSTEM_READY</span>
              </div>
            </div>
            <h1 className="hero-title">
              NICOLÁS_<br />
              <span className="hero-title-accent">INCHAUSTEGUI</span>
            </h1>
            <p className="hero-subtitle">DESDE_COLOMBIA</p>
          </div>

          <div className="hero-asset">
            <div className="hero-backdrop hero-backdrop--gray" />
            <div className="hero-backdrop hero-backdrop--red" />
            <img className="hero-image-mobile" src={ALPACA_IMG} alt="3D Neo-Andean Alpaca" />
          </div>
          <button className="cta-btn" onClick={() => onNavigate('projects')}>
            <span className="cta-btn-text">INICIALIZAR</span>
            <span className="material-symbols-outlined cta-btn-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
          </button>
        </div>
      </section>

      {/* ══ DESKTOP ══ */}
      <section className="home-desktop">
        {/* Status top-right */}
        <div className="home-desktop-status">
          <div className="status-badge">
            <span className="status-dot status-dot--green" />
            <span className="status-text">System Online</span>
          </div>
        </div>

        {/* Bento grid */}
        <div className="hero-grid">

          {/* Left — text */}
          <div className="hero-text">
            <span className="hero-label">SISTEMA_PORTAFOLIO v3.0</span>

            <h1 className="hero-title">
              NICOLÁS_<br />
              <span className="hero-title-accent">INCHAUSTEGUI</span>
            </h1>

            <p className="hero-subtitle">DESDE_COLOMBIA</p>

            <div className="hero-actions">
              {/* Primary button */}
              <button className="hero-btn hero-btn--primary">
                <span className="hero-btn-shadow" />
                <span className="hero-btn-face">
                  EXPLORAR MÓDULOS
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    arrow_forward
                  </span>
                </span>
              </button>

              {/* Secondary button */}
              <button className="hero-btn hero-btn--secondary">
                <span className="hero-btn-shadow" />
                <span className="hero-btn-face">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    terminal
                  </span>
                  INICIALIZAR
                </span>
              </button>
            </div>
          </div>

          {/* Right — visual */}
          <div className="hero-visual">
            <div className="hero-visual-deco-corner" />
            <div className="hero-visual-deco-bottom" />
            <img className="hero-visual-image" src={ALPACA_IMG} alt="3D Claymorphic Alpaca" />
          </div>

        </div>
      </section>

    </div>
  );
}
