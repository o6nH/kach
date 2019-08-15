import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class AdminProductsTable extends React.Component {
  render() {
    const {products, productAttributes} = this.props;
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
                }
              </tr>
            </thead>
            <tbody>
              {
                products.map(product => 
                  <tr key={product.id}>
                    {
                      productAttributes.map(attribute => {
                        if (attribute !== 'categories') {
                          return <td key={product.id + attribute}>{product[attribute]}</td>
                        }
                        return <td key={product.id + attribute}>{JSON.stringify(product[attribute])}</td>
                      })
                      .concat([<td><Link to={`/admin/products/${product.id}`}>Edit</Link></td>])
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
  productAttributes: Object.keys(state.products.length && state.products[0]).filter(attr => !['id', 'imageUrls', 'aveRating', 'createdAt', 'updatedAt'].includes(attr))
})

export default connect(mapStateToProps)(AdminProductsTable)