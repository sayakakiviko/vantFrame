/** @format */
/*Vue全局指令*/
import Vue from 'vue';

/**
 * toast
 * @content {string} 内容
 * @type {number} 类型[1:success,2:warning,3:error]
 * @autoClose {boolean} 是否自动关闭
 */
Vue.prototype.$toast = function(content, type, time, autoClose, keepOther) {
  const fn = () => {
    Vue.prototype.$message({
      message: content || '出错了',
      center: true,
      duration: autoClose ? 0 : time || 2500,
      // showClose: autoClose || false,
      showClose: true,
      type: {
        1: 'success',
        2: 'warning',
        3: 'error'
      }[type || 1]
    });
  };
  /*if (!keepOther) {
    if (
      !document.querySelector('.el-message-box__wrapper') ||
      (document.querySelector('.el-message-box__wrapper') &&
        window.getComputedStyle(
          document.querySelector('.el-message-box__wrapper')
        ).display === 'none')
    ) {
      fn();
    }
  } else {*/
  fn();
  // }
};
/**
 * 时间戳返回年月日、月、日。示例：this.$timeFormat(时间戳)
 * @data {Number} 时间戳，单位为毫秒
 * @format {String} 时间格式，默认yyyy-MM-dd [完整格式：yyyy-MM-dd HH:mm:ss，默认yyyy-MM-dd]。HH是24小时制，hh为12小时制。也可以yyyy年MM月dd日
 */
Vue.prototype.$timeFormat = function(data, format) {
  format = format || 'yyyy-MM-dd';
  let week = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  let date = new Date(data);
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds(),
    'W+': week[date.getDay()]
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp('(' + k + ')').test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return format;
};
/** 禁止输入特殊字符 */
Vue.prototype.validForbid = function(value, number = 500) {
  /*value = value
    .replace(
      /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
      ''
    )
    .replace(/\s/g, '');*/
  // value = value.replace(/\*/g, '').replace(/\s/g, ''); //过滤掉*号和所有空格
  value = value.replace(/^\s|\*/g, ''); //过滤掉*号和开头空格
  if (value.length >= number) {
    Vue.prototype.$message({
      type: 'warning',
      message: `输入内容不能超过${number}个字符`
    });
  }
  return value;
};
/** 判断是什么类型的浏览器 */
Vue.prototype.$myBrowser = function() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'; //判断是否Firefox浏览器
  } else if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } else {
    return 'IE';
  }
};
/**
 * 判断浏览器是否为IE9
 * @return {Boolean} true为IE9-，false为IE10+
 */
Vue.prototype.$isIE9 = function() {
  var ua = navigator.userAgent,
    ver = 0,
    versiondata,
    versionbool;
  if (ua) {
    if (ua.match(/MSIE\s+([\d]+)\./i)) {
      ver = RegExp.$1;
    } else if (ua.match(/Trident.*rv\s*:\s*([\d]+)\./i)) {
      ver = RegExp.$1;
    }
  }
  versiondata = parseInt(ver);
  versionbool = versiondata <= 11 && versiondata !== 0;
  return versionbool;
};
/**
 * 防止输入法盖住输入框（兼容安卓）
 * 用法：<input @focus="$inputUp" />
 * */
Vue.prototype.$inputUp = function(e) {
  let u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  if (isAndroid) {
    //键盘调起需要时间延时处理
    setTimeout(() => {
      e.target.scrollIntoView(false); //scrollIntoView是H5的api
    }, 300);
  }
};
