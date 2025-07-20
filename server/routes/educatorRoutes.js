import express from 'express';
import { updateRollToEducator } from '../controllers/educatorController.js';
const educatorRouter = express.Router();
educatorRouter.get('/update-role', updateRollToEducator);
export default educatorRouter;