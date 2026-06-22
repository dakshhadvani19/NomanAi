import emailjs from '@emailjs/browser';

// ---------------------------------------------------------------------------
// EmailJS Configuration
// These values are set in your .env file (VITE_ prefix exposes them to Vite)
// ---------------------------------------------------------------------------
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends a welcome / confirmation email to the user who just booked an audit.
 *
 * @param {{ name: string, email: string, business: string }} params
 * @returns {Promise<void>}
 */
export async function sendWelcomeEmail({ name, email, business }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('[EmailJS] Missing env vars — skipping welcome email.');
    return;
  }

  const templateParams = {
    to_name:     name,
    to_email:    email,
    business:    business,
    reply_to:    'hello@outpera.com',
    from_name:   'Outpera Team',
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
