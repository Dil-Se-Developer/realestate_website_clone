import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CustomerProductCard from "./CustomerProductCard";
import "./Home.css";

const Home = () => {
  const [productsValue, setProductsValue] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products`)
      .then((respnses) => setProductsValue(respnses.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePropertyChange = (event) => {
    let { value } = event.target;
    setSelectedProperty(value);
  };

  // console.log(selectedProperty);
  // console.log(productsValue);

  const filterProducts = () => {
    if (selectedProperty === "all") {
      return productsValue;
    } else {
      let filteredProducts = productsValue.filter(
        (product) => product.propertytype === selectedProperty
      );
      return filteredProducts;
    }
  };

  const handleSearchChange = (searchProduct) => {
    setSearchString(searchProduct);
  };

  const searchProducts = (products) => {
    let searchArray = products.map((product) => {
      if (
        product.propertyname.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return product;
      } else {
        return null;
      }
    });
    return searchArray;
  };

  // console.log(searchInput);
  let products = filterProducts();
  products = searchProducts(products);

  return (
    <>
      <div className="home_background_img">
        <h2>Find Your Dream Home</h2>
        <p>We Have Over Milion Properties For You</p>
        <div className="home_btn_group">
          <button value="all" onClick={(event) => handlePropertyChange(event)}>
            All
          </button>
          <button value="sale" onClick={(event) => handlePropertyChange(event)}>
            For Sale
          </button>
          <button value="rent" onClick={(event) => handlePropertyChange(event)}>
            For Rent
          </button>
        </div>
        <div className="home_search_section">
          <input
            type="text"
            placeholder="Search Property Name..."
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          ></input>
          <button onClick={() => handleSearchChange(searchInput)}>
            Search Now
          </button>
        </div>
      </div>
      <div className="sellproducts">
        {products.map((productValue) =>
          productValue ? (
            <CustomerProductCard
              productValue={productValue}
              key={productValue.id}
            />
          ) : null
        )}
      </div>
    </>
  );
};

export default Home;
