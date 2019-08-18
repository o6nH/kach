import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {categorizeProducts} from '../actions';

class CategoriesFilter extends React.Component { 
  constructor(props) {
    super(props)
  }
  
  componentDidMount(){
    this.props.categorizeProducts();
  }

  render() {
    const {categories, categoryCounts} = this.props;
    return (
      <div id='filters'>
        <h4>Filter by category: </h4>
        <ul name='categories'>
        {
          categories.map((category, index) => {
            const query = `category=${category}`;
            return categoryCounts[category] > 0 
            ? 
            <li key={index} className="list-group-item">
              <Link to={`/products?${query}`}>
                {`${category[0].toUpperCase() + category.split('').slice(1).join('') } `}  
                {`(${categoryCounts[category]})`}
              </Link>
            </li>
            : ''
          })
        }
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => {
  const {categorizedProducts} = state;
  const categoryCounts = {};
  for(let category in categorizedProducts) {
    categoryCounts[category] = categorizedProducts[category].availableCount
  }

  return {
    categoryCounts,
    categories: Object.keys(categoryCounts),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    categorizeProducts: () => dispatch(categorizeProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesFilter)