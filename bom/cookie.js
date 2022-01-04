
export default {
  /**
   * 获取cookie的值
   *
   * @method get
   * @param a {String} cookie中得key
   * @param b [placeholder]
   * @return {String}
   */
  get: function (a, b) {
    const result = document['cookie'].match("(?:;|^)\\s*" + a + "\\s*=\\s*([^;]+)\\s*(?:;|$)");
    return result ? result[1] : b;
  },
  /**
   * 设置cookie的值
   *
   * @method set
   * @param a {String} key
   * @param b {String|Number} value
   * @param c {Date} expiration time(s)
   */
  set: function (a, b, c) {
    document['cookie'] = a + "=" + b + (c ? "; expires=" + (new Date(new Date().getTime() + c * 1000)).toGMTString() : "") + '; path=/';
  },
  /**
   * 删除cookie的值
   *
   * @method set
   * @param a {String} key
   */
  remove: function (a) {
    document['cookie'] = a + "=" + "; expires=" + new Date().toGMTString();
  }
};
