import './paginacion.css';

interface PropsPaginacionComponente {
    setPageUrl: React.Dispatch<React.SetStateAction<string>>
    nextPageUrl: string | undefined
    previousPageUrl: string | undefined
}

/**
 * Componente que contiene los botones para paginar
 * @param {React.Dispatch<React.SetStateAction<string>>} setPageUrl función que modifica el estado de la url a utilizar para obtener la información de los personajes paginados
 * @param {string | undefined} nextPageUrl en caso de que haya, url para obtener la información de la próxima página 
 * @param {string | undefined} previousPageUrl en caso de que haya, url para obtener la información de la página anterior 
 * @use `<Paginacion setPageUrl={setPageUrl} nextPageUrl={nextPageUrl} previousPageUrl={previousPageUrl} />`
 * @returns `<div> {...} </div>`
 */
const Paginacion = ({ setPageUrl, nextPageUrl, previousPageUrl } : PropsPaginacionComponente) => {
    return <div className="paginacion">
        <button style={{ cursor: !previousPageUrl ? 'not-allowed' : 'pointer' }} disabled={!previousPageUrl} className={"primary"} onClick={() => setPageUrl(previousPageUrl || '')}>Anterior</button>
        <button style={{ cursor: !nextPageUrl ? 'not-allowed' : 'pointer' }} disabled={!nextPageUrl} className={"primary"} onClick={() => setPageUrl(nextPageUrl || '')}>Siguiente</button>
    </div>
}

export default Paginacion;