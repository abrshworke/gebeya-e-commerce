import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './config/Database.js';
import cloudinaryConfig from './config/cloudinary.js';
import UserRoute from './routes/Userroute.js';
import ProductRouter from './routes/ProductRouter.js';
import cartroute from './routes/Cartroute.js';
import OrderRoute from './routes/OrderRoute.js';
import Feedbackrouter from './routes/feedbackRoute.js';


dotenv.config();  
    
ConnectDB(); 
cloudinaryConfig();
 
const app = express();
const Port = process.env.PORT || 5000;

// middleware

app.use(express.json());
app.use(cors());


//endpoints 

app.use('/api/user' , UserRoute)
app.use('/api/product' , ProductRouter)
app.use('/api/user/cart' , cartroute)
app.use('/api/user/order' , OrderRoute)
app.use('/api/feedback' , Feedbackrouter)


app.get('' , (req, res) => {
  res.send('welcome to first endpoint');
})

app.listen(Port , () => console.log(`Server is running on port ${Port}`));

export default app;

