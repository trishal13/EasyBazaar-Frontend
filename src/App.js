import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Signup from './pages/Signup';
import Resetpassword from './pages/Resetpassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='about' element={<About></About>}></Route>
            <Route path='contact' element={<Contact></Contact>}></Route>
            <Route path='product' element={<OurStore></OurStore>}></Route>
            <Route path='product/:id' element={<SingleProduct></SingleProduct>}></Route>
            <Route path='blogs' element={<Blog></Blog>}></Route>
            <Route path='blog/:id' element={<SingleBlog></SingleBlog>}></Route>
            <Route path='cart' element={<PrivateRoutes><Cart></Cart></PrivateRoutes>}></Route>
            <Route path='my-orders' element={<PrivateRoutes><Orders></Orders></PrivateRoutes>}></Route>
            <Route path='my-profile' element={<PrivateRoutes><Profile></Profile></PrivateRoutes>}></Route>
            <Route path='checkout' element={<PrivateRoutes><Checkout></Checkout></PrivateRoutes>}></Route>
            <Route path='compare-product' element={<PrivateRoutes><CompareProduct></CompareProduct></PrivateRoutes>}></Route>
            <Route path='wishlist' element={<PrivateRoutes><Wishlist></Wishlist></PrivateRoutes>}></Route>
            <Route path='login' element={<OpenRoutes><Login></Login></OpenRoutes>}></Route>
            <Route path='forgot-password' element={<Forgotpassword></Forgotpassword>}></Route>
            <Route path='signup' element={<OpenRoutes><Signup></Signup></OpenRoutes>}></Route>
            <Route path='reset-password/:token' element={<Resetpassword></Resetpassword>}></Route>
            <Route path='privacy-policy' element={<PrivacyPolicy></PrivacyPolicy>}></Route>
            <Route path='refund-policy' element={<RefundPolicy></RefundPolicy>}></Route>
            <Route path='shipping-policy' element={<ShippingPolicy></ShippingPolicy>}></Route>
            <Route path='term-conditions' element={<TermsAndConditions></TermsAndConditions>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
