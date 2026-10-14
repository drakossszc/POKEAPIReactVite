import { Link } from 'react-router-dom';
import './style.css';

function Info() {
  return <section className="info-page">
    <div className="info-hero"><p className="eyebrow"><span/> CONOCE TU POKÉDEX</p><h1>Más que una lista.<br/><em>Una aventura.</em></h1><p>Un espacio para explorar el universo Pokémon, descubrir criaturas y construir tu propia colección, una captura a la vez.</p><div className="info-pokeball">✦</div></div>
    <div className="info-feature-grid">
      <article><span className="info-feature-icon">⌕</span><h2>Explora</h2><p>Busca por nombre, número o tipo y encuentra la ficha de cada Pokémon.</p><Link to="/">Ir a la Pokédex ↗</Link></article>
      <article><span className="info-feature-icon">♡</span><h2>Guarda favoritos</h2><p>Marca tus criaturas preferidas y vuelve a consultarlas cuando quieras.</p><Link to="/favoritos">Ver favoritos ↗</Link></article>
      <article><span className="info-feature-icon">▦</span><h2>Completa tu álbum</h2><p>Consigue Pokémon al azar y sigue tu progreso en la colección personal.</p><Link to="/coleccion">Abrir colección ↗</Link></article>
    </div>
    <div className="info-credit"><div><span className="credit-spark">✦</span><div><h2>Datos para descubrir</h2><p>La información de Pokémon se consulta desde PokéAPI, una API pública y comunitaria.</p></div></div><a href="https://pokeapi.co/" target="_blank" rel="noreferrer">Visitar PokéAPI ↗</a></div>
  </section>;
}
export default Info;
