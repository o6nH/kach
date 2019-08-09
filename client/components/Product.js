import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedProduct, addToCart} from '../store';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //included to allow load of product with direct link to page
    console.log('USER: ', this.props.user)
    const {match, getSelectedProduct} = this.props;
    getSelectedProduct(match.params.productId);
  }

  render() {
    const {product, user, addToCart} = this.props;
    const {name, imageUrls, price, aveRating, description, quantity} = product;
    const order = {id: 'ord123'};
    const {id:cartId} = order;
    return (
      <div>
        <h3>{name}</h3>
        <div style={{display:'flex'}}>
          <div><img src={Array.isArray(imageUrls) ? imageUrls[0] : imageUrls} style={{width:'270px'}}/></div>
          <div>
            <ul style={{listStyle:'none'}}>
              <li>Price: ${`${price}`}</li>
              {
                aveRating ? <li>AveRating: {`${Math.round(100*aveRating)/100}`}</li> : ''
              }
            </ul>
            {
              quantity
              ? <button onClick={()=>{
                  window.location.hash = `/cart/${cartId}`;
                  addToCart({...product, userId: user.id});
                }}>Add to Cart</button> 
              : <span>{'Currently Unavailable'}</span>
            }
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
  product: state.selectedProduct,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getSelectedProduct: (productId) => dispatch(fetchSelectedProduct(productId)),
  addToCart: (info) => dispatch(addToCart(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);