import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const marketName = 'Generic';
const marketLogo = './img/bottle_64.png';
const cartImg = './img/cart_64.png';

// Component
const Navbar = ({user, cart}) => {
  console.log(user)
  const {id:userId, isAuthenticated: isAuth, isAdmin} = user;
  const {id:cartOrderId, productCount:cartProdCount} = cart;
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
          isAdmin
          ? <li><Link to={`/admin`}>Admin Dashboard</Link></li>
          : ''
        }
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
        <li><Link to={`/cart/${cartOrderId}`}><img src={cartImg}></img>#</Link></li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.orders.filter(order => order.status === 'inCart')
})

export default connect(mapStateToProps)(Navbar);