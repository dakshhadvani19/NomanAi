import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name, email' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Outpera Team <onboarding@resend.dev>',
      to: [email],
      subject: `Audit Confirmed — Welcome to Outpera, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif;">
            <div style="max-width:560px;margin:40px auto;background:#0d1526;border-radius:16px;overflow:hidden;border:1px solid rgba(6,182,212,0.2);">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:32px 36px;">
                <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">OUTP<span style="opacity:0.85;">ERA</span> <span style="opacity:0.7;font-size:18px;">AI</span></h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">AI Automations & Voice Agents</p>
              </div>

              <!-- Body -->
              <div style="padding:36px;">
                <h2 style="margin:0 0 12px;color:#fff;font-size:20px;font-weight:700;">Hi ${name}, your audit is booked! 🎉</h2>
                <p style="margin:0 0 20px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;">
                  Thank you for booking a free audit for <strong style="color:#38bdf8;">${business}</strong>. 
                  Our team has received your request and will reach out to you within <strong style="color:#fff;">24 hours</strong>.
                </p>

                <!-- What happens next -->
                <div style="background:rgba(6,182,212,0.07);border:1px solid rgba(6,182,212,0.15);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
                  <p style="margin:0 0 12px;color:#38bdf8;font-weight:700;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;">What happens next</p>
                  <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,0.75);font-size:14px;line-height:2;">
                    <li>We review your current workflows</li>
                    <li>Identify 2–3 immediate quick wins</li>
                    <li>Map out the highest-ROI system for your business</li>
                    <li>Give you a custom estimate — no obligations</li>
                  </ul>
                </div>

                <!-- Contact -->
                <p style="margin:0 0 6px;color:rgba(255,255,255,0.5);font-size:13px;">Any questions? Reach us directly:</p>
                <p style="margin:0;color:rgba(255,255,255,0.75);font-size:14px;">📞 Tharun Naik: <a href="tel:+916362852526" style="color:#38bdf8;text-decoration:none;">+91 6362852526</a></p>
                <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">📞 Daksh Hadvani: <a href="tel:+919664696850" style="color:#38bdf8;text-decoration:none;">+91 96646 96850</a></p>
              </div>

              <!-- Footer -->
              <div style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;">© 2025 Outpera AI · outpera.vercel.app</p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Resend] Error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[Resend] Unexpected error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
