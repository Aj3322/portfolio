import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP connection error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Thank you email template
export async function sendThankYouEmail(toEmail, name) {
  try {
    await transporter.sendMail({
      from: `"Ajay Kumar" <${process.env.EMAIL_FROM}>`,
      to: toEmail,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #2563eb;">Hi ${name},</h2>
          <p style="color: #333;">Thank you for contacting me! I've received your message and will get back to you as soon as possible.</p>
          <p style="color: #333;">In the meantime, feel free to explore more of my work on my portfolio.</p>
          <p style="color: #333;">Best regards,</p>
          <p style="color: #333; font-weight: bold;">Ajay Kumar</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
}

// Admin notification template
export async function sendAdminNotification({ name, email, phone, message }) {
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New contact form submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="padding: 10px; background: #f5f5f5; border-radius: 4px; margin-top: 5px;">
              <p style="white-space: pre-line;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #333;">This message has been saved to your database as "unread".</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}