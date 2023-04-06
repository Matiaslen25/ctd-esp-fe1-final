import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { CharactersData, Character } from '../../redux/types';


/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface PropsGrillaPersonaje {
    charactersPageData?: CharactersData
    userFavouriteCharacters?: Character[]
}

const NoFavouriteCharacters = () => {
    return <div>Todavía no tenés personajes favoritos</div>
}

/**
 * Componente que muestra personajes paginados o los personajes favoritos según el caso
 * @param {CharactersData} charactersPageData En caso de estar mostrando los personajes paginados, se extrae la información de los personajes de esta prop
 * @param {userFavouriteCharacters} userFavouriteCharacters En caso de estar mostrando los personajes favoritos, se extrae la información de los personajes de esta prop
 * @use `<GrillaPersonajes charactersPageData={charactersPageData} />` o `<GrillaPersonajes userFavouriteCharacters={userFavouriteCharacters} />`
 * @returns `<div> {...} </div>`
 */
const GrillaPersonajes = ({ charactersPageData, userFavouriteCharacters }: PropsGrillaPersonaje) => {
    const favouriteCharacters = useAppSelector(state => state.favouriteCharacters)
    
    return <div className="grilla-personajes">
       {
        userFavouriteCharacters ? !userFavouriteCharacters.length ? <NoFavouriteCharacters /> : userFavouriteCharacters.map(character => {
            const isFavouriteCharacter = favouriteCharacters.find(char => char.id === character.id)
            return <TarjetaPersonaje key={character.id} character={character} isFavouriteCharacter={!!isFavouriteCharacter}/>
        }) :
        charactersPageData?.loading ? 'Cargando información de personajes...' :
        !charactersPageData?.charactersData.results.length ? 'Ocurrió un error al obtener los personajes, por favor comprobá los parámetros e intentalo nuevamente' :
        charactersPageData.charactersData.results.map(character => {
            const isFavouriteCharacter = favouriteCharacters.find(char => char.id === character.id)
            return <TarjetaPersonaje key={character.id} character={character} isFavouriteCharacter={!!isFavouriteCharacter}/>
        })
       }
    </div>
}
 
export default GrillaPersonajes;