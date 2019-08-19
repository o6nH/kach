const products = [
  {
    id: '16e11d4d-6358-47bd-b252-438227de8a49', 
    name: 'Standing Desk', 
    price: 299.99, 
    quantity: 100, 
    categories: ['furniture', 'health'],
    imageUrls: ['https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT5YjRTehLG6HfEMdTQhqYLcq0nuH26adFllkE9fH0RNOO_GnNeX4BwpTF8wTg8g0xrQLNVau-HNW7tyT0Q5pRpYxSZ9_9pCWOkBmqxR0wwx2zkJAFWUxY_qA&usqp=CAY'], 
    description: 'A desk for standing while working, because who you shouldn\'t sit all day long' 
  },
  {
    id: '4ab7f9a4-3d03-445d-b222-e66b6ef0a6cd', 
    name: 'Ergonomic Keyboard', 
    price: 79.98, 
    quantity: 100, 
    categories: ['office', 'health'],
    imageUrls: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ_zZy_qDrE3Ub_yicc60SIsv19d18VU8tJhPMULy7_LkjXg3G1zqOOlWjY4hvQU0y_TranywyAZYw4ergvMOO0rUHGFIEdVm3eBhDbg04&usqp=CAE'], 
    description: 'An ergonomic keyboard that will help prevent wrist and thumb pains.'
  },
  {
    id: '7c27b055-1187-49d0-aece-93deb97dffe8', 
    name: 'Ergonomic Mouse', 
    price: 67.54, 
    quantity: 100, 
    categories: ['office', 'health'],
    imageUrls: [''], 
    description: 'An ergonomic mouse that will help prevent wrist and finger pains.' 
  },
  {
    id: 'b6c69306-ed81-488a-8edc-2b57dc07294c', 
    name: 'Advil', 
    quantity: 200, 
    price: 3.49, 
    categories: ['medication'],
    imageUrls: ['https://www.advil.com/sites/default/files/images/products/advil-tablets-new_0_0.png'],
    description: 'Ibuprofen for the swelling anywhere in your body.', 
  },
  {
    id: 'caa4bf94-afcb-47c9-9f32-4914c1cc11a2', 
    name: 'Acetaminophen', 
    quantity: 1,
    price: 3.49, 
    aveRating: null, 
    categories: ['medication'], 
    imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/8/8f/Paracetamol-from-xtal-3D-balls.png','https://en.wikipedia.org/wiki/Paracetamol#/media/File:Paracetamol-skeletal.svg'], 
    description:'Paracetamol, also known as acetaminophen and APAP, is a medication used to treat pain and fever. It is typically used for mild to moderate pain relief. There is mixed evidence for its use to relieve fever in children. It is often sold in combination with other medications, such as in many cold medications. Paracetamol is also used for severe pain, such as cancer pain and pain after surgery, in combination with opioid pain medication. It is typically used either by mouth or rectally, but is also available by injection into a vein. Effects last between 2 to 4 hours.\nParacetamol is generally safe at recommended doses. The recommended maximum daily dose for an adult is 3 or 4 grams. Higher doses may lead to toxicity, including liver failure. Serious skin rashes may rarely occur. It appears to be safe during pregnancy and when breastfeeding. In those with liver disease, it may still be used, but in lower doses. It is classified as a mild analgesic. It does not have significant anti-inflammatory activity. How it works is not entirely clear. -Wikipedia'
  },
  {
    id: 'f3015b76-0c17-42d1-a6a5-496385dc46a8', 
    name: 'Eye drops', 
    quantity: 2,
    price: 5.49, 
    categories: ['health', 'medication'], 
    aveRating: null, 
    imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/6/60/%C3%96gondroppar2.jpg'], description: 'Five pack. Natural tears, dryness relief for your eyes.'
  }
];

module.exports = products;