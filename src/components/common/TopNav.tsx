interface TopNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Projects', page: 'projects' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function TopNav({ activePage, onNavigate }: TopNavProps) {
  return (
    <nav className="topnav">
      <span className="topnav-brand">INCA_PORTFOLIO</span>
      <ul className="topnav-links">
        {NAV_LINKS.map(({ label, page }) => (
          <li key={page}>
            <button
              className={`topnav-link${activePage === page ? ' topnav-link--active' : ''}`}
              onClick={() => onNavigate(page)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <button className="topnav-hire">
        <span className="topnav-hire-shadow" />
        <span className="topnav-hire-face">Hire Me</span>
      </button>
    </nav>
  );
}
