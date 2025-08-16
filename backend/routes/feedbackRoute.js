
import { Router } from 'express';
import { getAllFeedback, createFeedback   } from '../controller/feedbackController.js';
import adminAuth from '../middleware/adminAuth.js';

const Feedbackrouter = Router();

Feedbackrouter.post('/add', createFeedback);
Feedbackrouter.get('/get', getAllFeedback);

export default Feedbackrouter;
