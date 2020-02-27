import { App } from './App';

import { Header } from '../components/header';
import { CartBoard } from '../components/cart_board';
import { Footer } from '../components/footer';

import tools from '../utils/tools';

class Cart extends App {
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

		// 购物车列表组件
		new CartBoard(this.$app).init();

		//底部组件
		new Footer(this.$app).init();

		$('body').prepend(this.$app);
	}
}

new Cart(jQuery);