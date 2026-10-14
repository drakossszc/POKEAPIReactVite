import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './style.css';

const TYPE_NAMES = {normal:'Normal',fire:'Fuego',water:'Agua',electric:'Eléctrico',grass:'Planta',ice:'Hielo',fighting:'Lucha',poison:'Veneno',ground:'Tierra',flying:'Volador',psychic:'Psíquico',bug:'Bicho',rock:'Roca',ghost:'Fantasma',dragon:'Dragón',dark:'Siniestro',steel:'Acero',fairy:'Hada'};
const STAT_NAMES = {hp:'PS',attack:'Ataque',defense:'Defensa','special-attack':'At. especial','special-defense':'Def. especial',speed:'Velocidad'};

function Pokemon() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [datapoke, setDatapoke] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [favoritos, setFavoritos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    let activo = true;
    setCargando(true); setError(''); setDatapoke(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`)
      .then(response => { if (!response.ok) throw new Error('Pokémon no encontrado'); return response.json(); })
      .then(data => { if (activo) setDatapoke(data); })
      .catch(() => { if (activo) setError('No encontramos esa criatura. Vuelve a la Pokédex e inténtalo de nuevo.'); })
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, [name]);

  const esFavorito = !!datapoke && favoritos.some(p => Number(p.id) === datapoke.id);
  const toggleFavorito = () => {
    if (!datapoke) return;
    const nuevos = esFavorito
      ? favoritos.filter(p => Number(p.id) !== datapoke.id)
      : [...favoritos, { id: datapoke.id, nombre: datapoke.name }];
    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
  };

  if (cargando) return <div className="pokemon-detail-message"><div className="detail-loader"/><h2>Cargando Pokémon…</h2><p>Estamos preparando su ficha.</p></div>;
  if (error || !datapoke) return <div className="pokemon-detail-message"><span className="detail-error-mark">!</span><h2>¡Ups! No lo encontramos</h2><p>{error}</p><button onClick={() => navigate('/')}>Volver a explorar</button></div>;

  const tipoPrincipal = datapoke.types?.[0]?.type?.name || 'normal';
  return <section className={`pokemon-detail-page type-${tipoPrincipal}`}>
    <button className="detail-back" onClick={() => navigate(-1)}>← <span>Volver</span></button>
    <div className="pokemon-detail-card">
      <div className="pokemon-detail-art">
        <span className="detail-number">N.º {String(datapoke.id).padStart(3,'0')}</span>
        <div className="detail-art-halo"/><img src={datapoke.sprites?.other?.['official-artwork']?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`} alt={datapoke.name}/>
        <span className="detail-watermark">POKÉDEX</span>
      </div>
      <div className="pokemon-detail-content">
        <p className="detail-eyebrow">FICHA DEL POKÉMON</p>
        <div className="detail-title-row"><h1>{datapoke.name.replaceAll('-', ' ')}</h1><button className={`detail-favorite ${esFavorito ? 'saved' : ''}`} onClick={toggleFavorito} aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}>{esFavorito ? '♥' : '♡'} <span>{esFavorito ? 'Guardado' : 'Favorito'}</span></button></div>
        <div className="detail-types">{datapoke.types.map(({type}) => <span className={`detail-type type-chip-${type.name}`} key={type.name}>{TYPE_NAMES[type.name] || type.name}</span>)}</div>
        <div className="detail-measurements"><div><span>Altura</span><strong>{(datapoke.height / 10).toFixed(1)} m</strong></div><div><span>Peso</span><strong>{(datapoke.weight / 10).toFixed(1)} kg</strong></div><div><span>Experiencia base</span><strong>{datapoke.base_experience ?? '—'}</strong></div></div>
        <h2 className="detail-stats-title">Estadísticas base</h2>
        <div className="detail-stats">{datapoke.stats.map(({base_stat,stat}) => <div className="detail-stat-row" key={stat.name}><span>{STAT_NAMES[stat.name] || stat.name}</span><strong>{base_stat}</strong><div className="detail-stat-track"><div style={{width:`${Math.min(base_stat/255*100,100)}%`}}/></div></div>)}</div>
        <button className="next-pokemon-button" onClick={() => navigate(`/pokemon/${datapoke.id === 1025 ? 1 : datapoke.id + 1}`)}>Siguiente Pokémon <span>→</span></button>
      </div>
    </div>
  </section>;
}
export default Pokemon;
