import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSelectedProduct, addToCart} from '../store';

class Product extends React.Component {
  componentDidMount() {
    //included to allow load of product with direct link to page
    const {match, getSelectedProduct} = this.props;
    getSelectedProduct(match.params.productId);
  }

  render() {
    const {user, cart, product, addToCart} = this.props;
    const {isAdmin} = user;
    const {id:cartId} = cart;
    const {name, imageUrls, price, aveRating, description, quantity} = product;

    return (
      <div>
        <h3>{name}</h3>
        <div style={{display:'flex'}}>
          <div><img src={Array.isArray(imageUrls) ? imageUrls[0] : imageUrls} style={{width:'270px'}}/></div>
          <div>
            <ul style={{listStyle:'none'}}>
              <li>Price: ${`${price}`}</li>
              {aveRating ? <li>AveRating: {`${Number(aveRating).toFixed(2)}`}</li> : ''}
            </ul>
            {
              quantity
              ? <button onClick={()=>{
                  window.location.hash = `/cart/${cartId}`;
                  addToCart({...product, userId: user.id});
                }}>Add to Cart</button> 
              : <span>{'Currently Unavailable'}</span>
            }
            <br/>
            {isAdmin ? <Link to='admin/products/:productId'>Edit</Link> : ''}
          </div>
        </div>
        <div>
          <div id='prodDescription'>{`${description}`}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.orders.filter(order => order.status === 'inCart')[0],
  product: state.selectedProduct
});

const mapDispatchToProps = dispatch => ({
  getSelectedProduct: (productId) => dispatch(fetchSelectedProduct(productId)),
  addToCart: (info) => dispatch(addToCart(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);