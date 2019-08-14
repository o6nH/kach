import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function CategoriesFilter(props) {
  const {categories, categoryCounts} = props;
  return (
    <div id='filters'>
      <h3 >Filter by category: </h3>
      <ul name='categories'>
      {
        categories.map((category, index) => {
          const query = `category=${category}`;
          return (
            <li key={index}>
              <Link to={`/products?${query}`}>
                {`${category[0].toUpperCase() + category.split('').slice(1).join('') } `}  
                {`(${categoryCounts[category]})`}
              </Link>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  const {categorizedProducts} = state;
  const categoryCounts = {};
  for(let category in categorizedProducts) {
    categoryCounts[category] = categorizedProducts[category].count
  }

  return {
    categoryCounts,
    categories: Object.keys(categoryCounts),
  }
}

export default connect(mapStateToProps)(CategoriesFilter)