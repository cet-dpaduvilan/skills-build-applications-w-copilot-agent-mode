import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    weeklyGoalMinutes: { type: Number, required: true, min: 30 },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
