import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhook } from './controllers/webhooks.js';
const app= express();
await connectDB();

//middlewares
app.use(cors());

// routes
app.get('/', (req, res) => {
  console.log('API is working');
  res.send('API working')
}
);
app.post('/clerk', express.json(), clerkWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
