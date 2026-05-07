import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  badge: string | null;
  image: string;
  icon?: string;
  primary: boolean;
}

export default function ProjectCard({ title, description, tags, badge, image, icon, primary }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-image-wrap">
        <img className="project-card-image" src={image} alt={title} />
        {badge && <span className="project-card-badge">{badge}</span>}
      </div>
      <div className="project-card-body">
        <div className="project-card-watermark">
          {icon && <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1 }}>
          <div className="project-card-header">
            <h2 className="project-card-title">{title}</h2>
            {icon && <span className="material-symbols-outlined project-card-icon">{icon}</span>}
          </div>
          <p className="project-card-desc">{description}</p>
          {tags.length > 0 && (
            <div className="project-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="project-card-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="project-card-btn-wrap">
          <div className="project-card-btn-shadow" />
          <button className={`project-card-btn ${primary ? 'project-card-btn--primary' : 'project-card-btn--secondary'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {primary ? 'play_arrow' : 'view_in_ar'}
            </span>
            {primary ? 'EJECUTAR' : 'INSPECCIONAR'}
          </button>
        </div>
      </div>
    </article>
  );
}
