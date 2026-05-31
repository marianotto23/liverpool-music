import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/formatPrice";

type ProductCardProps = {
product: Product;
};

function ProductCard({ product }: ProductCardProps) {
const isLowStock = product.stock > 0 && product.stock <= 2;
const isOutOfStock = product.stock === 0;

return (
    <article className="product-card">
    <img src={product.image} alt={product.name} />

    <div className="product-card-content">
        <div className="product-card-header">
        <span>{product.category}</span>

        {isOutOfStock && <small className="stock-badge out">Sin stock</small>}

        {isLowStock && (
            <small className="stock-badge low">Pocas unidades</small>
        )}
        </div>

        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <strong>{formatPrice(product.price)}</strong>

        <Link to={`/productos/${product.id}`}>Ver detalle</Link>
    </div>
    </article>
    );
}

export default ProductCard;