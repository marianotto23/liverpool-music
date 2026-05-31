import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../services/api";
import type { Order } from "../types/Order";
import { formatPrice } from "../utils/formatPrice";

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch {
        setError("No se pudieron cargar las órdenes.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (isLoading) {
    return (
      <section className="admin-page">
        <h1>Órdenes</h1>
        <p>Cargando órdenes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-page">
        <h1>Órdenes</h1>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-header">
        <span>Panel admin</span>
        <h1>Órdenes recibidas</h1>
        <p>
          Listado de órdenes creadas desde el checkout y almacenadas en memoria
          en el backend.
        </p>
      </div>

      <p className="products-count">
        Mostrando {orders.length} orden{orders.length !== 1 ? "es" : ""}
      </p>

      {orders.length === 0 ? (
        <p className="empty-results">Todavía no hay órdenes registradas.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-admin-card" key={order.id}>
              <div className="order-info">
                <span>Número de orden</span>
                <strong>{order.id}</strong>
              </div>

              <div className="order-info">
                <span>Cliente</span>
                <strong>{order.buyer.name}</strong>
              </div>

              <div className="order-info">
                <span>Email</span>
                <strong>{order.buyer.email}</strong>
              </div>

              <div className="order-info">
                <span>Fecha</span>
                <strong>
                  {new Date(order.createdAt).toLocaleDateString("es-AR")}
                </strong>
              </div>

              <div className="order-info">
                <span>Total</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>

              <Link className="admin-detail-link" to={`/admin/orders/${order.id}`}>
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;