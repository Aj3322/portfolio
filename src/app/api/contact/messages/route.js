import { connectDB } from "../../../../../lib/db.js";
import ContactMessage from '../../../../../lib/models/ContactMessage';

export async function GET() {
  await connectDB();

  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
    const unreadCount = await ContactMessage.countDocuments({ status: 'unread' });

    return Response.json({
      success: true,
      messages,
      unreadCount
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}