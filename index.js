/**
 * 使用 import { default as x } from 'x' 而是不是 import x from 'x'，
 * 是为了让当前版本 WebStorm 的可以正常的代码提示
 * TODO: 等待 WebStorm 支持 import x from 'x' 的代码提示
 */

import classNames from "classnames";
import datejs from "dayjs";
import $fetch from "./bom/fetch";
import debounce from "./func/debounce";
import throttle from "./func/throttle";

export default {
  classNames,
  datejs,
  $fetch,
  debounce,
  throttle,
};
