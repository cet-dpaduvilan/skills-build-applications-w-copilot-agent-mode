import { Router } from 'express';
import Workout from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const items = await Workout.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ resource: 'workouts', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
