import ContactForm from './components/ContactForm';
import './About.css';

const SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'Supabase',
  'Prisma',
  'Power BI',
  'Power Query',
  'DAX',
  'ETL',
  'Python',
];

export default function About() {
  return (
    <main className="about-canvas">
      <div className="about-content">
        {/* Portrait */}
        <section className="about-image-wrap">
          <img
            className="about-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHnVQOOsgsi6YHFXYn3bUULsrAC6NJBlerAXEba0dtFHfh0bI8ZIHUvIQJU7BinRNz6bMB4a66tDZPSJ3FnMPVjP94OnUyFdTNgTu4UUZGO6S6xl3t2P7VcX898mz23Q_UQzTLjr8w0gIsMnhys2FOluFnP-LHcAqJ76Oi5axUlAfwNsijGpaKB24ck0jd-ApH08c86V5afpBqpOCorst8CibYEsQtjRn7L2BUdF1qdLkZdovwmCwNISeNH6tArepeeafsDrQ8i2g"
            alt="3D Workstation"
          />
        </section>

        {/* Bio */}
        <section className="about-bio">
          <h1 className="about-bio-title">System_Bio</h1>
          <div className="about-divider">
            <div className="about-divider-step" style={{ height: '4px' }} />
            <div className="about-divider-step" style={{ height: '8px' }} />
            <div className="about-divider-step" style={{ height: '12px' }} />
            <div className="about-divider-step" style={{ height: '16px' }} />
          </div>
          <p className="about-bio-lead">
            Construyo soluciones tecnológicas orientadas a resolver problemas reales mediante la integración
            del desarrollo de software, la automatización de procesos y el análisis de datos. Mi enfoque combina
            arquitectura técnica, limpieza y modelado de información, visualización ejecutiva en Power BI y
            aplicación práctica de inteligencia artificial para optimizar procesos, identificar patrones y
            transformar datos dispersos en información útil para la toma de decisiones.
          </p>
          <p className="about-bio-sub">
            Trabajo con tecnologías como JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express,
            MongoDB, PostgreSQL, Supabase y Prisma. Además, complemento mi perfil con herramientas de análisis y
            visualización como Power BI, Power Query, DAX y procesos ETL, apoyado en Git, GitHub y Visual Studio
            Code como base para el desarrollo y control de versiones.
          </p>
          <div className="about-skills">
            {SKILLS.map((s) => (
              <span key={s} className="about-skill-chip">{s}</span>
            ))}
          </div>
        </section>

        {/* Contact form — spans col 2 row 2 on desktop */}
        <div className="about-form-col">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
