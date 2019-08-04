import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'querystring';

// Fake Store (TODO: replace with redux store)
const products = [{productId: '1', name: 'Acetaminophen', category: 'Medication', aveRating:3.4, price:3.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/8/8f/Paracetamol-from-xtal-3D-balls.png','https://en.wikipedia.org/wiki/Paracetamol#/media/File:Paracetamol-skeletal.svg'], description:'Paracetamol, also known as acetaminophen and APAP, is a medication used to treat pain and fever. It is typically used for mild to moderate pain relief. There is mixed evidence for its use to relieve fever in children. It is often sold in combination with other medications, such as in many cold medications. Paracetamol is also used for severe pain, such as cancer pain and pain after surgery, in combination with opioid pain medication. It is typically used either by mouth or rectally, but is also available by injection into a vein. Effects last between 2 to 4 hours.\nParacetamol is generally safe at recommended doses. The recommended maximum daily dose for an adult is 3 or 4 grams. Higher doses may lead to toxicity, including liver failure. Serious skin rashes may rarely occur. It appears to be safe during pregnancy and when breastfeeding. In those with liver disease, it may still be used, but in lower doses. It is classified as a mild analgesic. It does not have significant anti-inflammatory activity. How it works is not entirely clear. -Wikipedia', isAvailable:true}, {productId: '2', name: 'Eye drops', category: ['Medication', 'Eyes'], aveRating:4.5, price:5.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/6/60/%C3%96gondroppar2.jpg'], description: 'Natural tears, dryness relief for your eyes.', isAvailable: true}];

// TODO: move helper functions to Product table for Product.classMethod or redux store as helper functions for reducers
const getCategories = (categorizedProducts) => Object.keys(categorizedProducts);

//Category keys with procuct count values
const getCategoryCounts = (products) => {
  const catProdObj = categorizeProducts(products);
  return getCategories(catProdObj).reduce((categoryCounts, category) => {
    categoryCounts[category] = catProdObj[category].length;
    return categoryCounts;
  }, {})
};

//Category keys with products array
const categorizeProducts = products => {
  return products.reduce((catProdObj, product) => {
    const {category} = product;
    if(typeof category === 'string') {
      catProdObj[category] = (catProdObj[category] && catProdObj[category].push(product)) || [product];     
    } else if (Array.isArray(category)) {
      category.forEach(_category => {
        if (catProdObj[_category]) catProdObj[_category].push(product)
        else catProdObj[_category] = [product]
      })
    } else (console.log(`Error: Could not understand category property of product: ${product.productId}`))
    return catProdObj;
  }, {})
};

console.log('categorizedProducts =', categorizeProducts(products));
console.log('categories = ', getCategories(categorizeProducts(products)));
console.log('categoryCounts =', getCategoryCounts(products));


// Component
function Products(props) {
  //TODO: destructure products and categories from props
  const categorizedProducts = categorizeProducts(products);
  const categoryCounts = getCategoryCounts(products);
  const categories = getCategories(categorizedProducts);
  const categoriesLi = categories.map((category, index) => {
    const query = `category=${category}`;
    return (
      <li key={index}>
        <Link to={`/products?${query}`}>{`${category} ${categoryCounts[category]}`}</Link>
      </li>
    )
  });

  //TODO: refactor CategoryFilter
  const CategoriesFilter = <div id='filters'>
    <h3 >Filter by category: </h3>
    <ul name='categories'>{categoriesLi}</ul>
  </div>

  const inSearch = (product, searchTerm) =>  {
    const splitName = product.name.split(' ');
    const splitDescription = product.description.split(' ');
    return (splitName.includes(searchTerm)) || (splitDescription.includes(searchTerm))
  };

  const filterCategorizedProducts = (products, categorizeProducts) => {
    const parsedQuery = props.location.search ? queryString.parse(props.location.search) : 'No Query';
    if(parsedQuery['?category'] || parsedQuery['category']) {
      const catProdObj = categorizeProducts(products);
      return catProdObj[parsedQuery['?category']] || catProdObj[parsedQuery['category']];
    }
    else if (parsedQuery['?search'] || parsedQuery['search']) {
      return products.filter(product => {
        return inSearch(product, parsedQuery['?search']) || inSearch(product, parsedQuery['search'])
      });
    }
    else if ((parsedQuery['?category']||parsedQuery['category']) && (parsedQuery['?search']) || parsedQuery['search']) {
      return categorizeProducts(products)[parsedQuery['?category']] || categorizeProducts(products)[parsedQuery['category']];
    }
    else return products;
  };
  
  
  return (
    <div>
      <div style={{display:'flex'}}>
        {CategoriesFilter}
        {/* TODO: refactor earch into separate components */}
        <form id='searchBar'>
          <label htmlFor='search'>Search: </label>
          <input name='search' type='text'></input>
          <input type='submit'></input>
        </form>
      </div>
      {          
        //TODO: refactor into ProductCard w/ Rating Component
        filterCategorizedProducts(products, categorizeProducts).map(product => {
          const {productId, name, imageUrls, price, aveRating} = product;
          return(
            <div key={productId}>
              <Link to={`/products/${productId}`}> 
              {/* TODO:remove inline styles*/}
              <img src={imageUrls[0]} style={{width:'125px'}}/>
              <h3>{name}</h3>
              </Link>
              <ul>
                <li>Price: ${`${price}`}</li>
                <li>AveRating: {`${aveRating}`}</li>
              </ul>
            </div>
          )
        })
      }
    </div>
  );
};

export default Products
