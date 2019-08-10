import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSelectedProduct} from '../store';

class EditProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: {
        name: '',
        quantity: 0,
        price: '',
        category: '',
        description: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //included to allow load of product with direct link to page
    const {match, getProduct} = this.props;
    getProduct(match.params.productId);
  }

  componentDidUpdate(prevProps, prevState) {
    const {product:prevProd} = prevState;
    const {product:selectedProd} = this.props;
    if(selectedProd.hasOwnProperty('name') && prevProd.name !== selectedProd.name) {
      this.setState({product:selectedProd});
    }
  }

  handleChange(event){
    const {name, value} = event.target;
    this.setState({product:{...this.state.product, [name]:value}});
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.product);
    // TODO: dispatch Product.update();
  }

  render() {
    const {isAdmin} = this.props;
    const {name, quantity, price, category, description} =this.state.product;
    const {handleChange, handleSubmit} = this;

    return (
      <div>
        {
          !isAdmin
          ? <h1>Forbidden.</h1>
          : <div>
              <h3>Product Information:</h3>
              <form type='submit' onSubmit={handleSubmit}>
              <label>Name: </label> <br/>
              <input type='text' name='name' value={name} onChange={handleChange}/><br/>
              <label>Qty: </label><br/>
              <input type='text' name='quantity' value={quantity} onChange={handleChange}/><br/>
              <label>Price: </label> <br/>
              <input type='text' name='price' value={price} onChange={handleChange}/><br/>
              <label>Category: </label><br/>
              <input type='text' name='category' value={category} onChange={handleChange}/><br/>
              <label>Description: </label> <br/>
              <textarea rows={4} name='description' value={description} onChange={handleChange}/>
              <br/>
              <button type='submit'>Update</button>
            </form>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAdmin: state.user.isAdmin,
  product: state.selectedProduct
});

const mapDispatchToProps = dispatch => ({
  getProduct: (productId) => dispatch(fetchSelectedProduct(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);