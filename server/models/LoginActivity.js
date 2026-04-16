import mongoose from 'mongoose';

const loginActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    kind: {
      type: String,
      enum: ['signup', 'signin', 'admin_signin'],
      required: true,
    },
    ip: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

/** One document per login/signup — visible in Compass collection "login_activity" */
export default mongoose.model('LoginActivity', loginActivitySchema, 'login_activity');
