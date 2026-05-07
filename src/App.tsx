import { useState } from 'react';
import Home from './pages/Home/Home';
import IntroAnimation from './components/common/IntroAnimation/IntroAnimation';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <Home />
    </>
  );
}

export default App;
