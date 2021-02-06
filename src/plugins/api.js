/** @format */

import axios from './axios';
import _pick from 'lodash/pick';
import _assign from 'lodash/assign';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';

import { assert } from '@/utils';
import { API_DEFAULT_CONFIG, AXIOS_DEFAULT_CONFIG } from '@/config';
import API_CONFIG from '@/api';
const Qs = require('qs');

// console.log(window.location);

/**
 * 生成api接口类
 */
class Api {
  constructor(options) {
    this.api = {};
    this.apiBuilder(options);
  }

  /**
   * 创建工程接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  apiBuilder({
    sep = '/',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = ''
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace]
      });
    });
  }

  /**
   * 创建单个接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  _apiSingleBuilder({
    namespace,
    sep = '/',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
    contentType
  }) {
    config.forEach(api => {
      const {
        name,
        desc,
        params,
        method,
        path,
        cache = true,
        contentType
      } = api;
      let apiname = `${namespace}${sep}${name}`; // 接口调用名称 this.$api['apiname']()
      let url = path; // 接口地址
      const baseURL = mock ? mockBaseURL : AXIOS_DEFAULT_CONFIG.baseURL; // 接口base地址

      debug && assert(name, `${url} :接口name属性不能为空`);
      debug &&
        assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`);

      Object.defineProperty(this.api, `${apiname}`, {
        value(outerParams, outerOptions) {
          // debugger;
          // let _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params));
          let _data = _isArray(outerParams) //|| outerParams instanceof FormData
            ? outerParams
            : _merge({}, params, outerParams);
          return axios(
            _normoalize(
              _assign(
                { url, desc, baseURL, method, cache, contentType },
                outerOptions
              ),
              _data
            )
          );
        }
      });
    });
  }
}

/**
 * 根据请求类型处理axios参数
 * @param options
 * @param data
 * @returns {*}
 * @private
 */
function _normoalize(options, data) {
  if (options.method === 'POST') {
    if (options.contentType === 'application/x-www-form-urlencoded') {
      options.data = Qs.stringify(data); //类似JSON.stringify效果但会去掉'和{}，并且参数之间用&连接
      options.headers = { 'Content-Type': options.contentType };
    } else {
      options.data = data;
    }
  } else if (options.method === 'GET' || options.method === 'DELETE') {
    options.params = data;
  }
  // if (options.method === 'POST' || options.method === 'PUT') {
  //   options.data = data;
  // } else if (options.method === 'GET') {
  //   options.params = data;
  // }
  return options;
}

/**
 * 导出接口
 */
export default new Api({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api'];
