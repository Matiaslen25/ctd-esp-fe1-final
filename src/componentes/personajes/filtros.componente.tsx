import './filtros.css';

interface PropsFiltrosComponente {
    setPageUrl: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Componente que contiene un input para filtrar los personajes y un botón para reiniciar los filtros
 * @param {React.Dispatch<React.SetStateAction<string>>} setPageUrl función que modifica el estado de la url a utilizar para obtener la información de los personajes paginados
 * @use `<Filtros setPageUrl={setPageUrl} />`
 * @returns `<div> {...} </div>`
 */
const Filtros = ({ setPageUrl }: PropsFiltrosComponente) => {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setPageUrl(`https://rickandmortyapi.com/api/character?name=${name}`)
    }

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={onInputChange} />
    </div>
}

export default Filtros;