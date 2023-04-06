import './boton-favorito.css';
import PropTypes from 'prop-types'

/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */

interface PropsBotonFavorito {
    esFavorito: Boolean,
    onClick: Function
}

const BotonFavorito = ({esFavorito, onClick}: PropsBotonFavorito) => {
    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return <div className="boton-favorito" onClick={_ => onClick()}>
        <img src={src} alt={"favorito"} />
    </div>
}

BotonFavorito.propTypes = {
    esFavorito: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

export default BotonFavorito;