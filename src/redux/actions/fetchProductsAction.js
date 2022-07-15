import { fetchAgentProductsData } from './apiActions'
import axios from "axios";

export const fetchAgentProductsDataAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`http://localhost:5000/products?agentId=${id}`)
            dispatch(fetchAgentProductsData(response.data))
        } catch (error) {
            return error.message
        }
    }
}

export const addProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/products`,
                data
            );
            dispatch(fetchAgentProductsDataAction(data.agentId))
            console.log(response);
            return response
        } catch (error) {
            return error.message
        }
    }
}

export const updateProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put(`http://localhost:5000/products/${data.id}`, data);
            return response
        } catch (error) {
            return error.message
        }

    }
}

export const deleteProduct = (id, agentId) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`http://localhost:5000/products/${id}`)
            dispatch(fetchAgentProductsDataAction(agentId))
            return response
        } catch (error)  {
            return error.message
        }
    }
}