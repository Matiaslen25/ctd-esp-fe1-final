import './filtros.css';

const Filtros = ({ setPageUrl }) => {
    const onInputChange = (event) => {
        const name = event.target.value
        setPageUrl(`https://rickandmortyapi.com/api/character?name=${name}`)
    }

    return <div className="filtros">
        <label for="nombre">Filtrar por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={onInputChange} />
    </div>
}

export default Filtros;