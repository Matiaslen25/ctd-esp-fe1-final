import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addFavouriteCharacter, removeFavouriteCharacter } from '../../redux/favouriteCharactersSlice';
import { useAppDispatch } from '../../redux/hooks';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { Character } from '../../redux/types';

interface PropsGrillaPersonaje {
    character: Character
    isFavouriteCharacter: boolean
}

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes.
 * @param {Character} character Objeto de tipo Character del que se va a mostrar los detalles
 * @param {boolean} isFavouriteCharacter Boolean que indica si el personaje es favorito o no
 * @use `<TarjetaPersonaje character={character} isFavouriteCharacter={isFavouriteCharacter} />`
 * @returns `<div> {...} </div>`
 */

const TarjetaPersonaje = ({character, isFavouriteCharacter}: PropsGrillaPersonaje) => {
    const dispatch = useAppDispatch()
    const [isFavourite, setIsFavourite] = useState(!!isFavouriteCharacter)
    
    const updateFavouriteCharacter = () => {
        if (isFavourite) {
            dispatch(removeFavouriteCharacter(character))
        } else {
            dispatch(addFavouriteCharacter(character))
        }
        setIsFavourite(!isFavourite)
    }

    return <div className="tarjeta-personaje">
        <Link to={`/detalle/${character.id}`}><img src={character.image} alt={character.name}/></Link>
        <div className="tarjeta-personaje-body">
            <span>{character.name}</span>
            <BotonFavorito esFavorito={isFavourite} onClick={() => updateFavouriteCharacter()} />
        </div>
    </div>
}

export default TarjetaPersonaje;