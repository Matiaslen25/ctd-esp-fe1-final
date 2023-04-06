import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */

interface PropsPaginacionComponente {
    setPageUrl: React.Dispatch<React.SetStateAction<string>>
    nextPageUrl: string | undefined
    previousPageUrl: string | undefined
}

const Paginacion = ({ setPageUrl, nextPageUrl, previousPageUrl } : PropsPaginacionComponente) => {
    return <div className="paginacion">
        <button style={{ cursor: !previousPageUrl ? 'not-allowed' : 'pointer' }} disabled={!previousPageUrl} className={"primary"} onClick={() => setPageUrl(previousPageUrl || '')}>Anterior</button>
        <button style={{ cursor: !nextPageUrl ? 'not-allowed' : 'pointer' }} disabled={!nextPageUrl} className={"primary"} onClick={() => setPageUrl(nextPageUrl || '')}>Siguiente</button>
    </div>
}

export default Paginacion;