import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedProduct} from '../store';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //included to allow load of product with direct link to page
    const {match, getSelectedProduct} = this.props;
    getSelectedProduct(match.params.productId);
  }

  render() {
    const {product} = this.props;
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
                  console.log('Need .post(`/api/orders/:orderId`, {productId}) to create OrderProduct instance');
                  window.location.hash = `/order/${cartId}`;
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
  product: state.selectedProduct
});

const mapDispatchToProps = dispatch => ({
  getSelectedProduct: (productId) => dispatch(fetchSelectedProduct(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);