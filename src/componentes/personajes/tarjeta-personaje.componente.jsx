import { useEffect, useState } from 'react';
import { addFavouriteCharacter, removeFavouriteCharacter } from '../../redux/favouriteCharactersSlice';
import { useAppDispatch } from '../../redux/hooks';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */
// TODO: type with TS 
const TarjetaPersonaje = ({character, isFavouriteCharacter}) => {
    const dispatch = useAppDispatch()
    const [isFavourite, setIsFavourite] = useState(isFavouriteCharacter)
    
    const updateFavouriteCharacter = _ => {
        if (isFavourite) {
            dispatch(removeFavouriteCharacter(character))
        } else {
            dispatch(addFavouriteCharacter(character))
        }
        setIsFavourite(!isFavourite)
    }

    return <div className="tarjeta-personaje">
        <img src={character.image} alt={character.name}/>
        <div className="tarjeta-personaje-body">
            <span>{character.name}</span>
            <BotonFavorito esFavorito={isFavourite} onClick={_ => updateFavouriteCharacter()} />
        </div>
    </div>
}

export default TarjetaPersonaje;