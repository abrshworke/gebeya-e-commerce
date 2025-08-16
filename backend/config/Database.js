import mongoose from 'mongoose';
 
const ConnectDB = async () => { 

    mongoose.connection.on('connected' , () => {
       console.log('MongoDB connected successfully');     
    }) 

mongoose.connect(`${process.env.MONGO_URI}/ethiogebeya` , {
     useNewUrlParser: true,
     useUnifiedTopology: true 
} 

); };

export default ConnectDB;
 



