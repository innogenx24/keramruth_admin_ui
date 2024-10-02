
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import authReducer from './slices/authSlice';
import productReducer from './slices/product-slice/ProductGetSlice';
import productPostReducer from './slices/product-slice/ProductPostSlice';
import ProductGetSingleSlice from './slices/product-slice/ProductGetSingleSlice';
import ProductDeleteSlice from './slices/product-slice/ProductDeleteSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    productPost: productPostReducer,
    productGetSingle:ProductGetSingleSlice,
    productDelete:ProductDeleteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
