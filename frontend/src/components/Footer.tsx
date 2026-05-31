import { Link } from "react-router-dom";

function Footer() {
return (
    <footer className="footer">
    <div className="footer-content">
        <div>
        <h2>Liverpool Music</h2>
        <p>
            Ecommerce ficticio de instrumentos musicales desarrollado con React,
            TypeScript y Context API.
        </p>
        </div>

        <div className="footer-links">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contacto</Link>
        </div>
    </div>

    <p className="footer-copy">
        © 2026 Liverpool Music. Proyecto frontend para portfolio.
    </p>
    </footer>
);
}

export default Footer;