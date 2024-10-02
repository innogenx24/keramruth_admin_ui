// redux/sagas/rootSaga.js
import { all } from 'redux-saga/effects';
import authSaga from './auth-saga/authSaga';
import watchFetchProducts from './product-saga/ProductGetSaga';
import productPostSaga from './product-saga/ProductPostSaga';
import { watchFetchProductSingle } from './product-saga/ProductGetSingleSaga';
import { watchDeleteProduct } from './product-saga/ProductDeleteSaga';
import productEditSaga from './product-saga/ProductEditSaga';


export default function* rootSaga() {
  yield all([
    authSaga(),
    watchFetchProducts(),
    productPostSaga(),
    watchFetchProductSingle(),
    watchDeleteProduct(),
    productEditSaga(),
  ]);
}
