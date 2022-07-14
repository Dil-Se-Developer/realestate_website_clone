import axios from "axios";

export const addProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/products`,
                data
            );
            return response
        } catch (error) {
            return error.message
        }
    }
}