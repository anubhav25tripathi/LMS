import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhook } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import  connectCloudinary  from './configs/cloudinary.js';
const app= express();

// configs
await connectDB();
await connectCloudinary();

//middlewares
app.use(cors());
app.use(clerkMiddleware())
// routes
app.get('/', (req, res) => {
  console.log('API is working');
  res.send('API working')
}
);
app.post('/clerk', express.json(), clerkWebhook);
app.use('/api/educator',express.json(),educatorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
