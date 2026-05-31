import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getOrderById } from "../services/api";
import type { Order } from "../types/Order";
import { formatPrice } from "../utils/formatPrice";

function AdminOrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      if (!id) {
        setError("Orden no encontrada.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch {
        setError("Orden no encontrada.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (isLoading) {
    return (
      <section className="admin-page">
        <h1>Detalle de orden</h1>
        <p>Cargando orden...</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="admin-page">
        <h1>Orden no encontrada</h1>
        <p>No existe una orden con ese ID.</p>

        <Link to="/admin/orders">Volver a órdenes</Link>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <Link to="/admin/orders">← Volver a órdenes</Link>

      <div className="admin-header">
        <span>Detalle de orden</span>
        <h1>{order.id}</h1>
        <p>Información completa de la orden seleccionada.</p>
      </div>

      <div className="order-admin-card">
        <div className="order-info">
          <span>Cliente</span>
          <strong>{order.buyer.name}</strong>
        </div>

        <div className="order-info">
          <span>Email</span>
          <strong>{order.buyer.email}</strong>
        </div>

        <div className="order-info">
          <span>Teléfono</span>
          <strong>{order.buyer.phone}</strong>
        </div>

        <div className="order-info">
          <span>Dirección</span>
          <strong>{order.buyer.address}</strong>
        </div>

        <div className="order-info">
          <span>Fecha</span>
          <strong>
            {new Date(order.createdAt).toLocaleString("es-AR")}
          </strong>
        </div>

        <div className="last-order-products">
          <h2>Productos</h2>

          {order.items.map((item) => (
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
          <strong>{formatPrice(order.total)}</strong>
        </div>
      </div>
    </section>
  );
}

export default AdminOrderDetail;