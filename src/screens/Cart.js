import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // Corrected import
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const cartData = useCart();
  const dispatch = useDispatchCart();
  const navigate =useNavigate();

  // if (cartData.length === 0) {
  //   return (
  //     <div>
  //       <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
  //     </div>
  //   );
  // }
  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    // const response = await fetch("http://localhost:5000/api/auth/orderData", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     order_data: cartData,
    //     email: userEmail,
    //     order_date: new Date().toDateString(),
    //   }),
    // });
    // console.log(response.ok);
  
    // if (response.status === 200) {
    //   // If checkout is successful, clear the cart by dispatching DROP action
    //   console.log(response);
    //   dispatch({ type: "DROP" });
    // }
    console.log("cartData",cartData);
    localStorage.setItem("orders",JSON.stringify(cartData));
    navigate('/myorder');
    

  };
  const totalPrice = cartData.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{backgroundColor:'white'}}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon onClick={() => dispatch({ type: "REMOVE", index })} /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
