function About() {
    return (
    <section className="about-page">
    <div className="about-header">
        <span>Sobre Liverpool Music</span>
        <h1>Una tienda pensada para músicos.</h1>
        <p>
        Liverpool Music es un ecommerce ficticio de instrumentos musicales
        desarrollado como proyecto frontend con React, TypeScript y manejo de
        estado global.
        </p>
    </div>

    <div className="about-grid">
        <article>
        <h2>Catálogo</h2>
        <p>
            Productos organizados por categorías, con buscador, filtros,
            ordenamiento y detalle individual.
        </p>
        </article>

        <article>
        <h2>Carrito</h2>
        <p>
            Carrito persistente con control de stock, suma y resta de unidades,
            eliminación de productos y cálculo de totales.
        </p>
        </article>

        <article>
        <h2>Checkout</h2>
        <p>
            Flujo de compra simulado con formulario de comprador, resumen de
            pedido y confirmación final.
        </p>
        </article>
    </div>
    </section>
    );
}

export default About;