import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [productData, setProductData] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProductData(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <div className="cards_details_section">
        <div className="cards_description">
          <div className="card_description_img">
            <img src={productData.postimg} alt="ProductImg" />
          </div>
          <div className="card_brand_details">
            <h3>Details</h3>
            <span>House</span>
            <span>{productData.propertyname}</span>
            <span>Bedrooms</span>
            <span>{productData.bedrooms}</span>
            <hr></hr>
            <h3>House Address</h3>
            <p>{productData.propertyaddress}</p>
          </div>
        </div>
        <div className="seller_details_section">
          <div className="card_price_details">
            <h2>&#x20B9; {productData.price}</h2>
            <span>
              {`${productData.propertyname} for ${productData.propertytype}`} 
            </span>
          </div>
          <div className="selling_details">
            <h3>Seller Description</h3>
            <a href={"https://wa.me/" + 9191919199} target="_blank" rel="noopener noreferrer">
              Contact to Agent
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
