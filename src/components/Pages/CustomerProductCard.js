import React from 'react'
import { Link } from 'react-router-dom';
import './CustomerProductCard.css'

const CustomerProductCard = (props) => {
  const { id, propertyname, propertytype, price, postimg} = props.productValue;
  return (
    <div className='sellcard'>
      <img src={postimg} alt="sellitems" />
      <h2>{propertyname}</h2>
      <p>For {propertytype}</p>
      <h3> &#x20B9; {price}</h3>
      <div className='product_link_section'>
        <a href={'https://wa.me/' + 9191919199} target="_blank" rel="noopener noreferrer" >Contact To Agent</a>
        <Link to={`/productdetail/${id}`}>More Info</Link>
      </div>
    </div>
  )
}

export default CustomerProductCard