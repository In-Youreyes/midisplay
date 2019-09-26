// App入口函数

import { IndexModel } from '../models';

import '../scss/common.scss';

class App {
	constructor ($, options) {
		//App不需要实例化，子类调用super才会执行构造函数		
		this.$app = $('<div id="app"></div>'); //dom
		
		//配置项
		this.swiper = options.swiper;
		this.phone = options.phone;	
		this.field = options.field;	

		this.cache = null; //缓存池
		this.init(); //子类调用super才会执行
	}

	//初始化
	async init () {
		await this.getDatas(); //等待执行完毕
		this.render(); //再执行子类的render函数
	}

	//取数据
	// http://study.jsplusplus.com/Xiaomi/getDatas?swiper=true&phone=true&field=true
	async getDatas () {
		const indexModel = new IndexModel({
			swiper: this.swiper,
			phone: this.phone,
			field: this.field
		});

		//等待执行完毕
		await indexModel.getDatas().then(res => {
			this.cache = { //请求数据
				swiperDatas: res.swiper_data,
				phoneDatas: res.phone_data,
				fieldDatas: res.field_data
			}
		}).catch(err => {
			throw Error('404 not found');
		});
	}
}

module.exports = { App };