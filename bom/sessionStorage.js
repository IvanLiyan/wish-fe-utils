
let _ss = global.sessionStorage;

function isSupported() {
  try {
    _ss.setItem('~_~', '~');
    _ss.removeItem('~_~');
    return true;
  } catch (e) {
    return false;
  }
}

if (isSupported()) {
  // localStorage 要求方法被调用时的 this 必须是 localStorage 实例本身
  // IE8 中 getItem 等不是 function，不能 bind
  var getItem = name =>  _ss.getItem(name);
  var setItem = (name, value) => _ss.setItem(name, value);
  var removeItem = name => _ss.removeItem(name);
  var clear = () => _ss.clear();
  var size = () => _ss.length;
} else {
  // TODO: 用 cookie 实现
}

function getJson(key) {
  let value = getItem(key);
  return value && JSON.parse(value);
}
function setJson(key, value) {
  setItem(key, JSON.stringify(value));
}

export default {
  getItem, setItem, removeItem, clear, size,
  getJson, setJson, isSupported,
};
