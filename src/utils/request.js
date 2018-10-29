/**
 * @component request.js
 * @description 封装 axios请求
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Toast from './toast';
import { push } from './navigationService';
import routers from '../constants/routers';
import { BASE_URL } from '../config/api';

const ServeError = {
  SERVE_ERROR: '服务器发生未知错误',
  SERVE_TOKEN_ERROR: '令牌失效',
  TIMEOUT_ERROR: '网络连接超时',
  NETWORK_ERROR: '无网络连接',
};

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(async (config) => {
  // const language = localStorage.getItem('language');
  // config.headers['X-Pool-Language'] = language || 'zh';
  const token = await AsyncStorage.getItem('token');
  // removeToken is true, don't need token
  if (token && !config.removeToken) {
    config.headers['X-Pool-Jwt'] = token;
  }
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(async (response) => {
  const { data, status } = response;
  if ((status >= 200 && status < 300) || status === 304) {
    return data;
  }
  const res = new Error(data.code);
  res.response = response;
  throw res;
}, async (err) => {
  const { status, data: { msg, message } = {}, config = {} } = err.response || {};
  const errMsg = msg || message;
  if (status === 401 && !config.removeAuth) {
    await AsyncStorage.removeItem('token');
    push(routers.signIn);
    const result = errMsg || ServeError.SERVE_TOKEN_ERROR;
    Toast.showError(result);
    throw new Error(result);
  }
  // handle network timeout
  if (err.code === 'ECONNABORTED') {
    const errMsg = ServeError.TIMEOUT_ERROR;
    Toast.showError(errMsg);
    throw new Error(errMsg);
  }
  // handle network error
  if (err.message === 'Network Error') {
    const errMsg = ServeError.NETWORK_ERROR;
    Toast.showError(errMsg);
    throw new Error(errMsg);
  }
  throw new Error(errMsg || ServeError.SERVE_ERROR);
});

export default instance;

export function removeHandleAuth() {
  return { removeAuth: true };
}

export function removeHandleToken() {
  return { removeToken: true };
}
