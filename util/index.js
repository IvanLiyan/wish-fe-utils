if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)) {
  callback(new Error("请输入正确的银行卡号"));
} else {
  callback();
}
