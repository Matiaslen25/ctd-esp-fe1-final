import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useEffect, useState } from "react";
import { getCharactersPage } from '../redux/charactersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * @use `<PaginaInicio />`
 * 
 * @returns `<form> {...} </form>`
 */
const PaginaInicio = () => {
    const dispatch = useAppDispatch()

    const [pageUrl, setPageUrl] = useState('')
    const charactersPageData = useAppSelector(state => state.characters)
    useEffect(() => {
        dispatch(getCharactersPage(pageUrl || 'https://rickandmortyapi.com/api/character?page=1'))
    }, [pageUrl])

    return <form className="container" onSubmit={event => event.preventDefault()}>
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger" type="reset" onClick={_ => setPageUrl('')}>Limpiar filtros</button>
        </div>
        {
            charactersPageData.error ? 'Ocurrió un error al obtener los personajes' :
            <>
                <Filtros setPageUrl={setPageUrl} />
                <Paginacion setPageUrl={setPageUrl} nextPageUrl={!charactersPageData.loading ? charactersPageData.charactersData.info.next || undefined : undefined} previousPageUrl={!charactersPageData.loading ? charactersPageData.charactersData.info.prev || undefined : undefined} />
                <GrillaPersonajes charactersPageData={charactersPageData}/>
                <Paginacion setPageUrl={setPageUrl} nextPageUrl={!charactersPageData.loading ? charactersPageData.charactersData.info.next || undefined : undefined} previousPageUrl={!charactersPageData.loading ? charactersPageData.charactersData.info.prev || undefined : undefined} />
            </>
        }
    </form>
}

export default PaginaInicio