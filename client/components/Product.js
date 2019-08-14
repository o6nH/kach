import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProduct, addToCart} from '../actions';

class Product extends React.Component {
  componentDidMount() {
    //included to allow load of product with direct link to page
    const {match, fetchProduct} = this.props;
    fetchProduct(match.params.productId);
  }

  render() {
    const {user, cart, product, addToCart} = this.props;
    const {isAdmin} = user;
    const {id:cartId} = cart;
    const {id:productId, name, imageUrls, categories, price, aveRating, description, quantity} = product;

    return (
      productId 
      ? <div>
        <h2>{name}</h2>
        <div style={{display:'flex'}}>
          <div>
            <img src={Array.isArray(imageUrls) ? imageUrls[0] : imageUrls} style={{width:'270px'}}/>
          </div>
          <div>
            <div><h3>Price:</h3> ${`${price}`}</div>
            {aveRating ? <div><h3>AveRating:</h3> {Number(aveRating).toFixed(2)}</div> : ''}
            <br/>
            {
              quantity
              ? <button onClick={()=>{
                window.location.hash = `/cart/${cartId}`;
                addToCart({...product, userId: user.id});
              }}>Add to Cart</button> 
              : <span>{'Currently Unavailable'}</span>
            }
            <br/>
            {isAdmin ? <Link to={`/admin/products/${productId}`}>Edit</Link> : ''}
          </div>
        </div>
        <div>
          <div id='prodDescription'>
            <h3>Description:</h3>
            <p>{`${description}`}</p>
          </div>
          <div id='categories'>
            <h3>Categories:</h3>
            <p>{categories.map(category => `${category}`).join(', ')}</p>
          </div>
        </div>
      </div>
      : ''
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.orders.filter(order => order.status === 'inCart')[0],
  product: state.selectedProduct
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: (productId) => dispatch(fetchProduct(productId)),
  addToCart: (info) => dispatch(addToCart(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);