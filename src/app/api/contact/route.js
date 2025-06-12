import { connectDB } from "../../../../lib/db.js";
import ContactMessage from '../../../../lib/models/ContactMessage.js';
import { sendThankYouEmail, sendAdminNotification } from '../../../../lib/mailer.js';

export async function POST(request) {
  await connectDB();

  try {
    const { name, email, phone, message } = await request.json();

    // Save to database
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || null,
      message,
      status: 'unread',
    });

    // Send thank you email to user
    await sendThankYouEmail(email, name);

    // Send notification to admin
    await sendAdminNotification({
      name,
      email,
      phone,
      message
    });

    return Response.json({ 
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { success: false, message: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}