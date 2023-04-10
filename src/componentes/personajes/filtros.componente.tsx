import { setPageUrl } from '../../redux/charactersSlice';
import { useAppDispatch } from '../../redux/hooks';
import './filtros.css';

/**
 * Componente que contiene un input para filtrar los personajes y un botón para reiniciar los filtros
 * @use `<Filtros />`
 * @returns `<div> {...} </div>`
 */
const Filtros = () => {
    const dispatch = useAppDispatch()

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        dispatch(setPageUrl(`https://rickandmortyapi.com/api/character?name=${name}`))
    }


    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={onInputChange} />
    </div>
}

export default Filtros;