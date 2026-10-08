import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <>
      <div className="c-lista">
        {favoritos.map((itemdyd) => (
          <div
            key={itemdyd.id}
            className="c-lista-itemsmagicos"
            onClick={() => navigate(`/itemD&D/${itemdyd.nombre}`)}
          >
            <p>{itemdyd.id}</p>
            <p>{itemdyd.nombre}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={`ItemMagico ${pokemon.nombre}`}
              width="auto"
              height="60"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favoritos