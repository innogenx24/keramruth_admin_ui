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

function* signIn(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3002/api/admin/signin', action.payload);
    yield put(signInSuccess({ user: response.data.user, token: response.data.token }));
    localStorage.setItem('token', response.data.token); // Save token in localStorage
  } catch (error) {
    yield put(signInFailure(error.response.data.message || 'An error occurred'));
  }
}

function* signUp(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3002/api/auth/signup', action.payload);
    yield put(signUpSuccess({ user: response.data.user }));
  } catch (error) {
    yield put(signUpFailure(error.response.data.message || 'An error occurred'));
  }
}

export default function* authSaga() {
  yield takeLatest(signInRequest.type, signIn);
  yield takeLatest(signUpRequest.type, signUp);
}
