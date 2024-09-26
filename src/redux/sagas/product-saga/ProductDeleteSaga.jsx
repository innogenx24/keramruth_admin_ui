import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { deleteProductFailure, deleteProductRequest, deleteProductSuccess } from '../../slices/product-slice/ProductDeleteSlice';



function deleteProductApi(productId, token) {
  return axios.delete(`http://localhost:3002/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function* deleteProduct(action) {
  try {
    const token = localStorage.getItem('token');
    yield call(deleteProductApi, action.payload, token);
    yield put(deleteProductSuccess());
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

export function* watchDeleteProduct() {
  yield takeLatest(deleteProductRequest.type, deleteProduct);
}
