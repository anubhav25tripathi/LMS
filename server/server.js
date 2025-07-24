import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhook, stripeWebhook } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import  connectCloudinary  from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';
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
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhook);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
