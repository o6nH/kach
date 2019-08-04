import React from 'react';
import {Link} from 'react-router-dom';

const marketName = 'Generic';
const marketLogo = './img/bottle_64.png';
const cartImg = './img/cart_64.png';

// Fake Store (TODO: substitute fake store for redux store)
const fakeUser = {userId: '123', isAuthenticated: true};
const cartOrder = {orderId:'ord123', productCount: 5};

// Component
const Navbar = () => {
  const {userId, isAuthenticated: isAuth} = fakeUser;
  const {orderId:cartOrderId, productCount:cartProdCount} = cartOrder;
  return (
    // TODO: remove inline styles
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <Link to='/'>
        <div style={{display:'flex'}}>
          <img src={marketLogo} alt="Generic Logo"/>
          <h1>{`${marketName}`}</h1>
        </div>
      </Link>
      <ul style={{display:'flex', width:'30%', justifyContent:'space-between', listStyle:'none'}}>
        <li><Link to='/products'>Products</Link></li>
        {
          isAuth
          ? <li><Link to={`/users/${userId}`}>Manage Account</Link></li>
          : <li><Link to='/signup'>Create Account</Link></li> 
        }
        {
          isAuth
          ? <li onClick={()=>{console.log('Need to sign user out')}}><Link to='/'>Sign Out</Link></li> 
          : <li><Link to='/signin'>Sign In</Link></li>
        }
        <li><Link to={`/orders/${cartOrderId}`}><img src={cartImg}></img>{cartProdCount}</Link></li>
      </ul>
    </div>
  )
}

export default Navbar;