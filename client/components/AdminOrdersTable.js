import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class AdminOrdersTable extends React.Component {
  render() {
    const {orders, orderAttributes} = this.props;
    if (orders, orderAttributes) {
      return (
        <div>
          <h3>All Orders</h3>
          <table>
            <thead>
              <tr>
                {
                  orderAttributes.map((header, col) => 
                  <th key={col}>{header[0].toUpperCase() + header.slice(1)}</th>)
                  .concat([<th>Edit</th>])
                }
              </tr>
            </thead>
            <tbody>
              {
                orders.map(order => 
                  <tr key={order.id}>
                    {
                      orderAttributes.map(attribute => {
                        if (attribute !== 'categories') {
                          return <td key={order.id + attribute}>{order[attribute]}</td>
                        }
                        return <td key={order.id + attribute}>{JSON.stringify(order[attribute])}</td>
                      })
                      .concat([<td><Link to={`/admin/orders/${order.id}`}>Edit</Link></td>])
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
  orders: state.orders,
  orderAttributes: Object.keys(state.orders.length && state.orders[0]).filter(attr => ['id', 'status'].includes(attr))
})

export default connect(mapStateToProps)(AdminOrdersTable)