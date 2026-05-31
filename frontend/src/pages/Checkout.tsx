import { useState } from "react";
import { Link } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";
import type { BuyerData, Order } from "../types/Order";
import { formatPrice } from "../utils/formatPrice";
import { saveLastOrder } from "../utils/orderStorage";

function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState<BuyerData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const newOrder = await createOrder({
        buyer: formData,
        items: cartItems,
        total,
      });

      saveLastOrder(newOrder);
      setCreatedOrder(newOrder);
      clearCart();
    } catch {
      setSubmitError("No se pudo crear la orden. Intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (createdOrder) {
    return (
      <section className="order-success">
        <h1>Compra realizada</h1>

        <div className="order-success-card">
          <p>Gracias por tu compra, {createdOrder.buyer.name}.</p>
          <p>Te enviamos el detalle del pedido a {createdOrder.buyer.email}.</p>
          <p>El stock del inventario fue actualizado correctamente.</p>

          <div className="order-info">
            <span>Número de orden</span>
            <strong>{createdOrder.id}</strong>
          </div>

          <div className="order-info">
            <span>Total abonado</span>
            <strong>{formatPrice(createdOrder.total)}</strong>
          </div>

          <div className="order-success-actions">
            <Link to="/productos">Volver a productos</Link>
            <Link to="/ultima-orden">Ver última orden</Link>
            <Link to="/admin/orders">Ver órdenes admin</Link>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>No hay productos en el carrito.</p>

        <Link to="/productos">Ver productos</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <div>
          <CheckoutForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          {submitError && <p className="error-message">{submitError}</p>}
        </div>

        <CheckoutSummary cartItems={cartItems} total={total} />
      </div>
    </section>
  );
}

export default Checkout;