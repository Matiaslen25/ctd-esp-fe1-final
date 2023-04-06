import './filtros.css';

interface PropsFiltrosComponente {
    setPageUrl: React.Dispatch<React.SetStateAction<string>>
}

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