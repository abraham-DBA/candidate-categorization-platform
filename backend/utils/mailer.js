import nodemailer from 'nodemailer';

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: (process.env.SMTP_SECURE === 'true'), // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration (optional, logs a warning on failure)
transporter.verify().then(() => {
  console.log('Mailer: SMTP transporter verified');
}).catch((err) => {
  console.warn('Mailer: SMTP transporter verification failed', err && err.message ? err.message : err);
});

export const sendRegistrationEmail = async (candidate) => {
  if (!candidate || !candidate.email) {
    throw new Error('Invalid candidate data for email');
  }

  const subject = 'Welcome to Candidate Categorization Platform';
  const html = `
    <p>Hi ${candidate.name || 'Candidate'},</p>
    <p>Thank you for registering with Candidate Categorization Platform.</p>
    <p>Your assigned tier is <strong>Tier ${candidate.tier}</strong>.</p>
    <p>If you have any questions, reply to this email.</p>
    <br/>
    <p>Best regards,<br/>Candidate Categorization Team</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
    to: candidate.email,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export default transporter;