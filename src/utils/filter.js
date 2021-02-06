/** @format */

import Vue from 'vue';
/* ---- 过滤器 ----*/
/**
 * 文件大小字节转单位显示
 * @timeStamp {number} 字节大小
 * @format {string} 格式[完整格式：1023 B,1023 KB,1023 MB]
 */
Vue.filter('formatByte', function(byte) {
  if (byte > 1024 * 1024 * 1024 * 1024) {
    return (byte / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
  } else if (byte > 1024 * 1024 * 1024) {
    return (byte / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  } else if (byte > 1024 * 1024) {
    return (byte / 1024 / 1024).toFixed(2) + ' MB';
  } else if (byte > 1024) {
    return (byte / 1024).toFixed(2) + ' KB';
  }
  return byte.toString() + ' B';
});
/**
 * 时间戳返回多久以前（刚刚/几秒前/几分钟前/几小时前/几天前/几周前/几个月前/几年前）
 * @timeStamp {Number} 时间戳，单位为毫秒
 */
Vue.filter('timeDiff', function(timeStamp) {
  //将字符串转换成时间格式
  let now = new Date(),
    oldTime = new Date(parseInt(timeStamp)),
    difference = now - oldTime,
    result = '',
    second = 1000,
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    halfamonth = day * 15,
    month = day * 30,
    year = month * 12,
    _year = difference / year,
    _month = difference / month,
    _week = difference / (7 * day),
    _day = difference / day,
    _hour = difference / hour,
    _min = difference / minute,
    _second = difference / second;

  if (_year >= 1) {
    result = parseInt(_year) + '年前';
  } else if (_month >= 1) {
    result = parseInt(_month) + '个月前';
  } else if (_week >= 1) {
    result = parseInt(_week) + '周前';
  } else if (_day >= 1) {
    result = parseInt(_day) + '天前';
  } else if (_hour >= 1) {
    result = parseInt(_hour) + '小时前';
  } else if (_min >= 1) {
    result = parseInt(_min) + '分钟前';
  } else if (_second > 5000) {
    result = parseInt(_second) + '秒前';
  } else {
    result = '刚刚';
  }
  return result;
});
/**
 * 时间戳转日期格式
 * @timeStamp {number} 时间戳
 * @format {string} 格式[完整格式：YYYY-MM-DD HH:mm:ss]
 */
Vue.filter('formatDate', function(timeStamp, format) {
  if (timeStamp) {
    format = format || 'YYYY-MM-DD';
    let week = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ];
    let date = new Date(parseInt(timeStamp));
    let o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S+': date.getMilliseconds(),
      'W+': week[date.getDay()]
    };

    if (/(Y+)/.test(format))
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (let k in o)
      if (new RegExp('(' + k + ')').test(format))
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return format;
  }
});
/**
 * desc: 超长字符截取
 * @timeStamp {string} 字符串,{number} 截取长度,{string} 截取后替换字符(默认…)
 * @format {string} 格式[这是一串示例文字…]
 */
Vue.filter('slice', function(data, num = 50, end = '…') {
  if (data && data.length > num) {
    if (end !== '…') {
      return data.slice(0, num);
    } else {
      return data.slice(0, num - end.length) + end;
    }
  } else {
    return data;
  }
});
