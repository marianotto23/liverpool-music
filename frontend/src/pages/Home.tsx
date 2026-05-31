import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.slice(0, 3));
      } catch {
        setError("No se pudieron cargar los productos destacados.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span>Instrumentos seleccionados</span>
          <h1>Tu próxima guitarra, teclado o batería empieza acá.</h1>
          <p>
            Liverpool Music es una tienda online de instrumentos musicales con
            productos pensados para músicos principiantes, intermedios y
            profesionales.
          </p>

          <div className="hero-actions">
            <Link to="/productos">Ver productos</Link>
            <a href="#destacados">Productos destacados</a>
          </div>
        </div>

        <div className="hero-card">
          <h2>Compra simple</h2>
          <p>Elegí un producto, agregalo al carrito y simulá tu pedido.</p>

          <ul>
            <li>Catálogo por categorías</li>
            <li>Carrito funcional</li>
            <li>Checkout simulado</li>
          </ul>
        </div>
      </section>

      <section className="categories-section">
        <h2>Categorías</h2>

        <div className="categories-grid">
          <article>
            <h3>Guitarras</h3>
            <p>Eléctricas clásicas para distintos estilos.</p>
          </article>

          <article>
            <h3>Teclados</h3>
            <p>Pianos digitales y teclados compactos.</p>
          </article>

          <article>
            <h3>Baterías</h3>
            <p>Sets acústicos para práctica y escenario.</p>
          </article>
        </div>
      </section>

      <section id="destacados" className="featured-section">
        <h2>Productos destacados</h2>

        {isLoading && <p>Cargando productos destacados...</p>}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;