import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Inicio from "./componentes/Inicio";
import Favoritos from "./componentes/Favoritos";
import Info from "./componentes/Info";
import Coleccion from "./componentes/Coleccion";
import Pokemon from "./componentes/Pokemon";
import Usuario from "./componentes/Usuario";
import './App.css';

const navItems = [
  { to: '/', label: 'Inicio', icon: '⌂' },
  { to: '/coleccion', label: 'Colección', icon: '▦' },
  { to: '/favoritos', label: 'Favoritos', icon: '♡' },
  { to: '/info', label: 'Acerca de', icon: '✦' },
  { to: '/usuario', label: 'Entrenador', icon: '♙' },
];

function Layout() {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const activeLabel = navItems.find(item => item.to === location.pathname)?.label || 'Pokémon';
  return (
    <div className="app-layout">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Pokédex, ir al inicio">
          <span className="brand-mark"><span /></span>
          <span className="brand-name">poké<span>dex</span></span>
        </Link>
        <button className="mobile-menu-toggle" onClick={() => setMobileMenu(v => !v)} aria-label="Abrir menú">
          {mobileMenu ? '×' : '☰'}
        </button>
        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`} aria-label="Navegación principal">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMobileMenu(false)}
              className={location.pathname === item.to ? 'nav-link nav-link-active' : 'nav-link'}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="header-pill"><span className="status-dot" /> PokéAPI en línea</div>
      </header>
      <main className="page-content">
        <div className="page-topline"><span>POKÉDEX DIGITAL</span><span className="topline-separator">/</span><span>{activeLabel}</span></div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/info" element={<Info />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <Link to="/" className="footer-brand"><span className="brand-mark"><span /></span> pokédex</Link>
        <span>Hecho para entrenadores curiosos.</span>
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">Datos de PokéAPI ↗</a>
      </footer>
      <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
        {navItems.slice(0, 4).map(item => <Link key={item.to} to={item.to} className={location.pathname === item.to ? 'mobile-nav-active' : ''}>
          <span>{item.icon}</span>{item.label}
        </Link>)}
      </nav>
    </div>
  );
}

function App() {
  return <Router><Layout /></Router>;
}
export default App;
