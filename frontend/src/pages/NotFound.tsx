import { Link } from "react-router-dom";

function NotFound() {
    return (
    <section className="not-found">
    <h1>404</h1>
    <h2>Página no encontrada</h2>
    <p>La ruta que estás intentando visitar no existe.</p>

    <Link to="/">Volver al inicio</Link>
    </section>
    );
}

export default NotFound;