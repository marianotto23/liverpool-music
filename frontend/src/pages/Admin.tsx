import { useEffect, useState } from "react";

import { getProducts } from "../services/api";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/formatPrice";

type StockFilter = "all" | "available" | "low-stock" | "out-of-stock";

function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const totalProducts = products.length;

  const outOfStockProducts = products.filter((product) => product.stock === 0);

  const totalStock = products.reduce((acc, product) => {
    return acc + product.stock;
  }, 0);

  const inventoryValue = products.reduce((acc, product) => {
    return acc + product.price * product.stock;
  }, 0);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStockFilter =
      stockFilter === "all" ||
      (stockFilter === "available" && product.stock > 2) ||
      (stockFilter === "low-stock" && product.stock > 0 && product.stock <= 2) ||
      (stockFilter === "out-of-stock" && product.stock === 0);

    return matchesSearch && matchesStockFilter;
  });

  function getStockStatus(productStock: number) {
    if (productStock === 0) {
      return <span className="admin-status danger">Sin stock</span>;
    }

    if (productStock <= 2) {
      return <span className="admin-status warning">Stock bajo</span>;
    }

    return <span className="admin-status success">Disponible</span>;
  }

  if (isLoading) {
    return (
      <section className="admin-page">
        <h1>Panel admin</h1>
        <p>Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-page">
        <h1>Panel admin</h1>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-header">
        <span>Panel admin</span>
        <h1>Gestión de productos</h1>
        <p>
          Vista administrativa simulada para revisar productos, stock y valor
          total del inventario.
        </p>
      </div>

      <div className="admin-stats-grid">
        <article>
          <span>Total productos</span>
          <strong>{totalProducts}</strong>
        </article>

        <article>
          <span>Sin stock</span>
          <strong>{outOfStockProducts.length}</strong>
        </article>

        <article>
          <span>Unidades en stock</span>
          <strong>{totalStock}</strong>
        </article>

        <article>
          <span>Valor inventario</span>
          <strong>{formatPrice(inventoryValue)}</strong>
        </article>
      </div>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Buscar producto o categoría..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={stockFilter}
          onChange={(event) => setStockFilter(event.target.value as StockFilter)}
        >
          <option value="all">Todos los estados</option>
          <option value="available">Disponible</option>
          <option value="low-stock">Stock bajo</option>
          <option value="out-of-stock">Sin stock</option>
        </select>
      </div>

      <p className="products-count">
        Mostrando {filteredProducts.length} producto
        {filteredProducts.length !== 1 ? "s" : ""}
      </p>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td>{getStockStatus(product.stock)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="admin-empty-results">
            No se encontraron productos con esos filtros.
          </p>
        )}
      </div>
    </section>
  );
}

export default Admin;