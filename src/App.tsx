import { useState } from 'react';
import type React from 'react';
import TopNav from './components/common/TopNav';
import BottomNav from './components/common/BottomNav';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import './components/common/TopNav.css';
import './styles/index.css';

type Page = 'home' | 'projects' | 'about' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  const navigate = (p: string) => setActivePage(p as Page);

  const pages: Record<Page, React.ReactElement> = {
    home: <Home onNavigate={navigate} />,
    projects: <Projects />,
    about: <About />,
    contact: <About />,
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
