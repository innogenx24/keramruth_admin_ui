import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchProductSingleFailure, fetchProductSingleRequest, fetchProductSingleSuccess } from '../../slices/product-slice/ProductGetSingleSlice';

function* fetchProductSingleSaga(action) {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(axios.get, `http://localhost:3002/products/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(fetchProductSingleSuccess(response.data));
  } catch (error) {
    yield put(fetchProductSingleFailure(error.message));
  }
}

export function* watchFetchProductSingle() {
  yield takeLatest(fetchProductSingleRequest.type, fetchProductSingleSaga);
}
