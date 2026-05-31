import type { SortOption } from "../hooks/useProductFilter";
import { categories } from "../hooks/useProductFilter";

type ProductFiltersProps = {
    searchTerm: string;
    selectedCategory: string;
    sortOption: SortOption;
    hasActiveFilters: boolean;
    onSearchChange: (value: string) => void;
    onCategoryChange: (category: string) => void;
    onSortChange: (sortOption: SortOption) => void;
    onClearFilters: () => void;
};

function ProductFilters({
    searchTerm,
    selectedCategory,
    sortOption,
    hasActiveFilters,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onClearFilters,
    }: ProductFiltersProps) {
return (
    <div className="products-controls">
    <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
    />

    <select
        value={sortOption}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
    >
        <option value="default">Ordenar por relevancia</option>
        <option value="price-asc">Menor precio</option>
        <option value="price-desc">Mayor precio</option>
        <option value="name-asc">Nombre A-Z</option>
    </select>

    <div className="filters">
        {categories.map((category) => (
        <button
            key={category}
            className={selectedCategory === category ? "active-filter" : ""}
            onClick={() => onCategoryChange(category)}
        >
            {category}
        </button>
        ))}
    </div>

        {hasActiveFilters && (
        <button className="clear-filters-button" onClick={onClearFilters}>
        Limpiar filtros
        </button>
        )}
    </div>
    );
}

export default ProductFilters;