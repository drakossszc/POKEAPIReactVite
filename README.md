# Pokédex — React + Vite

Aplicación de Pokédex desarrollada con React y Vite, conectada a la API pública de [PokéAPI](https://pokeapi.co/).

## Funcionalidades

- Explorar Pokémon con búsqueda por nombre o número y filtros por tipo.
- Consultar la ficha individual, tipos, medidas y estadísticas base.
- Guardar y quitar favoritos.
- Llevar una colección de Pokémon capturados.
- Personalizar el nombre del entrenador.
- Navegación entre Inicio, Colección, Favoritos, Acerca de y Entrenador.
- Interfaz adaptable a escritorio y móvil.

## Ejecutar el proyecto

Necesitas Node.js instalado y conexión a internet para consultar PokéAPI.

```bash
npm install
npm run dev
```

Para generar una compilación de producción:

```bash
npm run build
npm run preview
```

## Estructura

- `src/App.jsx`: navegación y estructura principal.
- `src/components/`: componentes de cada sección.
- `src/App.css` y `src/index.css`: estilos globales.
- `public/`: recursos estáticos.

Los favoritos, la colección y el nombre del entrenador se guardan en `localStorage` del navegador.

## Fuente de datos

Los datos se consultan desde https://pokeapi.co/. Este proyecto es una aplicación de fans y no está afiliado a Nintendo ni a The Pokémon Company.
