import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteProduct} from '../actions';

class AdminProductsTable extends React.Component {
  constructor(props){
    super(props);
    this.openNewProductForm = this.openNewProductForm.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
  }
  
  openNewProductForm(){
    const {history} = this.props;
    history.push('/admin/products/new');//TODO: copy ProductForm into NewProductForm
  }

  showDeleteAlert(event, product){
    const {deleteItem} = this.props;
    if(window.confirm(`Please confirm deletion of the following product: ${product.name}`)) {
      deleteItem(product.id);
    }
  }

  render() {
    const {products, productAttributes} = this.props;
    const {showDeleteAlert} = this;
    if (products, productAttributes) {
      return (
        <div>
          <h3>All Products</h3>
          <table>
            <thead>
              <tr>
                {
                  productAttributes.map((header, col) => 
                  <th key={col}>{header[0].toUpperCase() + header.slice(1)}</th>)
                  .concat([<th>Edit</th>])
                  .concat([<th>Delete</th>])
                }
              </tr>
            </thead>
            <tbody>
              {
                products.map(product => 
                  <tr key={product.id}>
                    {
                      productAttributes.map(attribute => {
                        if (attribute === 'name') {
                          return <td key={product.id + attribute}>
                              <Link to={`/products/${product.id}`}>{product[attribute]}</Link>
                            </td>
                        }
                        else if (attribute !== 'categories') {
                          return <td key={product.id + attribute}>{product[attribute]}</td>
                        }
                        return <td key={product.id + attribute}>
                            {JSON.stringify(product[attribute])}
                          </td>
                      })
                      .concat([<td>
                          <Link to={`/admin/products/${product.id}`}><button>Edit</button></Link>
                        </td>])
                      .concat([<td>
                          <button onClick={event => showDeleteAlert(event, product)}>Delete</button>
                        </td>]) //TODO: guarantee re-categorizeProducts or delete from each state (products and categorizedProducts) just like with Products component should have
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      )
    }
    return '';
  }
}

const mapStateToProps = state => ({
  products: state.products,
  productAttributes: Object.keys(state.products.length && state.products[0])
    .filter(attr => !['id', 'imageUrls', 'aveRating', 'createdAt', 'updatedAt'].includes(attr))
})

const mapDispatchToProps = dispatch => ({
  deleteItem: productId => dispatch(deleteProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsTable)