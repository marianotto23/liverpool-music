import type { CartItem } from "../types/CartItem";
import { formatPrice } from "../utils/formatPrice";

type CheckoutSummaryProps = {
cartItems: CartItem[];
total: number;
};

function CheckoutSummary({ cartItems, total }: CheckoutSummaryProps) {
    return (
    <aside className="checkout-summary">
    <h2>Resumen</h2>

    {cartItems.map((item) => (
        <div className="checkout-summary-item" key={item.id}>
        <span>
            {item.name} x {item.quantity}
        </span>

          <strong>{formatPrice(item.price * item.quantity)}</strong>
        </div>
        ))}

    <div className="checkout-summary-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
    </div>
    </aside>
    );
}

export default CheckoutSummary;