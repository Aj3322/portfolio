import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    type: {
      type: String,
      enum: ['system', 'project', 'message', 'alert'],
      default: 'system'
    },
    read: {
      type: Boolean,
      default: false
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better performance
notificationSchema.index({ recipient: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

// Static methods
notificationSchema.statics.markAsRead = async function(id) {
  return this.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );
};

notificationSchema.statics.getUnreadCount = async function(userId) {
  return this.countDocuments({ 
    recipient: userId,
    read: false 
  });
};

// Virtual for formatted date
notificationSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleString();
});

// Pre-save hook to ensure clean data
notificationSchema.pre('save', function(next) {
  this.title = this.title.trim();
  this.message = this.message.trim();
  next();
});

export default mongoose.models?.Notification || 
       mongoose.model('Notification', notificationSchema);