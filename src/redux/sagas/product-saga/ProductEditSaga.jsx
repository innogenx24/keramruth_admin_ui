import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { productEditFailure, productEditRequest, productEditSuccess } from '../../slices/product-slice/ProductEditSlice';

function* editProduct(action) {
  try {
    yield put(productEditRequest());
    const token = localStorage.getItem('token');
    const response = yield call(axios.put, `http://localhost:3002/products/${action.payload.id}`, action.payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(productEditSuccess(response.data));
  } catch (error) {
    yield put(productEditFailure(error.message));
  }
}

export default function* productEditSaga() {
  yield takeEvery('productEdit/makeEditProduct', editProduct);
}
