import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import Orders from '../../backend/models/Orders';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
    });

    if (res.ok) {
      const response = await res.json();
      console.log("Fetched order data:", response); // Check the data structure
      setOrderData(response);
    } else {
      console.error("Error fetching order data");
    }
  };

  useEffect(() => {
    // fetchMyOrder();
   const data=JSON.parse(localStorage.getItem("orders"));
   console.log("data",data);
   setOrderData(data);
  },[]);

  // Check if orderData and order_data are valid
  // const hasOrders = orderData && Array.isArray(orderData.order_data) && orderData.order_data.length > 0;

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
        
            
                {orderData?.map((item, itemIndex) => (
                 
                    <div className='col-12 col-md-6 col-lg-3' key={itemIndex}>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>Quantity: {item.qty}</span>
                            <span className='m-1'>Size: {item.size}</span>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                 
                  )
                )}
              </div>
            
          
         
       
      </div>
      <Footer />
    </div>
  );
}
