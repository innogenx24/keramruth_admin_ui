import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { productPostFailure, productPostRequest, productPostSuccess } from '../../slices/product-slice/ProductPostSlice';

function* postProduct(action) {
  try {
    yield put(productPostRequest());
    const token = localStorage.getItem('token');
    const response = yield call(axios.post, 'http://localhost:3002/products', action.payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(productPostSuccess(response.data));
  } catch (error) {
    yield put(productPostFailure(error.message));
  }
}

export default function* productPostSaga() {
    /* Ensure this matches the action name */
  yield takeEvery('productPost/makePostProduct', postProduct);
}
