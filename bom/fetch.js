function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

async function $fetch(url, params, config) {
  const { method = "POST", headers } = config;
  let body;
  if (method !== "GET") {
    body = JSON.stringify(params);
  }
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body,
  });
  return response.json();
}

/**
 * 自定义异常类型
 * @param {*} message 错误信息文案
 * @param {*} errorCode 错误代码
 * @param {*} data 其他数据
 */
function ApiError(obj) {
  var message = obj.message,
    errorCode = obj.code,
    data = _objectWithoutProperties(obj.data, ["msg", "message", "code"]);

  this.name = "ApiError";
  this.message = message || "网络错误，请联系管理员";
  this.errorCode = errorCode || null;
  this.data = data || null;
  this.stack = new Error().stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export { $fetch, ApiError };
