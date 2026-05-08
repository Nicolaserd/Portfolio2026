import { useFormik } from 'formik';
import './ContactForm.css';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof ContactFormValues, string>> = {};

      if (!values.name.trim()) {
        errors.name = 'User_Identity es obligatorio.';
      }

      if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Transmission_Node debe ser un correo valido.';
      }

      if (!values.message.trim()) {
        errors.message = 'Payload_Data es obligatorio.';
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      console.log('INIT_CONEXION', values);
      resetForm();
    },
  });

  return (
    <section className="contact-section">
      <div className="contact-card">
        <div className="contact-scanlines" />
        <h2 className="contact-title">
          <span className="material-symbols-outlined">terminal</span>
          INIT_CONEXION
        </h2>
        <form className="contact-form" onSubmit={formik.handleSubmit} noValidate>
          <div className="contact-field">
            <label className="contact-label" htmlFor="name">User_Identity</label>
            <input
              className={`contact-input${formik.touched.name && formik.errors.name ? ' contact-input--error' : ''}`}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your designation"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.name && formik.errors.name)}
              aria-describedby={formik.touched.name && formik.errors.name ? 'name-error' : undefined}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="contact-error" id="name-error">{formik.errors.name}</span>
            )}
          </div>
          <div className="contact-field">
            <label className="contact-label" htmlFor="email">Transmission_Node</label>
            <input
              className={`contact-input${formik.touched.email && formik.errors.email ? ' contact-input--error' : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="email@server.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
              aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="contact-error" id="email-error">{formik.errors.email}</span>
            )}
          </div>
          <div className="contact-field">
            <label className="contact-label" htmlFor="message">Payload_Data</label>
            <textarea
              className={`contact-input contact-textarea${formik.touched.message && formik.errors.message ? ' contact-input--error' : ''}`}
              id="message"
              name="message"
              rows={4}
              placeholder="Input parameters here..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.message && formik.errors.message)}
              aria-describedby={formik.touched.message && formik.errors.message ? 'message-error' : undefined}
            />
            {formik.touched.message && formik.errors.message && (
              <span className="contact-error" id="message-error">{formik.errors.message}</span>
            )}
          </div>
          <button className="contact-submit" type="submit">
            <span>EXECUTE</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </section>
  );
}
