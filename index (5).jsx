import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('favoritos', JSON.stringify(favoritos)); }, [favoritos]);
  const quitar = (id) => setFavoritos(actuales => actuales.filter(p => Number(p.id) !== Number(id)));

  return <section className="favorites-page">
    <div className="favorites-heading"><div><p className="eyebrow"><span/> TU EQUIPO PERSONAL</p><h1>Mis favoritos<span>.</span></h1><p>Las criaturas que quieres tener siempre cerca.</p></div><div className="favorites-counter"><strong>{favoritos.length}</strong><span>Pokémon guardados</span></div></div>
    {favoritos.length === 0 ? <div className="favorites-empty"><div className="empty-pokeball">♡</div><h2>Tu equipo aún está vacío</h2><p>Explora la Pokédex y toca el corazón de un Pokémon para guardarlo aquí.</p><button onClick={() => navigate('/')}>Explorar Pokémon <span>↗</span></button></div> :
      <div className="favorites-grid">{favoritos.map(pokemon => <article className="favorite-card" key={pokemon.id}>
        <button className="remove-favorite" onClick={() => quitar(pokemon.id)} aria-label={`Quitar a ${pokemon.nombre} de favoritos`}>♥</button>
        <button className="favorite-card-main" onClick={() => navigate(`/pokemon/${pokemon.nombre || pokemon.id}`)}>
          <span className="favorite-id">N.º {String(pokemon.id).padStart(3,'0')}</span>
          <span className="favorite-art"><span/><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.nombre} loading="lazy"/></span>
          <strong>{pokemon.nombre || `Pokémon ${pokemon.id}`}</strong><span className="favorite-view">Ver ficha ↗</span>
        </button>
      </article>)}</div>}
  </section>;
}
export default Favoritos;
