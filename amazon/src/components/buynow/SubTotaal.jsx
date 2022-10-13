import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const SubTotaal = ({ item }) => {
const [price,setPrice] = useState(0);

useEffect(()=>{
  totalAmount();
},[item])
  const totalAmount = ()=>{
    let price = 0;
      item.map((item)=>{
        price += item.price.cost //price = item.price.cost + price


      });
      setPrice(price)
  }
  return <div className="sub_item">
    <h3>Subtotal ({item.length} item): <strong style={{ fontWeight: "700", color: "#111" }}>{price}</strong></h3>
  </div>
}

export default SubTotaal