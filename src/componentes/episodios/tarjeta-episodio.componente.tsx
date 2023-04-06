import './tarjeta-episodio.css';
import { Episode } from '../../redux/types';

interface PropsTarjetaEpisodio {
    episode: Episode
}

/**
 * Tarjeta para cada episodio dentro de la vista de personaje.
 * @param {Episode} episode Episodio del que se va a mostrar la información
 * @use `<TarjetaEpisodio episode={episode} />`
 * @returns `<div> {...} </div>`
 */
const TarjetaEpisodio = ({ episode }: PropsTarjetaEpisodio) => {
    return <div className="tarjeta-episodio">
            <h4>{episode.name}</h4>
            <div>
                <span>{episode.episode}</span>
                <span>Lanzado el: {episode.air_date}</span>
            </div>
    </div>
}

export default TarjetaEpisodio;
