import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CustomerProductCard from './CustomerProductCard'
import './Home.css'

const Home = () => {
  const [productsValue, setProductsValue] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then((respnses) => setProductsValue(respnses.data))
      .catch((error) => {
      console.log(error);
    })
  }, [])

  console.log(productsValue);
  return (
    <CustomerProductCard />
  )
}

export default Home