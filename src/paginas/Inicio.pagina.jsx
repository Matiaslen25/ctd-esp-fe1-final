import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useEffect, useState } from "react";
import { getCharactersPage } from '../redux/charactersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
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
            {/* <button className="danger" onClick={_ => setPageUrl('')}>Limpiar filtros</button> */}
            <button className="danger" type="reset" onClick={_ => setPageUrl('')}>Limpiar filtros</button>
        </div>
        <Filtros setPageUrl={setPageUrl} />
        <Paginacion page={pageUrl} setPageUrl={setPageUrl} nextPageUrl={!charactersPageData.loading && charactersPageData.charactersData.info.next} previousPageUrl={!charactersPageData.loading && charactersPageData.charactersData.info.prev} />
        <GrillaPersonajes charactersPageData={charactersPageData}/>
        <Paginacion pageUrl={pageUrl} setPageUrl={setPageUrl} nextPageUrl={!charactersPageData.loading && charactersPageData.charactersData.info.next} previousPageUrl={!charactersPageData.loading && charactersPageData.charactersData.info.prev} />
    </form>
}

export default PaginaInicio