import { useState } from 'react';
import type { ReactElement } from 'react';
import TopNav from './components/common/TopNav';
import BottomNav from './components/common/BottomNav';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import './components/common/TopNav.css';
import './styles/index.css';

type Page = 'home' | 'projects' | 'about' | 'contact';

const PAGES: Record<Page, ReactElement> = {
  home: <Home />,
  projects: <Projects />,
  about: <About />,
  contact: <About />,
};

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <TopNav activePage={activePage} onNavigate={(p) => setActivePage(p as Page)} />
      {PAGES[activePage]}
      {/* BottomNav only on mobile */}
      <div className="mobile-nav-wrapper">
        <BottomNav activePage={activePage} onNavigate={(p) => setActivePage(p as Page)} />
      </div>
    </div>
  );
}
