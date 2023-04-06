import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCharacterById } from "../redux/characterDetailSlice";
import { useEffect, useState } from "react";
import { addFavouriteCharacter, removeFavouriteCharacter } from "../redux/favouriteCharactersSlice";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * @use `<PaginaDetalle />`
 * @returns `<div> {...} </div>` o 'Cargando información...'
 */
const PaginaDetalle = () => {
    const detalleId: string | undefined = useParams().detalleId
    const dispatch = useAppDispatch()
    
    const characterDetail = useAppSelector(state => state.characterDetail)
    useEffect(() => {
        if (detalleId) {
            dispatch(getCharacterById(Number.parseInt(detalleId)))
        }
    }, [])
    
    const favouriteCharacters = useAppSelector(state => state.favouriteCharacters)
    const [isFavouriteCharacter, setIsFavouriteCharacter] = useState(!!favouriteCharacters.find(char => char.id.toString() === detalleId))

    const updateFavouriteCharacter = () => {
        if (isFavouriteCharacter) {
            dispatch(removeFavouriteCharacter(characterDetail.characterDetail))
        } else {
            dispatch(addFavouriteCharacter(characterDetail.characterDetail))
        }
        setIsFavouriteCharacter(!isFavouriteCharacter)
    }
    console.log("character error", characterDetail.characterError);
    return characterDetail.loading ? 'Cargando información...' : characterDetail.characterError ?
    <div className="container">
        Ocurrió un error al obtener el personaje
    </div>
    :
    <div className="container">
        <h3>{characterDetail.characterDetail.name}</h3>
        <div className={"detalle"}>
            <div className={"detalle-header"}>
                <img src={characterDetail.characterDetail.image} alt={characterDetail.characterDetail.name}/>
                <div className={"detalle-header-texto"}>

                    <p>{characterDetail.characterDetail.name}</p>
                    <p>Planeta: {characterDetail.characterDetail.origin.name}</p>
                    <p>Genero: {characterDetail.characterDetail.gender}</p>
                </div>
                <BotonFavorito esFavorito={isFavouriteCharacter} onClick={() => updateFavouriteCharacter()} />
            </div>
        </div>
        <h4>Lista de episodios donde apareció el personaje</h4>
        <div className={"episodios-grilla"}>
            {
                characterDetail.loading ? 'Cargando episodios...' : (characterDetail.episodesError) ? 'Ocurrió un error al obtener los episodios del personaje' :
                characterDetail.episodesDetail.map(ep => <TarjetaEpisodio key={ep.id} episode={ep}/>)
            }
        </div>
    </div>
}

export default PaginaDetalle