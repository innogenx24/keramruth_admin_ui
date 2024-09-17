import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState,
  reducers: {
    deleteProductRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deleteProductSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} = productDeleteSlice.actions;

export default productDeleteSlice.reducer;
