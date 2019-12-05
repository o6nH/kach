import React from 'react';
import PropTypes from 'prop-types';
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to='/' className="navbar-brand" style={{fontFamily: 'Monserrat', fontStyle:'bold', fontSize: '32px'}}>
        {`💻${marketName}`}
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" className="collapse navbar-collapse justify-content-end ">
        <ul className="navbar-nav">
          <li className="nav-item table-hover"><Link to='/products' className="nav-link">Products</Link></li>
          {
            isAdmin
            ? <li className="nav-item"><Link to={`/admin`} className="nav-link">Admin Dashboard</Link></li>
            : ''
          }
          {
            isAuth
            ? <><li className="nav-item"><Link to={`/users/${userId}`} className="nav-link">Manage Account</Link></li>
              <li className="nav-item" onClick={()=>{signOut(getUser)}}><Link to='/' className="nav-link">Sign Out</Link></li></>
            : <><li className="nav-item"><Link to='/signup' className="nav-link">Create Account</Link></li> 
            <li className="nav-item"><Link to='/signin' className="nav-link">Sign In</Link></li></>
          }
        </ul>
        <div><Link to={'/cart'} style={{fontSize: '32px'}} className="nav-link">🛒{cartProdCount}</Link></div>
      </div>
    </nav>
  )
};

Navbar.propTypes = {
  getUser: PropTypes.func, 
  user: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool, 
    isAdmin: PropTypes.bool,
  }),
  cart: PropTypes.shape({
    productCount: PropTypes.bool
  })
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.orders.filter(order => order.status === 'inCart')
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);