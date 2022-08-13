import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAgentProductsData = createAsyncThunk(
  "products/fetchAgentProducts",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/products?agentId=${id}`
    );
    return response.data;
  }
);

export const addProductData = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    await axios.post(`http://localhost:5000/products`, data);
  }
);

export const updateProductData = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    await axios.put(`http://localhost:5000/products/${data.id}`, data);
  }
);

export const deleteProductData = createAsyncThunk(
  "products/deleteProduct",
  async (agentProductData) => {
    await axios.delete(`http://localhost:5000/products/${agentProductData.id}`);
    const response = await axios.get(
      `http://localhost:5000/products?agentId=${agentProductData.agentId}`
    );
    return response.data;
  }
);

const defaultAgentProductsState = {
  agentProductsData: [],
};

const realestateDataSlice = createSlice({
  name: "realestateData",
  initialState: defaultAgentProductsState,
  reducers: {},
  extraReducers: {
    [fetchAgentProductsData.fulfilled]: (state, { payload }) => {
      state.agentProductsData = [...payload];
    },
    [deleteProductData.fulfilled]: (state, { payload }) => {
      state.agentProductsData = [...payload];
    },
  },
});

export default realestateDataSlice.reducer;
