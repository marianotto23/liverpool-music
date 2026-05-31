import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { getProductById } from "../services/api";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/formatPrice";

function ProductDetail() {
  const { id } = useParams();
  const { cartItems, addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const cartItem = cartItems.find((item) => item.id === product?.id);

  const isMaxStockReached = cartItem
    ? cartItem.quantity >= cartItem.stock
    : false;

  const isOutOfStock = product ? product.stock === 0 : false;

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setError("Producto no encontrado.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Producto no encontrado.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function handleAddToCart() {
    if (!product) {
      return;
    }

    if (isOutOfStock) {
      setSuccessMessage("Producto sin stock");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return;
    }

    if (isMaxStockReached) {
      setSuccessMessage("Stock máximo alcanzado");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return;
    }

    addToCart(product);
    setSuccessMessage("Producto agregado al carrito");

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  }

  if (isLoading) {
    return (
      <section>
        <p>Cargando producto...</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <p>El producto que estás buscando no existe.</p>
        <Link to="/productos">Volver a productos</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/productos">← Volver a productos</Link>

      <article className="product-detail">
        <img src={product.image} alt={product.name} />

        <div className="product-detail-info">
          <span>{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <strong>{formatPrice(product.price)}</strong>

          {isOutOfStock ? (
            <p className="out-of-stock-message">Sin stock disponible</p>
          ) : (
            <p>Stock disponible: {product.stock} unidades</p>
          )}

          <button
            disabled={isOutOfStock || isMaxStockReached}
            onClick={handleAddToCart}
          >
            {isOutOfStock
              ? "Sin stock"
              : isMaxStockReached
              ? "Stock máximo alcanzado"
              : "Agregar al carrito"}
          </button>

          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </article>
    </section>
  );
}

export default ProductDetail;