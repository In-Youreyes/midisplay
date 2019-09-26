const API = {
	base_url: 'http://study.jsplusplus.com/Xiaomi/'
}

module.exports = { API };

/*

var export = module.exports;
module.exports = {
	default: ''
}

*/

//export用法
// export导出一个module.exports = {} 对象中需要设置导出值
// export default导出module.exports.default 导出default默认值

/******************************
  //1.export，导出export需要声明一个变量
  // 导出变量 a
    export var a = [];
    export var a = {};
    export var a = request;
  // 导函数 a
    export function a() {}; //声明 a函数
  //导出对象
    export { a, b, c }; //a: a

  //2.default默认导出
    export default function a() {}; // default = function() {}
    export default () => {}; // default = () => {}
    export default a = b; // default = b
    export default a; // default = a
    export default { a }; // default = { a }

******************************************/