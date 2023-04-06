import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { removeAllFavouriteCharacters } from "../redux/favouriteCharactersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * @use `<PaginaFavoritos />`
 * 
 * @returns `<div> {...} </div>`
 */
const PaginaFavoritos = () => {
    const favouriteCharacters = useAppSelector(state => state.favouriteCharacters)
    const dispatch = useAppDispatch()

    const limpiarFavoritos = () => {
        if (window.confirm('¿Querés eliminar todos los personajes favoritos?')) {
            dispatch(removeAllFavouriteCharacters())
        }
    }
    
    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            {favouriteCharacters.length ? <button className="danger" onClick={() => limpiarFavoritos()}>Eliminar todos</button> : ''}
        </div>
        <GrillaPersonajes userFavouriteCharacters={favouriteCharacters} />
    </div>
}

export default PaginaFavoritos