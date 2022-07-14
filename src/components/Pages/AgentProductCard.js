import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/actions/fetchProductsAction'
import { useNavigate } from 'react-router';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import './AgentProductCard.css'

const AgentProductCard = (props) => {
  const dispatch = useDispatch();
  const { agentId, id, propertyname, propertytype, price, postimg } = props.agentProductData;
  const Navigate = useNavigate()
  const editHandler = (id) => {
    Navigate(`/agent/editlisting/${id}`)
  }

  const deleteHandler = (id, agentId) => {
    dispatch(deleteProduct(id, agentId))
  }

  // console.log(id);
  return (
    <div className='sellcard'>
      <img src={postimg} alt="sellitems" />
      <h2>{propertyname}</h2>
      <p>For {propertytype}</p>
      <h3> &#x20B9; {price}</h3>
      <div className='sellcardicon'>
        <FaEdit size={"1.4rem"} onClick={() => { editHandler(id) }} />
        <AiFillDelete size={"1.4rem"} onClick={() => {deleteHandler(id, agentId)}}/>
      </div>
    </div>
  )
}

export default AgentProductCard