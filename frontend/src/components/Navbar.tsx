import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header>
      <nav className="navbar">
        <Link className="navbar-logo" to="/" onClick={closeMenu}>
          Liverpool Music
        </Link>

        <button
          className="navbar-menu-button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <div className={`navbar-links ${isMenuOpen ? "navbar-links-open" : ""}`}>
          <NavLink
            to="/productos"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Productos
          </NavLink>

          <NavLink
            to="/nosotros"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/contacto"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Contacto
          </NavLink>

          <NavLink
            to="/ultima-orden"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Última orden
          </NavLink>

          <NavLink
            to="/admin"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Admin
          </NavLink>

          <NavLink
            to="/admin/orders"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Órdenes
          </NavLink>

          <NavLink
            to="/carrito"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Carrito ({totalItems})
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;