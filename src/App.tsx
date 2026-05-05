import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import IntroAnimation from './components/common/IntroAnimation/IntroAnimation';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  /* Aplica el tema guardado antes del primer pintado */
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <Home />
    </>
  );
}

export default App;
