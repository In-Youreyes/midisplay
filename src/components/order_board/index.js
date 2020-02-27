import tpl from './tpl/index.tpl';
import orderItemTpl from './tpl/order_item.tpl';
import './index.scss';

import { NoDataTip } from '../no_data_tip';

import tools from '../../utils/tools';

class OrderBoard {
	constructor (el,) {
		this.name = 'OrderBoard';
		this.$el = el;
		this.noDataTip = new NoDataTip();

		this.purchaseData = [];
	}

	async init () {
		await this.render();
	}

	render () {
		this.purchaseData = JSON.parse(localStorage.getItem('purchaseData')) || [];

		let purchaseData = this.purchaseData,
		    orderBoard = null;

		if (purchaseData.length <= 0) {
			orderBoard = this.noDataTip.tpl('您还没有任何订单信息');
		} else {
			orderBoard = tools.tplReplace(tpl(), {
				orderItem: this.renderOrderList(purchaseData)
			});	
		}

		this.$el.append(orderBoard);
	}

	renderOrderList (purchaseData) {
		let list = '';

		purchaseData.forEach((item, index) => {
			list += tools.tplReplace(orderItemTpl(), {
				cartid: item.orderId,
				link: item.link,
				img: item.img,
				name: item.name,
				price: item.price,
				version: item.version,
				color: item.color
			});
		});

		return list;
	}
}

export { OrderBoard };