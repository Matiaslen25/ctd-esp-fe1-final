import './grilla-personajes.css';
import { useEffect, useState } from 'react'
import TarjetaPersonaje from './tarjeta-personaje.componente';


/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */
const GrillaPersonajes = ({ charactersPageData }) => {
    return <div className="grilla-personajes">
       {
        charactersPageData.loading ? 'Cargando información de personajes...' :
        !charactersPageData.charactersData.results.length ? 'Ocurrió un error al obtener los personajes, por favor comprobá los parámetros e intentalo nuevamente' :
        charactersPageData.charactersData.results.map(character => <TarjetaPersonaje key={character.id} character={character}/>)
       }
    </div>
}
 
export default GrillaPersonajes;