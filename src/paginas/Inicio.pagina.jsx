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
    const [page, setPage] = useState(1)
    
    const dispatch = useAppDispatch()
    const charactersPageData = useAppSelector(state => state.characters)
    useEffect(() => {
        dispatch(getCharactersPage(page))
    }, [page])

    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger">Test Button</button>
        </div>
        <Filtros />
        <Paginacion page={page} setPage={setPage} nextPageEnabled={!charactersPageData.loading && charactersPageData.charactersData.info.next} previousPageEnabled={!charactersPageData.loading && charactersPageData.charactersData.info.prev} />
        <GrillaPersonajes charactersPageData={charactersPageData}/>
        <Paginacion page={page} setPage={setPage} nextPageEnabled={!charactersPageData.loading && charactersPageData.charactersData.info.next} previousPageEnabled={!charactersPageData.loading && charactersPageData.charactersData.info.prev} />
    </div>
}

export default PaginaInicio