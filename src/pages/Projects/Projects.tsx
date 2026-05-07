import ProjectCard from './components/ProjectCard';
import './Projects.css';

const PROJECTS = [
  {
    id: 'alpacha-os',
    title: 'ALPACHA_OS',
    description: 'A robust, tactile operating system interface merging neobrutalist grid structures with soft claymorphic interactions. Designed for high-performance creative workflows.',
    tags: ['SYSTEM_DESIGN', 'UI/UX'],
    badge: 'v2.0',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5fAZykW3TUnpNlHyykQUebhvpQiKPRTb4MsdZg1VcYA3S-9ChmQ9qfx9_mx-bG-WgUHbz2lL8g7mwWU0nwpp5vWJnnLrQEJQMVN2a6w2FjBxr7-O4sQMz6W1THxRJ9t-NreevM2zgto3cDdpClCb_NIoqAmEbC6nozdz-ac0qha0_qz8WAYLglU3Ol2827z_dDMsCOzDIKlFy1Xd-G9oSCyPZu629TL4YNZon72rYfNgVl3KHJqbwD9q4sC8s40pmP82ue0HhTb4',
    icon: 'data_object',
    primary: true,
  },
  {
    id: 'data-knot',
    title: 'Data_Knot',
    description: 'Parametric 3D fabrication translating ancestral knotted string data into physical polymer arrays. Used as structural load-bearing encryption keys.',
    tags: [],
    badge: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmarOyuCx9R4mumqz1KbUvEmZ-aKWPZR__fJE3hBPSKxN-WQabk9emd9atDx8bPVOfQg2fZXJGdWwJxBs5xjDUuGYSHaCzrj2St6YzrsVSM__wyxBtJ-GKJY8qn6zdgyzBDOUe-hEJOXuGvcf9urLv3S9mdC8G2vEbTD1eFCzq37SG0Utyu6pHrty-HYxriHhDwTfRS90vhwj0qdwsgQh3HyMcvBW9RSq-0tdRjjFw54H6cFQWKE-2UUgVNlTOmKylep6YPJaHHJk',
    icon: 'polyline',
    primary: false,
  },
  {
    id: 'geo-huaco',
    title: 'Geo_Huaco',
    description: 'Procedurally generated 3D meshes that combine Moche portrait vessel topology with rigid, stepped Chakana geometry and claymorphic volume processing.',
    tags: [],
    badge: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANjDrB5Ntv1_4Z6WDbClIuHibjp9ExK_wMGXVpcje4yabVTgXFQcjpRPJCb29EPu7QnKD0UwjnbWnczpomtYQL8ixE3lO_h2FHcCSe912d_PUKOdXRMC5s4GPO6iLLSxAa_me7GmFp5z0cFQC1ynXs8EgWgVFwXl5Nnl2Ns0_soW1gzUDGplr42t8zJDu1A6hNu331x3Z1UPaSgQszD2plIVxMJ2LbLxfMiXfpu97Qrx5iIVxoCzjhf-DZIB47T9pRhwer1bHXoGA',
    icon: 'deployed_code',
    primary: false,
  },
];

const FILTERS = ['ALL_DATA', '3D_FAB', 'ALPACHA_CORE', 'CYBER_CERAMICS'];

export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-content">
        {/* Header */}
        <header className="projects-header">
          <div className="projects-header-backdrop" />

          <div className="projects-header-row">
            <div>
              <div style={{ width: '128px', height: '16px', backgroundColor: 'var(--on-surface)', marginBottom: '8px', display: 'flex' }}>
                <div style={{ flex: 1, backgroundColor: 'var(--primary)' }} />
                <div style={{ flex: 2, backgroundColor: 'var(--on-surface)' }} />
              </div>
              <h1 className="projects-title">
                PROYECTOS_DIR
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', fontVariationSettings: "'FILL' 1", verticalAlign: 'middle', marginLeft: '16px' }}>terminal</span>
              </h1>
            </div>
            <div className="projects-status-badge">
              <span className="status-dot" style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>System Online</span>
            </div>
          </div>

          <p className="projects-description">
            Desarrollo productos y soluciones tecnológicas en los que la capacidad técnica se integra con la claridad de uso, la automatización de procesos y la transformación de información en decisiones útiles. Mi trabajo reciente incluye el desarrollo de aplicaciones web y prototipos con tecnologías como TypeScript, Next.js, Astro y React Native, así como proyectos de analítica y visualización en Power BI, enfocados en ETL, limpieza de datos, cruce de bases, modelado, DAX y seguimiento de indicadores.
          </p>

          <div className="projects-divider" />
        </header>

        {/* Filter chips — desktop only */}
        <div className="projects-filters">
          {FILTERS.map((f, i) => (
            <button key={f} className={`filter-chip ${i === 0 ? 'filter-chip--active' : 'filter-chip--inactive'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="projects-list">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
