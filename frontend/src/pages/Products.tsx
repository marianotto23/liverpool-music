import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { useProductFilter } from "../hooks/useProductFilter";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    hasActiveFilters,
    filteredProducts,
    clearFilters,
  } = useProductFilter(products);

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

  if (isLoading) {
    return (
      <section>
        <h1>Productos</h1>
        <p>Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Productos</h1>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Productos</h1>
      <p>Listado de instrumentos disponibles.</p>

      <ProductFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortOption={sortOption}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOption}
        onClearFilters={clearFilters}
      />

      <p className="products-count">
        Mostrando {filteredProducts.length} producto
        {filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {filteredProducts.length === 0 ? (
        <p className="empty-results">No se encontraron productos.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;