import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    success: false,
    error: null,
    product: null,
};

const productPostSlice = createSlice({
    name: 'productPost',
    initialState,
    reducers: {
        makePostProduct: (state, action) => {
            //Saga will handle the actual API call
        },
        productPostRequest: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        productPostSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.product = action.payload;
        },
        productPostFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

export const { productPostRequest, productPostSuccess, productPostFailure, makePostProduct } = productPostSlice.actions;

export default productPostSlice.reducer;
