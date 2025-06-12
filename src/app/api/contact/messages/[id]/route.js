import { connectDB } from "../../../../../../lib/db.js";
import ContactMessage from '../../../../../../lib/models/ContactMessage.js';

export async function PATCH(request, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const { status } = await request.json();
    
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return Response.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    const unreadCount = await ContactMessage.countDocuments({ status: 'unread' });

    return Response.json({
      success: true,
      message: updatedMessage,
      unreadCount
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}