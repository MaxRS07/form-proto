import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Status from './pages/Status';
import NotFound from './pages/NotFound';

function App() {
  const [view, setView] = useState<'home' | 'questionnaire' | 'apply' | 'status' | 'notfound'>(() => {
    // Initialize view based on current URL
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p === '/status') return 'status';
      if (p === '/apply') return 'apply';
      if (p === '/eligibility') return 'questionnaire';
      if (p === '/' || p === '') return 'home';
      return 'notfound';
    }
    return 'home';
  });

  useEffect(() => {
    const onPopState = () => {
      const p = window.location.pathname;
      if (p === '/status') setView('status');
      else if (p === '/apply') setView('apply');
      else if (p === '/link/eligibility' || p === '/eligibility') setView('questionnaire');
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

  const navigateTo = (next: 'home' | 'questionnaire' | 'apply' | 'status' | 'notfound') => {
    setView(next);
    try {
      let nextPath = '/';
      if (next === 'questionnaire') nextPath = '/eligibility';
      else if (next === 'apply') nextPath = '/apply';
      else if (next === 'status') nextPath = '/status';
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
            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>About</a>
            <a href="/apply" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('apply'); }}>Certifications</a>
            <a href="/status" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('status'); }}>Resources</a>
            <button className="nav-button" onClick={() => navigateTo('apply')}>Contact Us</button>
          </div>
        </div>
      </nav>
      {view === 'status' ? (
        <Status />
      ) : view === 'apply' ? (
        <Apply />
      ) : view === 'notfound' ? (
        <NotFound onHome={() => navigateTo('home')} />
      ) : (
        <Home view={view as 'home' | 'questionnaire'} setView={navigateTo} />
      )}
    </div>
  );
}

export default App;
