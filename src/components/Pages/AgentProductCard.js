import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { deleteProduct } from '../../redux/actions/fetchProductsAction'
import { useNavigate } from "react-router";
// import { agentStautsActions } from '../../redux/actions/agentStatusActions';
import { setAgentStatus } from "../../redux_tookit/slices/userAgentDataSlice";
import {
  fetchAgentProductsData,
  deleteProductData,
} from "../../redux_tookit/slices/realestateDataSlice";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./AgentProductCard.css";

const AgentProductCard = ({agentProductData}) => {
  const dispatch = useDispatch();
  const { agentId, id, propertyname, propertytype, price, postimg } =
    agentProductData;
  const Navigate = useNavigate();
  const editHandler = (id) => {
    Navigate(`/agent/editlisting/${id}`);
    dispatch(setAgentStatus(false));
  };

  const deleteHandler = (agentProductData) => {
    dispatch(deleteProductData(agentProductData))
  };

  return (
    <div className="sellcard">
      <img src={postimg} alt="sellitems" />
      <h2>{propertyname}</h2>
      <p>For {propertytype}</p>
      <h3> &#x20B9; {price}</h3>
      <div className="sellcardicon">
        <FaEdit
          size={"1.4rem"}
          onClick={() => {
            editHandler(id);
          }}
        />
        <AiFillDelete
          size={"1.4rem"}
          onClick={() => {
            deleteHandler(agentProductData);
          }}
        />
      </div>
    </div>
  );
};

export default AgentProductCard;
