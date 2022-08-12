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
  // console.log(singleUserData.id);
  // console.log(agentProductsData.length);
  let agentProductsDataLength = agentProductsData.length;

  useEffect(() => {
    dispatch(fetchAgentProductsData(singleUserData.id))
  }, [agentProductsDataLength])

  // const filteredAgentProductData = agentProductsData.filter((agentProductData) => agentProductData.agentId === singleUserData.id) 
  // console.log(agentProductsData);

  return (
    <div className='sellproducts'>
      {agentProductsData.map((agentProductData) => agentProductData ? <AgentProductCard agentProductData={agentProductData} key={agentProductData.id}/> : null)}
    </div>
  )
}

export default Agent