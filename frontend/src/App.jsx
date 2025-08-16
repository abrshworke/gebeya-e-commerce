import React from 'react'
import {  Route , Routes } from 'react-router-dom'
import Home from './pages/home'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Place_Order from './pages/Place_Order'
import Order from './pages/Order'
import Contact from './pages/contact'
import About from './pages/about'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navigation from './components/Navigation'
import Footer from './components/footer'
import ProductCard from './pages/ProductCard'
import { ToastContainer } from 'react-toastify';



const App = () => {
  
  return (

    <div>
      
      <Navigation/>
      <ToastContainer autoClose={1000} />
       
      <Routes>
        
       <Route path='/' element = {<Home/>}/>
       <Route path='/cart' element = {<Cart/>}/>
       <Route path='/shop' element = {<Shop/>}/>
       <Route path='/product/:id' element = {<Product/>}/>
       <Route path='/place-order' element = {<Place_Order/>}/>
       <Route path='/orders' element = {<Order/>}/>
       <Route path='/contact' element = {<Contact/>}/>
       <Route path='/about' element = {<About/>}/>
       <Route path='/signin' element = {<SignIn/>}/>
       <Route path='/signup' element = {<SignUp/>}/>
       <Route path='/productcard' element = {<ProductCard/>}/>

      </Routes>
      <Footer/>
      

    </div>

  )
}

export default App
