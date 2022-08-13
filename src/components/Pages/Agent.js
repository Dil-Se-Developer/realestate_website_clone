import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { fetchAgentProductsDataAction } from '../../redux/actions/fetchProductsAction'
import { fetchAgentProductsData } from '../../redux_tookit/slices/realestateDataSlice'
import AgentProductCard from './AgentProductCard'
import './Agent.css'

const Agent = () => {
  const dispatch = useDispatch();
  const agentProductsData = useSelector((state) => state.agentProductsData.agentProductsData)
  const singleUserData = useSelector((state) => state.userAgentData.singleUserData);

  useEffect(() => {
    dispatch(fetchAgentProductsData(singleUserData.id))
  }, [])

  return (
    <div className='sellproducts'>
      {agentProductsData.map((agentProductData) => agentProductData ? <AgentProductCard agentProductData={agentProductData} key={agentProductData.id}/> : null)}
    </div>
  )
}

export default Agent