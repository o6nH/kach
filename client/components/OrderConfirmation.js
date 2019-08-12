import React from 'react'
import {Link} from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div>
        <h2>Your order has been placed. </h2>
        <Link to='/orders'>View Your Orders</Link>
    </div>
  )
}
