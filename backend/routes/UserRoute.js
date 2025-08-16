
import Router from 'express';
import { UserRegister , UserLogin  , AdminLogin, getMe } from '../controller/UserController.js';


const UserRoute = Router(); 

UserRoute.post('/register' , UserRegister); 
UserRoute.post('/login' , UserLogin);
UserRoute.post('/admin' , AdminLogin);
UserRoute.get('/me' , getMe)
   

export default UserRoute;
 
 