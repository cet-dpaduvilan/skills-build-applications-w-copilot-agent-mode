import mongoose, { InferSchemaType } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    equipment: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    recommendedFor: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;
