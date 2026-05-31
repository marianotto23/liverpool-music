import type { BuyerData } from "../types/Order";

type CheckoutFormProps = {
  formData: BuyerData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
};

function CheckoutForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
}: CheckoutFormProps) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <h2>Datos del comprador</h2>

      <label>
        Nombre completo
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Teléfono
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Dirección
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando orden..." : "Confirmar compra"}
      </button>
    </form>
  );
}

export default CheckoutForm;