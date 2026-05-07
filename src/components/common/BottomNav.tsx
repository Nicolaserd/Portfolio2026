interface NavItem {
  icon: string;
  label: string;
  page: string;
}

interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { icon: 'home', label: 'Home', page: 'home' },
  { icon: 'grid_view', label: 'Projects', page: 'projects' },
  { icon: 'person', label: 'About', page: 'about' },
  { icon: 'mail', label: 'Contact', page: 'contact' },
];

export default function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 8px 0',
      backgroundColor: 'var(--surface)',
      borderTop: '4px solid var(--on-surface)',
      boxShadow: 'var(--neo-shadow-up)',
      height: '80px',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {NAV_ITEMS.map((item) => {
        const isActive = activePage === item.page;
        return (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '8px',
              width: isActive ? '72px' : '64px',
              height: isActive ? '64px' : 'auto',
              backgroundColor: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              border: isActive ? '2px solid var(--on-surface)' : 'none',
              borderRadius: isActive ? '12px' : '8px',
              boxShadow: isActive ? 'var(--neo-shadow)' : 'none',
              transform: isActive ? 'translateY(-4px)' : 'none',
              cursor: 'pointer',
              transition: 'transform 0.1s ease',
              fontFamily: 'var(--font)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0", fontSize: '24px' }}
            >
              {item.icon}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
