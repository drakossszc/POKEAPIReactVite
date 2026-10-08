import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'
import './style.css'

function Itemdyd() {
    const { name } = useParams(); 
    const [itemdyd, setItemdyd] = useState([]);

    useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/2014/magic-items${name}`)
      .then(response => response.json())
      .then(responseData => setItemdyd(responseData))
      .catch(error => console.error("Error:", error));
    }, [name]); 
    console.log(itemdyd)
    
    if (!itemdyd || !itemdyd.index) return <p>Cargando...</p>;


    return (
        <div>
            <p><strong>ID:</strong> {itemdyd.index}</p>
            <h1>{itemdyd.name}</h1>

        <p><strong>Categoría:</strong> {itemdyd.equipment_category?.name}</p>
        <p><strong>Rareza:</strong> {itemdyd.rarity?.name}</p>

         {itemdyd.desc && (
            <div>
                <h3>Descripción:</h3>
                <p>{itemdyd.desc.join(' ')}</p>
            </div>
        )}
        <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
            </button>
    </div>
    
);
}

export default Itemdyd