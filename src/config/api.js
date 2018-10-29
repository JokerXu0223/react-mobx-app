/**
 * @component api.js
 * @description API URL
 * @time 2018/5/2
 * @author JUSTIN XU
 */
const isDev = __DEV__;

export const BASE_URL = isDev ? 'http:/api.m.mtime.cn' : 'http:/api.m.mtime.cn';
