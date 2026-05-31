import { useState } from "react";
import { Link } from "react-router-dom";

import { clearLastOrder, getLastOrder } from "../utils/orderStorage";
import { formatPrice } from "../utils/formatPrice";
import type { Order } from "../types/Order";

function LastOrder() {
const [lastOrder, setLastOrder] = useState<Order | null>(() =>
    getLastOrder()
    );

function handleClearOrder() {
    clearLastOrder();
    setLastOrder(null);
    }

    if (!lastOrder) {
    return (
    <section>
        <h1>Última orden</h1>
        <p>Todavía no hay ninguna orden guardada.</p>

        <Link to="/productos">Ver productos</Link>
    </section>
    );
    }

    return (
    <section className="last-order-page">
    <h1>Última orden</h1>

    <div className="last-order-card">
        <div className="order-info">
        <span>Número de orden</span>
        <strong>{lastOrder.id}</strong>
        </div>

        <div className="order-info">
        <span>Cliente</span>
        <strong>{lastOrder.buyer.name}</strong>
        </div>

        <div className="order-info">
        <span>Email</span>
        <strong>{lastOrder.buyer.email}</strong>
        </div>

        <div className="order-info">
        <span>Fecha</span>
        <strong>
            {new Date(lastOrder.createdAt).toLocaleDateString("es-AR")}
        </strong>
        </div>

        <div className="last-order-products">
        <h2>Productos</h2>

        {lastOrder.items.map((item) => (
            <article className="last-order-item" key={item.id}>
            <span>
                {item.name} x {item.quantity}
            </span>

              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </article>
        ))}
        </div>

        <div className="order-info">
        <span>Total</span>
        <strong>{formatPrice(lastOrder.total)}</strong>
        </div>

        <div className="last-order-actions">
        <Link to="/productos">Seguir comprando</Link>

        <button onClick={handleClearOrder}>Eliminar última orden</button>
        </div>
    </div>
    </section>
    );
}

export default LastOrder;