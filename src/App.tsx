import { useEffect, useState } from 'react';
import type React from 'react';
import TopNav from './components/common/TopNav';
import BottomNav from './components/common/BottomNav';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import Comments from './pages/Comments/Comments';
import './components/common/TopNav.css';
import './styles/index.css';

type Page = 'home' | 'projects' | 'about' | 'comments';

const VALID_PAGES: Page[] = ['home', 'projects', 'about', 'comments'];

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return VALID_PAGES.includes(hash as Page) ? (hash as Page) : 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>(() => getPageFromHash());

  useEffect(() => {
    const syncFromHash = () => setActivePage(getPageFromHash());

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const navigate = (p: string) => {
    const nextPage = VALID_PAGES.includes(p as Page) ? (p as Page) : 'home';
    window.location.hash = nextPage;
    setActivePage(nextPage);
  };

  const pages: Record<Page, React.ReactElement> = {
    home: <Home onNavigate={navigate} />,
    projects: <Projects />,
    about: <About />,
    comments: <Comments />,
  };

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <TopNav activePage={activePage} onNavigate={navigate} />
      {pages[activePage]}
      <div className="mobile-nav-wrapper">
        <BottomNav activePage={activePage} onNavigate={navigate} />
      </div>
    </div>
  );
}
