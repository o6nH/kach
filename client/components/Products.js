import React from 'react';
import {Link} from 'react-router-dom';

// Fake Store (TODO: replace with redux store)
const products = [{productId: '1', name: 'Acetaminophen', aveRating:3.4, price:3.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/8/8f/Paracetamol-from-xtal-3D-balls.png','https://en.wikipedia.org/wiki/Paracetamol#/media/File:Paracetamol-skeletal.svg']}];

function Products() {
  return (
    <div>
    {          
      //TODO: refactor into ProductCard w/ Rating Component        
      products.map(product => {
        const {productId, name, imageUrls, price, aveRating} = product;
        return(
          <div>
            <Link to={`/product/${productId}`}>
            <img src={imageUrls[0]} style={{width:'125px'}}/>
            <h3>{name}</h3>
            </Link>
            <ul>
              <li>Price: {`${price}`}</li>
              <li>AveRating: {`${aveRating}`}</li>
            </ul>
          </div>
        )
      })
    }
    </div>
  )
}

export default Products
