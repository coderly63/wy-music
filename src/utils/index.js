//将数字型秒数转化为字符串类型的分钟加秒数---03:30
export function toMS(s) {
  let m;//分钟
  m = Math.floor(s / 60);
  m = m < 10 ? '0' + m : m + '';
  s = Math.floor(s % 60);
  s = s < 10 ? '0' + s : s + '';
  return m + ':' + s;
}


export function toSeconds(str) {
  let s = parseInt(parseInt(str[0]) * 10 + parseInt(str[1])) * 60;
  s += parseInt(parseInt(str[3]) * 10 + parseInt(str[4]));
  return s;
}

//防抖函数
export function debounce(func, delay = 200) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

//解析歌词函数
export function parseLyric(str) {
  let test = str.split("\n");
  test = test.slice(0, -1); //去除数组最后一个空字符串
  const reg = /\[(.*?)\]/gi;
  let result = [];
  for (let item of test) {
    let time = item.match(reg)[0];
    let t = time.slice(1, -1).split(":");
    time = parseInt(t[0]) * 60 + parseFloat(t[1]);
    let value = item.replace(reg, "");
    result.push({
      time,
      value,
    });
  }
  return result;
}