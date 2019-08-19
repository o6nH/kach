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
    const {user, product, addToCart} = this.props;
    const {isAdmin} = user;
    const {id:productId, name, imageUrls, categories, price, aveRating, description, quantity} = product;

    return (
      productId 
      ? <div className="container">
        <h2>{name}</h2> {isAdmin ? <Link to={`/admin/products/${productId}`}>Edit Product</Link> : ''}
        <div className="card">
          <div className="wrapper row">
          <div className="col-md-6">
            <img src={Array.isArray(imageUrls) ? imageUrls[0] : imageUrls} className="card-img"/>
          </div>
          <div className="col-md-6">
          <div id='prodDescription'>
            <h4>Product Description:</h4>
            <p>{`${description}`}</p>
          </div>
            <div><h4>Price:</h4> ${`${price}`}</div>
            {aveRating ? <div><h4>AveRating:</h4> {Number(aveRating).toFixed(2)}</div> : ''}
            
            <div id='categories'>
            <h4>Categories:</h4>
            <p>{categories.map(category => `${category}`).join(', ')}</p>
          </div>
            {
              quantity > 0
              ? <button className="btn btn-dark" onClick={async ()=>{
                await addToCart({...product, userId: user.id});
                this.props.history.push('/cart');
              }}>Add to Cart</button> 
              : <span>{'Currently Unavailable'}</span>
            }
            <br/>
            
            
        <div>
          
          
        </div>
      </div>
      </div>
          </div>
        </div>
      : ''
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  product: state.selectedProduct
});

const mapDispatchToProps = {fetchProduct, addToCart}//shorthand dispatch wrapping
/*dispatch => ({
  fetchProduct: (productId) => dispatch(fetchProduct(productId)),
  addToCart: (info) => dispatch(addToCart(info))
});*/

export default connect(mapStateToProps, mapDispatchToProps)(Product);