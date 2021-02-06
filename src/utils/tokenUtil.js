/**
 * Created by towersxu on 16/5/6.
 * 获取用户认证信息
 *
 * @format
 */

const axios = window.axios // eslint-disable-line

let QueryString;
export default {
  getToken,
  getUrlToken
};
/**
 * 将URL中的参数变成对象,存储在QueryString中,如果有token,则将token返回.
 * @returns {*}
 */
function getUrlToken() {
  let QueryString = {};
  let search = window.location.search;
  if (search) {
    search = search.substring(1);
    let a = search.split('&');
    for (let i = 0; i < a.length; i++) {
      var as = a[i].split('=');
      if (as.length > 1) {
        QueryString[as[0]] = as[1];
      }
    }
  }
  return QueryString;
}

/**
 * 获取用户token,先拿url中的，然后再从微信中获取
 * isLogin: 登陆模式，这时只有host没有token
 */
function getToken(isLogin) {
  return new Promise((resolve, reject) => {
    QueryString = getUrlToken();
    if (QueryString.token) {
      // 如果有token,则该token存在url中或者微信获取后保存的
      window.sessionStorage.setItem('querystring', JSON.stringify(QueryString));
      resolve(QueryString);
    } else if (QueryString.host && isLogin) {
      window.sessionStorage.setItem('querystring', JSON.stringify(QueryString));
      resolve(QueryString);
    } else {
      // 如果URL上没有参数，从sessionStorage取初次进入app的参数。如果也没有，则表示是第一次进入app就没有带必要的参数
      let querystring = window.sessionStorage.getItem('querystring');
      try {
        querystring = JSON.parse(querystring);
        if (querystring && querystring.token) {
          resolve(querystring);
        } else {
          reject({
            msg: '访问地址缺少必要参数'
          });
        }
      } catch (e) {
        reject({
          msg: '访问地址缺少必要参数'
        });
      }
    }
  });
}
