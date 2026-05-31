import { useState } from "react";

function Contact() {
const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
});

const [messageSent, setMessageSent] = useState(false);

function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
    ...currentData,
    [name]: value,
    }));
    }

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessageSent(true);

    setFormData({
    name: "",
    email: "",
    message: "",
    });
    }

    return (
    <section className="contact-page">
    <div className="contact-header">
        <span>Contacto</span>
        <h1>¿Tenés alguna consulta?</h1>
        <p>
        Completá el formulario y nuestro equipo se pondrá en contacto para
        ayudarte con productos, disponibilidad o pedidos.
        </p>
    </div>

    <form className="contact-form" onSubmit={handleSubmit}>
        <label>
        Nombre
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
        />
        </label>

        <label>
        Email
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        </label>

        <label>
        Mensaje
        <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
        />
        </label>

        <button type="submit">Enviar mensaje</button>

        {messageSent && (
        <p className="success-message">
            Mensaje enviado correctamente. Te responderemos a la brevedad.
        </p>
        )}
    </form>
    </section>
);
}

export default Contact;