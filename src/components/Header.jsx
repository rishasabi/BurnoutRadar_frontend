import { useNavigate, useLocation } from "react-router-dom";
import Btn from "./Btn";
import { C } from "../data/constants";
import logo from "../assets/burnout.png";
import { useEffect, useState, useRef } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState(() => localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentPath = location.pathname;

  useEffect(() => {
    const onUserChanged = () => setUserName(localStorage.getItem('user'));
    window.addEventListener('userChanged', onUserChanged);
    const onStorage = (e) => { if (e.key === 'user') onUserChanged(); };
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('userChanged', onUserChanged); window.removeEventListener('storage', onStorage); };
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged'));
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(251,248,204,0.82)",
        backdropFilter: "blur(20px)",
        borderBottom: "1.5px solid rgba(255,255,255,0.8)",
        boxShadow: "0 4px 24px rgba(160,120,200,0.1)",
      }}
    >
      {/* Logo Section */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <img
          src={logo}
          alt="BurnoutRadar Logo"
          style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 10 }}
        />
        <span
          style={{
            fontFamily: "'Comfortaa', cursive",
            fontWeight: 700,
            fontSize: 20,
            background: "linear-gradient(135deg, #7c5cbf, #4a8fc4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BurnoutRadar
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: 8, alignItems: "center", position: 'relative' }}>
        {currentPath !== "/dashboard" && (
          <Btn
            onClick={() => navigate("/dashboard")}
            variant="outline"
            style={{ padding: "8px 20px", fontSize: 13 }}
          >
            Dashboard
          </Btn>
        )}

        {!userName ? (
          <Btn
            onClick={() => navigate('/login')}
            style={{ padding: '8px 20px', fontSize: 13 }}
          >
            Login
          </Btn>
        ) : (
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button onClick={() => setMenuOpen(o => !o)} style={{ border: 'none', background: 'linear-gradient(135deg,#F1C0E8,#CFBAF0)', padding: '8px 18px', borderRadius: 20, cursor: 'pointer', fontWeight: 700 }}>
              👤 {userName}
            </button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, marginTop: 8, background: 'white', borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: 8, minWidth: 140 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button onClick={() => { navigate('/dashboard'); setMenuOpen(false); }} style={{ background: 'transparent', border: 'none', textAlign: 'left', padding: '8px 10px', cursor: 'pointer' }}>Dashboard</button>
                  <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', textAlign: 'left', padding: '8px 10px', cursor: 'pointer', color: '#c0392b' }}>Logout</button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}