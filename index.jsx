import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const TYPE_NAMES = {
  All: 'Todos', normal: 'Normal', fighting: 'Lucha', flying: 'Volador', poison: 'Veneno',
  ground: 'Tierra', rock: 'Roca', bug: 'Bicho', ghost: 'Fantasma', steel: 'Acero',
  fire: 'Fuego', water: 'Agua', grass: 'Planta', electric: 'Eléctrico', psychic: 'Psíquico',
  ice: 'Hielo', dragon: 'Dragón', dark: 'Siniestro', fairy: 'Hada'
};
const TYPES = Object.keys(TYPE_NAMES);
const ART = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const getId = url => Number(url.split('/').filter(Boolean).at(-1));

function Inicio() {
  const [todoslospokes, setTodoslospokes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipopoke, setTipopoke] = useState('All');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [limite, setLimite] = useState(24);
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;
    const cargarPokemons = async () => {
      setCargando(true);
      setError('');
      try {
        const endpoint = tipopoke === 'All'
          ? 'https://pokeapi.co/api/v2/pokemon?limit=1025'
          : `https://pokeapi.co/api/v2/type/${tipopoke}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('No fue posible consultar PokéAPI.');
        const data = await response.json();
        const lista = tipopoke === 'All'
          ? (data.results || [])
          : (data.pokemon || []).map(entry => entry.pokemon);
        if (activo) setTodoslospokes(lista);
      } catch {
        if (activo) setError('No pudimos conectar con PokéAPI. Revisa tu conexión e inténtalo de nuevo.');
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargarPokemons();
    return () => { activo = false; };
  }, [tipopoke]);

  useEffect(() => setLimite(24), [tipopoke, busqueda]);

  const resultados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return todoslospokes;
    return todoslospokes.filter(pokemon => {
      const id = getId(pokemon.url);
      return pokemon.name.toLowerCase().includes(texto) || String(id) === texto.replace(/^#/, '');
    });
  }, [todoslospokes, busqueda]);

  const favoritos = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]'); } catch { return []; }
  }, []);

  return (
    <div className="inicio-page">
      <section className="inicio-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> TU AVENTURA COMIENZA AQUÍ</p>
          <h1>Descubre tu<br /><em>próximo Pokémon.</em></h1>
          <p className="hero-description">Explora criaturas, descubre sus tipos y encuentra a tus favoritos. Tu próxima aventura empieza con una búsqueda.</p>
          <a className="hero-action" href="#explorar-pokemon">Explorar Pokédex <span>↓</span></a>
          <div className="hero-metrics"><div><strong>1.025</strong><span>Pokémon para descubrir</span></div><i /><div><strong>18</strong><span>tipos elementales</span></div></div>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          <div className="hero-ring ring-a" /><div className="hero-ring ring-b" /><span className="hero-star star-a">✦</span><span className="hero-star star-b">✧</span>
          <img src={ART(25)} alt="" /><span className="hero-caption">#025 · PIKACHU</span>
        </div>
        <span className="hero-footnote">POKÉDEX DIGITAL <b>—</b> EDICIÓN ENTRENADOR</span>
      </section>

      <section className="explore-section" id="explorar-pokemon">
        <div className="explore-heading">
          <div><p className="eyebrow">EL MUNDO POKÉMON</p><h2>Explora la Pokédex<span>.</span></h2><p>¿A quién vas a descubrir hoy?</p></div>
          <div className="explore-live"><span /> DATOS EN VIVO</div>
        </div>
        <div className="explore-tools">
          <label className="pokemon-search"><span>⌕</span><input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Busca por nombre o número…" aria-label="Buscar por nombre o número" />{busqueda && <button onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda">×</button>}<kbd>⌕</kbd></label>
          <p className="filter-label">FILTRAR POR TIPO</p>
          <div className="type-filter-list">
            {TYPES.map(tipo => <button key={tipo} onClick={() => setTipopoke(tipo)} className={`type-filter ${tipopoke === tipo ? 'selected' : ''} ${tipo !== 'All' ? `filter-${tipo}` : ''}`}>{TYPE_NAMES[tipo]}</button>)}
          </div>
        </div>
        <div className="results-meta"><span>{cargando ? 'Preparando la Pokédex…' : `${resultados.length.toLocaleString('es-CO')} Pokémon encontrados`}</span>{tipopoke !== 'All' && <button onClick={() => setTipopoke('All')}>Quitar filtro ×</button>}</div>
        {error && <div className="inicio-message"><span>!</span><p>{error}</p><button onClick={() => setTipopoke(t => t)}>Reintentar</button></div>}
        {cargando && todoslospokes.length === 0 && <div className="pokemon-grid">{Array.from({length:8},(_,i)=><div className="pokemon-skeleton" key={i}><div/><span/><i/></div>)}</div>}
        {!cargando && !error && resultados.length === 0 && <div className="inicio-empty"><span>⌕</span><h3>No encontramos Pokémon</h3><p>Prueba otro nombre, número o tipo.</p><button onClick={() => {setBusqueda('');setTipopoke('All')}}>Ver toda la Pokédex</button></div>}
        <div className="pokemon-grid">
          {resultados.slice(0, limite).map(pokemon => {
            const id = getId(pokemon.url);
            const esFavorito = favoritos.some(p => Number(p.id) === id);
            return <button type="button" className="pokemon-card" key={`${tipopoke}-${pokemon.name}`} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
              <span className="pokemon-id">N.º {String(id).padStart(3,'0')}</span><span className="card-heart" aria-label={esFavorito ? 'Está en favoritos' : ''}>{esFavorito ? '♥' : '↗'}</span>
              <span className="pokemon-art"><span className="art-halo"/><img src={ART(id)} alt={pokemon.name} loading="lazy" onError={e => {e.currentTarget.style.visibility='hidden'}} /></span>
              <span className="pokemon-name">{pokemon.name.replaceAll('-', ' ')}</span><span className="pokemon-card-hint">Ver ficha <b>↗</b></span>
            </button>;
          })}
        </div>
        {!cargando && !error && resultados.length > limite && <div className="load-more-area"><button className="load-more-button" onClick={() => setLimite(n => n + 24)}>Cargar más Pokémon <span>↓</span></button><p>Hay muchas más criaturas esperándote.</p></div>}
      </section>
    </div>
  );
}
export default Inicio;
