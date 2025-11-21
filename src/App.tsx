import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [view, setView] = useState<'home' | 'questionnaire' | 'notfound'>(() => {
    // Initialize view based on current URL
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p === '/eligibility' || p === '/eligibility') return 'questionnaire';
      if (p === '/' || p === '') return 'home';
      return 'notfound';
    }
    return 'home';
  });

  useEffect(() => {
    const onPopState = () => {
      const p = window.location.pathname;
      if (p === '/link/eligibility' || p === '/eligibility') setView('questionnaire');
      else if (p === '/' || p === '') setView('home');
      else setView('notfound');
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('home');
  };

  const navigateTo = (next: 'home' | 'questionnaire' | 'notfound') => {
    setView(next);
    try {
      let nextPath = '/';
      if (next === 'questionnaire') nextPath = '/eligibility';
      else if (next === 'notfound') nextPath = '/404';

      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
    } catch (err) {
      // ignore history errors in some environments
    }
  };

  return (
    <div className="App">
      <nav className="top-nav">
        <div className="nav-content">
          <a href="/" className="nav-logo" onClick={handleLogoClick}>
            <span>CertifyAI</span>
          </a>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#certifications" className="nav-link">Certifications</a>
            <a href="#resources" className="nav-link">Resources</a>
            <button className="nav-button">Contact Us</button>
          </div>
        </div>
      </nav>
      {view === 'notfound' ? (
        <NotFound onHome={() => navigateTo('home')} />
      ) : (
        <Home view={view as 'home' | 'questionnaire'} setView={navigateTo} />
      )}
    </div>
  );
}

export default App;
