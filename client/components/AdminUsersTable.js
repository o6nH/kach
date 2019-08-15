import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class AdminUsersTable extends React.Component {
  render() {
    const {users, userAttributes} = this.props;
    if (users, userAttributes) {
      return (
        <div>
          <h3>All Users</h3>
          <table>
            <thead>
              <tr>
                {
                  userAttributes.map((header, col) => 
                  <th key={col}>{header[0].toUpperCase() + header.slice(1)}</th>)
                  .concat([<th>Edit</th>])
                }
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => 
                  <tr key={user.id}>
                    {
                      userAttributes.map(attribute => {
                        if (attribute !== 'categories') {
                          return <td key={user.id + attribute}>{user[attribute]}</td>
                        }
                        return <td key={user.id + attribute}>{JSON.stringify(user[attribute])}</td>
                      })
                      .concat([<td key={user.id + 'edit'}><Link to={`/users/${user.id}`}>Edit</Link></td>])
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
    users: state.users,
    userAttributes: Object.keys(state.users.length && state.users[0]).filter(attr => ['firstName', 'lastName', 'streetAddress', 'suite', 'city', 'state', 'zip', 'email'].includes(attr))
})

export default connect(mapStateToProps)(AdminUsersTable)