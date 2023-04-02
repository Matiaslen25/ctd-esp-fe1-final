import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = ({ setPageUrl, nextPageUrl, previousPageUrl }) => {
    return <div className="paginacion">
        <button style={{ cursor: !previousPageUrl && 'not-allowed' }} disabled={!previousPageUrl} className={"primary"} onClick={() => setPageUrl(previousPageUrl)}>Anterior</button>
        <button style={{ cursor: !nextPageUrl && 'not-allowed' }} disabled={!nextPageUrl} className={"primary"} onClick={() => setPageUrl(nextPageUrl)}>Siguiente</button>
    </div>
}

export default Paginacion;