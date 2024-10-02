import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess } from '../../slices/product-slice/ProductGetSlice';


/** Define the API URL **/
const API_URL = 'http://localhost:3002/products';

/** Worker saga to fetch products**/
function* fetchProducts() {
  try {
    /** Retrieve the token from localStorage **/
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    /** Make API request with the token in the Authorization header**/
    const response = yield call(axios.get, API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    /** Dispatch success action with the fetched data **/
    yield put(fetchProductsSuccess(response.data));
    console.log('Fetched Products:', response.data);

  } catch (error) {
    /** Dispatch failure action with the error message **/
    yield put(fetchProductsFailure(error.message));
  }
}

/** Watcher saga to trigger fetchProducts on fetchProductsRequest action **/
function* watchFetchProducts() {
  yield takeEvery(fetchProductsRequest.type, fetchProducts);
}

export default watchFetchProducts;
