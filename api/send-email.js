import nodemailer from 'nodemailer';

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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS.replace(/\s+/g, ''),
      },
    });

    const mailOptions = {
      from: '"Outpera Team" <' + process.env.GMAIL_USER + '>',
      replyTo: process.env.GMAIL_USER,
      to: email,
      subject: `Audit Confirmed - Welcome to Outpera, ${name}`,
      text: `Hi ${name},\n\nYour audit is booked.\n\nThank you for booking an audit for ${business}. Our team has received your request and will reach out to you within 24 hours.\n\nWhat happens next:\n- We review your current workflows\n- Identify immediate quick wins\n- Map out the best system for your business\n- Give you a custom estimate\n\nAny questions? Reach us directly:\nTharun Naik: +91 6362852526\nDaksh Hadvani: +91 9664696850\n\nOutpera AI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
          <h2 style="color: #000000;">Hi ${name}, your audit is booked.</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for booking an audit for <strong>${business}</strong>. 
            Our team has received your request and will reach out to you within 24 hours.
          </p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin-top: 0; font-weight: bold;">What happens next:</p>
            <ul style="margin-bottom: 0;">
              <li>We review your current workflows</li>
              <li>Identify immediate quick wins</li>
              <li>Map out the best system for your business</li>
              <li>Give you a custom estimate</li>
            </ul>
          </div>
          
          <p style="font-size: 14px; color: #666666; margin-bottom: 5px;">Any questions? Reach us directly:</p>
          <p style="margin: 0; font-size: 14px;"><strong>Tharun Naik:</strong> +91 6362852526</p>
          <p style="margin: 5px 0 0; font-size: 14px;"><strong>Daksh Hadvani:</strong> +91 96646 96850</p>
          
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0 20px;" />
          <p style="font-size: 12px; color: #999999; text-align: center;">
            &copy; 2025 Outpera AI
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Nodemailer] Email sent: ', info.messageId);

    return res.status(200).json({ success: true, id: info.messageId });
  } catch (err) {
    console.error('[Nodemailer] Unexpected error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
