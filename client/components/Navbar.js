import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';
import {getCurrentUser} from '../actions';

const marketName = 'ShopWare';

const signOut = async (getUser) => {
  await Axios.get('/api/users/signout')
  getUser();
}

// Component
const Navbar = ({user, cart, getUser}) => {
  const {id:userId, isAuthenticated: isAuth, isAdmin} = user;
  const {productCount:cartProdCount} = cart;
  return (
    // TODO: remove inline styles
    <div>
      <Link to='/' className="nav">
        <div style={{display:'flex'}}>
          <h1 style={{fontSize: '32px'}}>{`💻${marketName}`}</h1>
        </div>
      </Link>
      <ul className="nav justify-content-end nav-fill">
        <li className="nav-item"><Link to='/products'>Products</Link></li>
        {
          isAdmin
          ? <li className="nav-item"><Link to={`/admin`}>Admin Dashboard</Link></li>
          : ''
        }
        {
          isAuth
          ? <li className="nav-item"><Link to={`/users/${userId}`}>Manage Account</Link></li>
          : <li className="nav-item"><Link to='/signup'>Create Account</Link></li> 
        }
        {
          isAuth
          ? <li className="nav-item" onClick={()=>{signOut(getUser)}}><Link to='/'>Sign Out</Link></li> 
          : <li className="nav-item"><Link to='/signin'>Sign In</Link></li>
        }
        <li className="nav-item"><Link to={'/cart'} style={{fontSize: '32px'}}>🛒{cartProdCount}</Link></li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.orders.filter(order => order.status === 'inCart')
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);