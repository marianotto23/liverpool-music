import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

function Cart() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

    const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
    }, 0);

    if (cartItems.length === 0) {
    return (
        <section>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        </section>
    );
    }

    return (
    <section>
        <h1>Carrito</h1>

        <div className="cart-list">
        {cartItems.map((item) => (
        <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
            <h2>{item.name}</h2>

            <p>Precio unitario: {formatPrice(item.price)}</p>

        <div className="cart-actions">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button
            disabled={item.quantity >= item.stock}
            onClick={() => addToCart(item)}
            >
            +
            </button>
        </div>

        {item.quantity >= item.stock && (
            <p className="stock-limit-message">Stock máximo alcanzado</p>
        )}

            <strong>
                Subtotal: {formatPrice(item.price * item.quantity)}
            </strong>

            <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
            >
                Eliminar
            </button>
            </div>
        </article>
        ))}
    </div>

    <div className="cart-total">
        <h2>Total</h2>
        <strong>{formatPrice(total)}</strong>
    </div>

    <div className="cart-footer-actions">
        <Link className="checkout-link" to="/checkout">
            Finalizar compra
        </Link>

        <button className="clear-cart-button" onClick={clearCart}>
            Vaciar carrito
        </button>
        </div>
    </section>
    );
}

export default Cart;