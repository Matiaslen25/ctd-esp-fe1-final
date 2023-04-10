import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import './paginacion.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPageUrl } from '../../redux/charactersSlice';

interface PropsPaginacionComponente {
    nextPageUrl: string | undefined
    previousPageUrl: string | undefined
}

/**
 * Componente que contiene los botones para paginar
 * @param {string | undefined} nextPageUrl en caso de que haya, url para obtener la información de la próxima página 
 * @param {string | undefined} previousPageUrl en caso de que haya, url para obtener la información de la página anterior 
 * @use `<Paginacion nextPageUrl={nextPageUrl} previousPageUrl={previousPageUrl} />`
 * @returns `<div> {...} </div>`
 */
const Paginacion = ({ nextPageUrl, previousPageUrl } : PropsPaginacionComponente) => {
    const dispatch = useAppDispatch()

    return <div className="paginacion">
        <button style={{ cursor: !previousPageUrl ? 'not-allowed' : 'pointer' }} disabled={!previousPageUrl} className={"primary"} onClick={() => dispatch(setPageUrl(previousPageUrl || ''))}>Anterior</button>
        <button style={{ cursor: !nextPageUrl ? 'not-allowed' : 'pointer' }} disabled={!nextPageUrl} className={"primary"} onClick={() => dispatch(setPageUrl(nextPageUrl || ''))}>Siguiente</button>
    </div>
}

export default Paginacion;