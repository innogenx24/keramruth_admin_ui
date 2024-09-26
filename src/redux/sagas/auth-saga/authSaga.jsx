// redux/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
  signInSuccess, 
  signInFailure, 
  signUpSuccess, 
  signUpFailure, 
  signInRequest, 
  signUpRequest 
} from '../../slices/authSlice';
import { ADMIN_API } from '../../../constants/ApiConstant';


function* signIn(action) {
  const api2 = import.meta.env.VITE_API_ENDPOINT;

  try {
    const response = yield call(axios.post, `${api2}${ADMIN_API.SIGNIN}`, action.payload);
    yield put(signInSuccess({ user: response.data.user, token: response.data.token }));
    localStorage.setItem('token', response.data.token); 
  } catch (error) {
    yield put(signInFailure(error.response.data.message || 'An error occurred'));
  }
}

function* signUp(action) {
  try {
    const response = yield call(axios.post, `${api2}${ADMIN_API.SIGNUP}`, action.payload);
    yield put(signUpSuccess({ user: response.data.user }));
  } catch (error) {
    yield put(signUpFailure(error.response.data.message || 'An error occurred'));
  }
}

export default function* authSaga() {
  yield takeLatest(signInRequest.type, signIn);
  yield takeLatest(signUpRequest.type, signUp);
}
