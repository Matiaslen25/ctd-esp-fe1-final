import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = ({ page, setPage, nextPageEnabled, previousPageEnabled }) => {
    return <div className="paginacion">
        <button style={{ cursor: !previousPageEnabled && 'not-allowed' }} disabled={!previousPageEnabled} className={"primary"} onClick={() => setPage(page - 1)}>Anterior</button>
        <button style={{ cursor: !previousPageEnabled && 'not-allowed' }} disabled={!nextPageEnabled} className={"primary"} onClick={() => setPage(page + 1)}>Siguiente</button>
    </div>
}

export default Paginacion;