import { Router } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const items = await User.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ resource: 'users', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default usersRouter;
