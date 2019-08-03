import React from 'react'

export default function Product(props) {
  const selectedProductId = props.match.params.productId;
  // Fake Store (TODO: replace with redux store)
  const order = {orderId: 'ord123'};
  const product = [{productId: '1', name: 'Acetaminophen', category: 'Medication', aveRating:3.4, price:3.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/8/8f/Paracetamol-from-xtal-3D-balls.png','https://en.wikipedia.org/wiki/Paracetamol#/media/File:Paracetamol-skeletal.svg'], description:'Paracetamol, also known as acetaminophen and APAP, is a medication used to treat pain and fever. It is typically used for mild to moderate pain relief. There is mixed evidence for its use to relieve fever in children. It is often sold in combination with other medications, such as in many cold medications. Paracetamol is also used for severe pain, such as cancer pain and pain after surgery, in combination with opioid pain medication. It is typically used either by mouth or rectally, but is also available by injection into a vein. Effects last between 2 to 4 hours.\nParacetamol is generally safe at recommended doses. The recommended maximum daily dose for an adult is 3 or 4 grams. Higher doses may lead to toxicity, including liver failure. Serious skin rashes may rarely occur. It appears to be safe during pregnancy and when breastfeeding. In those with liver disease, it may still be used, but in lower doses. It is classified as a mild analgesic. It does not have significant anti-inflammatory activity. How it works is not entirely clear. -Wikipedia', isAvailable:true}, {productId: '2', name: 'Eye drops', category: ['Medication', 'Eyes'], aveRating:4.5, price:5.49, imageUrls:['https://upload.wikimedia.org/wikipedia/commons/6/60/%C3%96gondroppar2.jpg'], description: 'Natural tears, dryness relief for your eyes.', isAvailable: true}]
  .find(product => product.productId === selectedProductId);
  const {orderId:cartId} = order;
  const {name, imageUrls, price, aveRating, description, isAvailable} = product;
  return (
    <div>
      <h3>{name}</h3>
      <div style={{display:'flex'}}>
        <div><img src={imageUrls[0]} style={{width:'270px'}}/></div>
        <div>
          <ul style={{listStyle:'none'}}>
            <li>Price: ${`${price}`}</li>
            <li>AveRating: {`${aveRating}`}</li>
          </ul>
          {
            isAvailable 
            ? <button onClick={()=>{
                console.log('Need to POST new instance to OrderProduct');
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
