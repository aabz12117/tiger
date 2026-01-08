import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Updates from './pages/Updates';
import Rules from './pages/Rules';
import About from './pages/About';
import Creators from './pages/Creators';
import Suggestions from './pages/Suggestions';
import Secret from './pages/Secret';
import StatusPage from './pages/StatusPage';
import Admin from './pages/Admin';
import StatusBanner from './components/StatusBanner';
import { useState, useEffect } from 'react';
import { AvatarProvider } from './context/AvatarContext';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className="cursor-outline"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering ? 'var(--color-primary)' : 'var(--color-accent)',
          backgroundColor: isHovering ? 'rgba(0, 86, 179, 0.1)' : 'transparent'
        }}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AvatarProvider>
        <Cursor />
        <div className="app-container">
          <Navbar />
          <StatusBanner />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/about" element={<About />} />
              <Route path="/creators" element={<Creators />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/secret" element={<Secret />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AvatarProvider>
    </Router>
  );
}

export default App;
