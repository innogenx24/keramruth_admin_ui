import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productGetSingleSlice = createSlice({
  name: 'productGetSingle',
  initialState,
  reducers: {
    fetchProductSingleRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSingleSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductSingleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductSingleRequest, fetchProductSingleSuccess, fetchProductSingleFailure } = productGetSingleSlice.actions;

export default productGetSingleSlice.reducer;
