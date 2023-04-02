import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';


/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

const NoFavouriteCharacters = _ => {
    return <div>Todavía no tenés personajes favoritos</div>
}

const GrillaPersonajes = ({ charactersPageData, userFavouriteCharacters }) => {
    const favouriteCharacters = useAppSelector(state => state.favouriteCharacters)
    
    return <div className="grilla-personajes">
       {
        userFavouriteCharacters ? !userFavouriteCharacters.length ? <NoFavouriteCharacters /> : userFavouriteCharacters.map(character => {
            const isFavouriteCharacter = favouriteCharacters.find(char => char.id === character.id)
            return <TarjetaPersonaje key={character.id} character={character} isFavouriteCharacter={isFavouriteCharacter}/>
        }) :
        charactersPageData.loading ? 'Cargando información de personajes...' :
        !charactersPageData.charactersData.results.length ? 'Ocurrió un error al obtener los personajes, por favor comprobá los parámetros e intentalo nuevamente' :
        charactersPageData.charactersData.results.map(character => {
            const isFavouriteCharacter = favouriteCharacters.find(char => char.id === character.id)
            return <TarjetaPersonaje key={character.id} character={character} isFavouriteCharacter={isFavouriteCharacter}/>
        })
       }
    </div>
}
 
export default GrillaPersonajes;