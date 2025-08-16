

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  cartData: { 
    type: Map,
    of: Number,
    default: {} 
  } ,

  orders: [
  {
    items: [
      {
        productId: String,
        quantity: Number,
      },
    ],
    deliveryInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    paymentMethod: String,
    totalAmount: Number,
    status: String,
    orderDate: Date,
  },
],

});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;