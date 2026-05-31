import { useState } from "react";
import type { Product } from "../types/Product";

export const categories = ["Todos", "Guitarras", "Teclados", "Baterías"];

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export function useProductFilter(products: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const hasActiveFilters =
    selectedCategory !== "Todos" ||
    searchTerm !== "" ||
    sortOption !== "default";

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      }

      if (sortOption === "price-desc") {
        return b.price - a.price;
      }

      if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  function clearFilters() {
    setSelectedCategory("Todos");
    setSearchTerm("");
    setSortOption("default");
  }

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    hasActiveFilters,
    filteredProducts,
    clearFilters,
  };
}