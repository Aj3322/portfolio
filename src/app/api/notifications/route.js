import { connectDB } from '../../../../lib/db.js';
import Notification from '../../../../lib/models/Notification.js';

export async function GET() {
  await connectDB();

  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
    const unreadCount = await Notification.countDocuments({ read: false });

    return Response.json({
      success: true,
      notifications,
      unreadCount
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}