//tools工具函数

//替换模板
// function tplReplace (target, tpl, replaceObj) {
// 	return target.prototype.tpl.replace(/{{(.*?)}}/g, (node, key) => {
// 		return replaceObj[key];
// 	});
// }
function tplReplace (tpl, replaceObj) {
	return tpl.replace(/{{(.*?)}}/g, (node, key) => {
		return replaceObj[key];
	});
}

//去空格
function trimSpaces (str) {
	return str.replace(/\s+/g, '');
}

//获取网址URL
// res数组匹配的结果
	// 第一项为正则表达式匹配的字符串
	// 第二项为'(^|&)'，第三项为([^&]*)，第四项为(&|$)，类推匹配元素
	// index为匹配位置的索引
	// input为源字符串
function getUrlQueryValue (key) {
	// (空开头 或者 &)  +  key=(非&)  +  (& 或者空结尾)
	const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'), //规则
	      res = window.location.search.substr(1).match(reg); //去除'？'，匹配数组

	return res != null ? decodeURIComponent(res[2]) : null; //返回匹配内容
}

//函数节流 addEvent(event, throttle(callback, delay))
function throttle (callback, delay) {
	var t = null, //计时器
	    begin = new Date().getTime(); //初始时间戳

	//throttle = function(){}
	return function () {
		var _self = this,
		    args = arguments,
		    cur = new Date().getTime(); //当前时间

		clearTimeout(t);

		if (cur - begin >= delay) {
			callback.apply(_self, args); //this = 绑定DOM
			begin = cur; //修改时间
		} else {
			t = setTimeout(function () {
				callback.apply(_self, args);
			}, delay);
		}
	}
}

function formatData (num) {
	var str = '';

	for (var i = 0; i < num; i++) {
		str += parseInt(Math.random() * 10);
	}
	
	return str;
}

module.exports = {
	tplReplace,
	trimSpaces,
	getUrlQueryValue,
	throttle,
	formatData
}