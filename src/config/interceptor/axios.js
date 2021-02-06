/** @format */

import axios from 'axios';
import cookie from '@/utils/cookie';
import router from '@/router';
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index';

const CancelToken = axios.CancelToken;
let CancelPromise = {};

/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export function requestSuccessFunc(req) {
  //添加时间戳，以防IE9下请求缓存
  req.method === 'get'
    ? (req.url += (req.url.indexOf('?') > 0 ? '&' : '?') + '_dt=' + Date.now())
    : null;
  // 设置token
  // if (cookie.get('token') && req.url.indexOf('cystorage') === -1) {
  if (cookie.getToken('token')) {
    req.headers.token = cookie.get('token'); //有token则添加到请求头里
  }

  if (CancelPromise[req.url]) {
    CancelPromise[req.url]();
  }

  req.cancelToken = new CancelToken(c => {
    CancelPromise[req.url] = c;
  });

  // CONSOLE_REQUEST_ENABLE &&
  //   console.info('requestInterceptorFunc', `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc(response) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // CONSOLE_RESPONSE_ENABLE && console.info('responseInterceptorFunc', response);
  if (response && response.data.code === 401) {
    cookie.remove('token');
    router.replace({ name: 'login' });
  } else {
    if (response.data.data && response.data.code === 200) {
      return response.data.data;
    } else if (response.data.code === 200) {
      // 仅有状态消息返回时
      return response.data.msg;
    } else if (response.data.md5) {
      return response.data;
    } else {
      // 异常处理
      if (response.config.responseType === 'arraybuffer') {
        return response.data;
      } else {
        console.log('warning', response.data.msg || response.data.message);
        return Promise.reject(response && response.data && response.data.msg);
      }
    }
  }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  //如果是取消，返回空
  if (resError.toString() == 'Cancel') {
    resError = '';
  }
  // 响应失败，可根据resError信息做监控处理
  return Promise.reject(resError);
}
