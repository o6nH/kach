import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function AdminPage({user}) {
  return(
    <div>
      <h2>Hello {user.firstName}</h2>
      {
        <ul>
          <li><Link to='/admin/users'>Edit Users' Personal Information</Link></li>
          <li><Link to='/admin/orders'>Edit Orders</Link></li>
          <li><Link to='/admin/products'>Edit Products</Link></li>
        </ul>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminPage);