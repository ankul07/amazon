import React,{useState,useEffect} from 'react';
import "./App.css";
import Navbar from './components/Header/Navbar';
import NewNavbar from './components/newNavbar/NewNavbar';
import Maincomp from './components/Home/Maincomp';
import Footer from './components/footer/Footer';
import Signin from './components/signup_signin/Signin';
import Signup from './components/signup_signin/Signup';
import { Routes,Route } from "react-router-dom";
import Cart from './components/cart/Cart';
import BuyNow from './components/buynow/BuyNow';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])

  return (
  <>
  {
    data ? (
      <>
      <Navbar />
    <NewNavbar />
    <Routes>
      <Route path='/' element={<Maincomp/>} />
      <Route path='/login' element={<Signin/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/getproductsone/:id' element={<Cart />} />
      <Route path='/buynow' element={<BuyNow />} />
    </Routes>
    <Footer />
      </>
    ): (
      <div className="circle">
        <CircularProgress />
        <h2> Loading....</h2>
      </div>
    )
    
  }
    
  </>
  )
}

export default App