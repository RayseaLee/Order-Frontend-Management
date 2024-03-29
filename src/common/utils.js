/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-27 16:45:06
 * @FilePath: \vue-order-control\src\common\utils.js
 * @LastEditTime: 2022-04-11 15:00:57
 * @LastEditors: RayseaLee
 */
/**
 * 时间戳格式化
 * @param date
 * @param fmt
 * @returns {*}
 */
 export function formatDate(date, fmt) {
  // 1.获取年份

  // y+ -> 1个或者多个y

  // 2021
  // yy - 21
  // yyyy - 2021
  // y - 1
  // yyy - 021
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
