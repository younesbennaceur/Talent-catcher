import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { isCodeValid } from './codeValide.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { code } = req.body;

  if (isCodeValid(code)) {
    return res.json({ success: true, message: 'Code valide' });
  } else {
    return res.status(401).json({ success: false, message: 'Code invalide' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
