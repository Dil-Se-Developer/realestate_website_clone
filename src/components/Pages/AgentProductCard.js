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

const AgentProductCard = (props) => {
  const dispatch = useDispatch();
  const { agentId, id, propertyname, propertytype, price, postimg } =
    props.agentProductData;
  const Navigate = useNavigate();

  const editHandler = (id) => {
    Navigate(`/agent/editlisting/${id}`);
    dispatch(setAgentStatus(false));
  };

  const deleteHandler = (id, agentId) => {
    dispatch(deleteProductData(id, agentId))
  };

  // console.log(id);
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
            deleteHandler(id, agentId);
          }}
        />
      </div>
    </div>
  );
};

export default AgentProductCard;
