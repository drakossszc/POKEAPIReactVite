import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Usuario() {
  const [nombre, setNombre] = useState(() => localStorage.getItem('nombreEntrenador') || '');
  const [editando, setEditando] = useState(false);
  const [borrador, setBorrador] = useState(nombre);
  const [favoritos, setFavoritos] = useState(0);
  const [capturados, setCapturados] = useState(0);

  useEffect(() => {
    try { setFavoritos(JSON.parse(localStorage.getItem('favoritos') || '[]').length); } catch { setFavoritos(0); }
    try { setCapturados(JSON.parse(localStorage.getItem('misNumeros') || '[]').length); } catch { setCapturados(0); }
  }, []);

  const guardarNombre = (e) => {
    e.preventDefault();
    const limpio = borrador.trim();
    setNombre(limpio);
    localStorage.setItem('nombreEntrenador', limpio);
    setEditando(false);
  };

  return <section className="trainer-page">
    <div className="trainer-banner"><div className="trainer-avatar">{(nombre.trim()[0] || 'E').toUpperCase()}</div><div className="trainer-welcome"><p className="eyebrow"><span/> TU ESPACIO PERSONAL</p><h1>¡Hola, {nombre || 'entrenador'}!</h1><p>Tu aventura Pokémon está tomando forma.</p></div><span className="trainer-banner-mark">✦</span></div>
    <div className="trainer-profile-card"><div className="trainer-card-heading"><div><p className="trainer-label">PERFIL DE ENTRENADOR</p><h2>{nombre || 'Entrenador Pokémon'}</h2><p>Tu nombre se guarda en este dispositivo.</p></div><button onClick={() => {setBorrador(nombre);setEditando(v => !v)}}>{editando ? 'Cancelar' : '✎ Editar perfil'}</button></div>
      {editando && <form className="trainer-edit-form" onSubmit={guardarNombre}><label htmlFor="trainer-name">¿Cómo te llamas?</label><div><input id="trainer-name" value={borrador} onChange={e => setBorrador(e.target.value)} maxLength={30} placeholder="Escribe tu nombre" autoFocus/><button type="submit">Guardar</button></div></form>}
    </div>
    <div className="trainer-stats"><article><span className="trainer-stat-icon">♡</span><div><strong>{favoritos}</strong><span>Favoritos</span></div><Link to="/favoritos">Ver lista ↗</Link></article><article><span className="trainer-stat-icon green">▦</span><div><strong>{capturados}</strong><span>En tu colección</span></div><Link to="/coleccion">Ver álbum ↗</Link></article></div>
    <div className="trainer-tip"><span>✦</span><div><strong>Consejo para entrenadores</strong><p>Explora la Pokédex y abre las fichas para conocer estadísticas y guardar tus Pokémon favoritos.</p></div><Link to="/">Empezar a explorar ↗</Link></div>
  </section>;
}
export default Usuario;
