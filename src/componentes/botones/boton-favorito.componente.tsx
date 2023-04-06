import './boton-favorito.css';
import PropTypes from 'prop-types'
interface PropsBotonFavorito {
    esFavorito: Boolean,
    onClick: Function
}

/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * @param {boolean} esFavorito indica si el personaje es favorito o no para mostrar una imagen de estrella acorde
 * @param {() => void} Función que maneja la acción al presionar la estrella de favorito del personaje
 * @use `<BotonFavorito esFavorito={esFavorito} onClick={onClick} />`
 * @returns `<div> {...} </div>`
 */
const BotonFavorito = ({esFavorito, onClick}: PropsBotonFavorito) => {
    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return <div className="boton-favorito" onClick={_ => onClick()}>
        <img src={src} alt={"favorito"} />
    </div>
}

BotonFavorito.propTypes = {
    /**
     * Boolean que indica si el personaje es favorito o no para mostrar una imagen de estrella acorde
     */
    esFavorito: PropTypes.bool,
    /**
     * Función que maneja la acción al presionar la estrella de favorito del personaje
     */
    onClick: PropTypes.func.isRequired
}

export default BotonFavorito;