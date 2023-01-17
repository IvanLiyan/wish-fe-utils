import { Jed } from "jed";
import cookie from "../bom/cookie";
import localStorage from "../bom/localStorage";
const defaultLocale = "zh";
let locale = defaultLocale;
let LocaleTranslations;
let jedi18n;
let localeKey = "locale";
const _getBrowserLocale = () => {
  if (typeof navigator === "undefined" || navigator.language == null) {
    return;
  }
  const browserLocale = navigator.language.slice(0, 2);
  return browserLocale;
};
function _getLocale() {
  if (typeof document == "undefined") {
    return;
  }
  return (
    // window[localeKey] ||
    localStorage.getItem(localeKey) ||
    cookie.get(localeKey) ||
    _getBrowserLocale() ||
    defaultLocale
  );
}
function _setLocale(locale) {
  // window[localeKey] = locale;
  localStorage.setItem(localeKey, locale);
  cookie.set(localeKey, locale);
}
// @ts-ignore
const createJedi18nInstance = (translations) => {
  LocaleTranslations = translations || LocaleTranslations;
  locale = _getLocale();
  const { [locale]: jedConfiguration = {} } = LocaleTranslations;
  if (Object.keys(jedConfiguration).length == 0) {
    return new Jed({});
  }
  // po2json inserts nulls inside the entries arrays so instead of
  // "My string": ["translation"], we get "My string": [null, "translation"]
  // Take out the nulls, before sending the object to Jed()
  const polishedJedConfiguration = { ...jedConfiguration };
  for (const string of Object.keys(polishedJedConfiguration.locale_data.wish)) {
    const translations = polishedJedConfiguration.locale_data.wish[string];
    if (Array.isArray(translations) && translations.length) {
      polishedJedConfiguration.locale_data.wish[string] = translations.filter(
        (_) => _ !== null
      );
    }
  }
  return new Jed(polishedJedConfiguration);
};
function _initJedi18nInstance(translations, key) {
  localeKey = key || localeKey;
  jedi18n = createJedi18nInstance(translations);
  window.addEventListener("changeLocale", () => {
    jedi18n = createJedi18nInstance();
  });
  // if (window.document) {
  //   let value = locale;
  //   Object.defineProperty(window, localeKey, {
  //     set: function (v) {
  //       value = v;
  //       jedi18n = createJedi18nInstance();
  //     },
  //     get: function () {
  //       return value;
  //     },
  //     configurable: true,
  //   });
  // }
}
function _changeLocale(locale) {
  _setLocale(locale);
  window.dispatchEvent(new Event("changeLocale"));
}
function _format(jedChain, args) {
  try {
    return jedChain.fetch(args);
  } catch (error) {
    // pass
  }
  const str = jedChain.fetch();
  let nonPositionalMatchCount = 0;
  function replacer(match, capturedNum) {
    let argIndex = 0;
    if (capturedNum !== undefined) {
      argIndex = capturedNum - 1;
    } else {
      argIndex = nonPositionalMatchCount;
      nonPositionalMatchCount++;
    }
    return args[argIndex] !== undefined ? args[argIndex] : "";
  }
  const sprintfPlaceholderRegex = /%(\d+)\$[ds]|%[ds]/g;
  const result = str.replace(sprintfPlaceholderRegex, replacer);
  const descPlaceholderRegex = /\{%(\d+)=[^{}]+\}/g;
  return result.replace(descPlaceholderRegex, replacer);
}
function _i18n(str, ...args) {
  let result = jedi18n.translate(str);
  result = _format(result, args);
  if (locale == "up") {
    result = result.toUpperCase();
  }
  return result;
}
function _ni18n(num, singular, plural, ...args) {
  const format_args = [num, ...args];
  let str = jedi18n.translate(singular).ifPlural(num, plural);
  str = _format(str, format_args);
  if (locale == "up") {
    str = str.toUpperCase();
  }
  return str;
}
function _ci18n(context, message, ...args) {
  context = context.toUpperCase();
  let result = jedi18n.translate(message).withContext(context);
  result = _format(result, args);
  if (locale == "up") {
    result = result.toUpperCase();
  }
  return result;
}
function _cni18n(context, num, singular, plural, ...args) {
  context = context.toUpperCase();
  const format_args = [num, ...args];
  let str = jedi18n
    .translate(singular)
    .ifPlural(num, plural)
    .withContext(context);
  str = _format(str, format_args);
  if (locale == "up") {
    str = str.toUpperCase();
  }
  return str;
}
const i18nModule = {
  i18n: _i18n,
  ci18n: _ci18n,
  ni18n: _ni18n,
  cni18n: _cni18n,
  initJedi18nInstance: _initJedi18nInstance,
  getLocale: _getLocale,
  changeLocale: _changeLocale,
};
export const i18n = _i18n;
export const ci18n = _ci18n;
export const ni18n = _ni18n;
export const cni18n = _cni18n;
export const getLocale = _getLocale;
export const changeLocale = _changeLocale;
export const initJedi18nInstance = _initJedi18nInstance;
export default i18nModule;
