import React, { useEffect, useRef } from 'react';
import './SelectedWorks.css';

interface ProjectLink {
  url: string;
  iconUrl: string;
  alt: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  spanClass: string;
  aspectClass: string;
  chips?: string[];
  links?: ProjectLink[];
}

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'UdecData',
    category: 'Data & AI Platform',
    description: 'Portal de inteligencia académica para la Universidad diseñada para la Cundinamarca que centraliza reportes, analítica institucional, pronóstico de población estudiantil y agentes de IA para soporte. Incluye automatización de boletines, normalización de datos, dashboards filtrables y consultas read-only al analista de IA.',
    imageUrl: '/proyectos_input/udec_proyecto.png',
    spanClass: 'col-span-8',
    aspectClass: 'aspect-video',
    chips: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase/PostgreSQL', 'Prisma', 'IA'],
    links: [
      { url: 'https://udec-data.vercel.app/', iconUrl: 'https://api.iconify.design/mdi:web.svg?color=%23ffffff', alt: 'Demo En Vivo' },
      { url: 'https://github.com/Nicolaserd/UdecData', iconUrl: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', alt: 'Repositorio GitHub' }
    ]
  },
  {
    id: '2',
    title: 'Lab Teoría de Juegos',
    category: 'Interactive Lab',
    description: 'Laboratorio interactivo para explorar teoría de juegos y toma de decisiones, con tests de perfil estratégico y módulos analíticos para trabajar equilibrio de Nash y AHP.',
    imageUrl: '/proyectos_input/Laboratorio.png',
    spanClass: 'col-span-4',
    aspectClass: 'aspect-square',
    chips: ['Astro', 'TypeScript', 'AHP', 'Equilibrio de Nash'],
    links: [
      { url: 'https://nicolaserd.github.io/Astroproyectzodiac/', iconUrl: 'https://api.iconify.design/mdi:web.svg?color=%23ffffff', alt: 'Demo En Vivo' },
      { url: 'https://github.com/Nicolaserd/Astroproyectzodiac', iconUrl: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', alt: 'Repositorio GitHub' }
    ]
  },
  {
    id: '3',
    title: 'Prestamo App',
    category: 'Mobile App',
    description: 'Aplicación móvil para gestionar préstamos, beneficiarios, pagos y estadísticas locales, organizada con una arquitectura modular pensada para mantener orden y escalabilidad.',
    imageUrl: '/proyectos_input/Prestamo.png',
    chips: ['React Native', 'Expo', 'AHP', 'SQLite', 'Arquitectura modular'],
    spanClass: 'col-span-4',
    aspectClass: 'aspect-square',
    links: [
      { url: 'https://github.com/Nicolaserd/Prestamo-App-Expo-Arquitectura-Modular-', iconUrl: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', alt: 'Repositorio GitHub' }
    ]
  },
  {
    id: '4',
    title: 'Bot IA Telegram',
    category: 'AI Backend',
    description: 'Backend en NestJS para un bot de Telegram con autenticación, roles, base de datos cifrada y respuestas en tiempo real asistidas por Inteligencia Artificial.',
    imageUrl: '/proyectos_input/BotTelegram.png',
    spanClass: 'col-span-8',
    aspectClass: 'aspect-auto',
    chips: ['NestJS', 'PostgreSQL', 'TypeORM', 'JWT', 'IA'],
    links: [
      { url: 'https://t.me/Mario1379_bot', iconUrl: 'https://api.iconify.design/mdi:telegram.svg?color=%23ffffff', alt: 'Demo Telegram' },
      { url: 'https://whatsappchatbot-sigma.vercel.app/', iconUrl: 'https://api.iconify.design/mdi:web.svg?color=%23ffffff', alt: 'Deploy' },
      { url: 'https://github.com/Nicolaserd/BotIATelegram', iconUrl: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', alt: 'Repositorio GitHub' }
    ]
  },
  {
    id: '5',
    title: 'Encuentros Dialógicos',
    category: 'Power BI Dashboard',
    description: 'Dashboard de seguimiento orientado a consolidar planes de mejoramiento, asistencia y percepción de estudiantes y docentes a partir de múltiples fuentes institucionales.',
    imageUrl: '/proyectos_input/EncuentrosDialogicos.png',
    spanClass: 'col-span-8',
    aspectClass: 'aspect-video',
    chips: ['Power BI', 'ETL', 'Limpieza de datos', 'Cruce de bases', 'DAX'],
    links: [
      { url: 'https://app.powerbi.com/view?r=eyJrIjoiMmY2ZWYwYTctMWVlZS00M2M2LWFiNGEtN2MzNGM1ODJhOWIyIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', iconUrl: 'https://api.iconify.design/simple-icons:powerbi.svg?color=%23ffffff', alt: 'Dashboard Interactivo' }
    ]
  },
  {
    id: '6',
    title: 'Boletín Estadístico Institucional',
    category: 'Power BI Analytics',
    description: 'Tablero integral construido en Power BI para consolidar oferta académica, población estudiantil, talento humano, deserción, planta física e investigación.',
    imageUrl: '/proyectos_input/BoletinEstadistico.png',
    spanClass: 'col-span-4',
    aspectClass: 'aspect-square',
    chips: ['Power BI', 'ETL', 'Limpieza de datos', 'DAX', 'Análisis predictivo'],
    links: [
      { url: 'https://app.powerbi.com/view?r=eyJrIjoiYzE4NzhiNzgtMmViMS00YTNkLTg5YTMtOWEwNjg1N2FiYTYzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', iconUrl: 'https://api.iconify.design/simple-icons:powerbi.svg?color=%23ffffff', alt: 'Dashboard Interactivo' }
    ]
  }
];

function chipKey(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('typescript'))           return 'ts';
  if (n.includes('react'))                return 'react';
  if (n.includes('next'))                 return 'next';
  if (n.includes('astro'))                return 'astro';
  if (n.includes('nestjs') || n === 'nest') return 'nest';
  if (n.includes('supabase'))             return 'supabase';
  if (n.includes('postgre'))              return 'postgres';
  if (n.includes('prisma'))               return 'prisma';
  if (n.includes('power bi'))             return 'powerbi';
  if (n === 'dax')                        return 'dax';
  if (n === 'ia' || n.endsWith(', ia') || n.includes(', ia')) return 'ai';
  if (n === 'ia aplicada')                return 'ai';
  if (n.includes('expo'))                 return 'expo';
  if (n.includes('sqlite'))              return 'sqlite';
  if (n.includes('jwt'))                  return 'jwt';
  if (n.includes('typeorm'))              return 'typeorm';
  if (n.includes('ahp'))                  return 'ahp';
  if (n.includes('equilibrio'))           return 'nash';
  if (n.includes('arquitectura'))         return 'arch';
  if (n.includes('etl'))                  return 'etl';
  if (n.includes('limpieza'))             return 'clean';
  if (n.includes('cruce'))               return 'merge';
  if (n.includes('predictivo') || n.includes('análisis')) return 'analytics';
  return 'default';
}

const SelectedWorks: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="selected-works-section">
      <div className="section-header">
        <h2 className="section-title">Selected Works</h2>
        <p className="section-subtitle">A curated selection of our most impactful collaborations.</p>
      </div>
      <div className="bento-grid">
        {MOCK_PROJECTS.map((project, index) => (
          <div
            key={project.id}
            ref={el => { cardsRef.current[index] = el; }}
            className={`bento-card ${project.spanClass} ${project.aspectClass}`}
            style={{ transitionDelay: `${(index % 2) * 200}ms` }}
          >
            <div className="card-inner">
              {/* Capa frontal: imagen + título + etiqueta */}
              <div className="card-face card-front">
                <img src={project.imageUrl} alt={project.title} className="card-bg-image" />
                <div className="card-overlay"></div>
                <div className="card-front-content">
                  <span className="card-category">{project.category}</span>
                  <h3 className="card-title">{project.title}</h3>
                </div>
              </div>

              {/* Capa central: solo color de fondo (espesor 3D) */}
              <div className="card-face card-middle"></div>

              {/* Capa de reverso: descripción + chips + enlaces */}
              <div className="card-face card-back">
                <div className="card-back-content">
                  <span className="card-category">{project.category}</span>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>
                  {project.chips && (
                    <div className="card-chips">
                      {project.chips.map(chip => <span key={chip} className="chip" data-tech={chipKey(chip)}>{chip}</span>)}
                    </div>
                  )}
                  {project.links && (
                    <div className="card-links">
                      {project.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="card-link" title={link.alt}>
                          <img src={link.iconUrl} alt={link.alt} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;