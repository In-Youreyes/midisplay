import { App } from './App';

import { Header } from '../components/header';
import { OrderBoard } from '../components/order_board';
import { Footer } from '../components/footer';

import tools from '../utils/tools';

class Order extends App {
	constructor ($) {
		super($, {
			swiper: false,
			field: true,
			phone: true
		});
	}

	render () {
		//头部组件
		new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();

		//订单组件
		new OrderBoard(this.$app).init();

		//底部组件
		new Footer(this.$app).init();

		$('body').append(this.$app);
	}
}

new Order(jQuery);