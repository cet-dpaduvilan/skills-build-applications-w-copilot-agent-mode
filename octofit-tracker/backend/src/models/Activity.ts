import mongoose, { InferSchemaType } from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      enum: ['run', 'ride', 'swim', 'strength', 'hiit', 'walk', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity;
