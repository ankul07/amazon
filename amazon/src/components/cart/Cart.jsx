import { Divider } from '@mui/material';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Logincontext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import './cart.css';

const Cart = () => {
    

    const {id} = useParams("");
    const history = useNavigate("");
    const {account,setAccount} = useContext(Logincontext)

    const[indata,setindata] = useState("")
    console.log(indata);

    const getIndividualdata = async()=>{
        const res = await fetch(`/getproductsone/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        console.log(data);

        if(res.status !==201){
            console.log("no data available")
        }
        else{
           setindata(data);
        }

    }

    useEffect(()=>{
        setTimeout(getIndividualdata,1000);
        
    },[id])
    //ye use effect data load hone ke baad show krega mtlb hume pehle indata && object key use krna pdega varna error dikhayga kuki pehle data load ho jayega to indata.price.cost ise pehchan nahi payega quki vo useffect ke id me hai or fir jab useeffect load hoga isly pehle object use krna pdega


    //addcart functions 

    const addtocart = async (id)=>{
        const checkres = await fetch(`/addcart/${id}`,{
            method:"POST",
            headers:{
                Accept:"applicaton/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                indata
            }),
            credentials: "include"
        })

        const data1 = await checkres.json();
        console.log(data1);

        if(checkres.status === 401 || !data1){
            console.log("user invalid")
            alert("user invalid")
        }
        else{
            // alert("data add in your cart");
            history("/buynow")
            setAccount(data1)
        }
    }

  return <div className="cart_section">
    {indata && Object.keys(indata).length && 
    // agar humari indata key ke andar koi value hogi to hi hum ye show krayge varna nahi kraynge 
        <div className="cart_container">
            <div className="left_cart">
                <img src={indata.detailUrl} alt="cartimage" />
                <div className="cart_btn">
                    <button className='cart_btn1' onClick={()=>addtocart(indata.id)}>Add to Cart</button>
                    <button className='cart_btn2' onClick={()=>addtocart(indata.id)}>Buy Now</button>
                </div>
            </div>
            <div className="right_cart">
                <h1>{indata.title.shortTitle}</h1>
                <h4>{indata.title.longTitle}</h4>
                <Divider/>
                <p className='mrp'> M.R.P. : {indata.price.mrp}</p>
                <p>Deal of the Day: <span style={{color:"#B12704"}}>{indata.price.cost}</span></p>
                <p>You save : : <span style={{color:"#B12704"}}>{indata.price.mrp - indata.price.cost} ({indata.price.discount})</span></p>

                <div className="discount_box">
                    <h5>Discount : <span style={{color:'#111'}}> {indata.discount}</span></h5>
                    <h4>Free Delivery <span style={{color:'#111',fontWeight:600}}>Oct 8 -21 </span>Details</h4>
                    <p>Fatest delivery : <span style={{color:'#111',fontWeight:600}}>Tommorrow 11am</span></p>
                </div>
                <p className='description'>About the Item : <span style={{color:"#565959",fontSize:14,fontWeight:600,letterSpacing:"0.4px"}}>
                   {indata.description}</span></p>
            </div>
        </div>
        }
        {!indata ?  <div className="circle">
        <CircularProgress />
        <h2> Loading....</h2>
      </div>:""
        }
    </div>
  
}

export default Cart