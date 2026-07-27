import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const frontendLocalOrigin = 'http://localhost:5173';
const frontendCodespaceOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : undefined;

const allowedOrigins = [frontendLocalOrigin, frontendCodespaceOrigin].filter(
  (origin): origin is string => Boolean(origin),
);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api', (_req, res) => {
  res.status(200).json({
    message: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
