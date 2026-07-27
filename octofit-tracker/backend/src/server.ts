import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

const frontendLocalOrigin = 'http://localhost:5173';
const codespaceName = process.env.CODESPACE_NAME;
const frontendCodespaceOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : undefined;

const allowedOrigins = [frontendLocalOrigin, frontendCodespaceOrigin].filter(
  (origin): origin is string => Boolean(origin),
);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
