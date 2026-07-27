import mongoose, { InferSchemaType } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
