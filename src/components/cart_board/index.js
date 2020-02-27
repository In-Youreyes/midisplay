import tpl from './tpl/index.tpl';
import cartItemTpl from './tpl/cart_item.tpl';
import './index.scss';

import { NoDataTip } from '../no_data_tip';

import tools from '../../utils/tools';

class CartBoard {
	constructor (el) {
		this.name = 'CartBoard';
		this.$el = el;
		this.noDataTip = new NoDataTip();

		this.$checks = null;
		this.checked = true;

		this.cartData = [];
		this.payGoods = [];
		this.prices = [];
	}

	async init () {
		await this.render();
		this.bindEvent();
	}

	async render () {
		this.cartData = JSON.parse(localStorage.getItem('cartData')) || [];
		this.payGoods = JSON.parse(localStorage.getItem('purchaseData')) || [];

		let cartData = this.cartData,
		    cartBoard = null;

		cartBoard = this.renderCartBoard(cartData, cartBoard);

		await this.$el.append(cartBoard);
	}

	bindEvent () {
		const $cart = $('.J_cartBoard'),
		      $purChase = $cart.find('.total-purchase-btn'),
		      $purOne = $cart.find('.cart-tb');

		this.$checks = $cart.find('.checkbox');

		//选择按钮
		this.$checks.on('click', $.proxy(this.checkClick, this));
		//结算全部
		$purChase.on('click', $.proxy(this.payAllGoods, this));
		//单个结算
		$purOne.on('click', '.purchase-btn', $.proxy(this.payOneGoods, this))
		//单个删除
		$purOne.on('click', '.remove-btn', $.proxy(this.removeGoods, this))
		
	}

	//渲染cartboard
	renderCartBoard (cartData, cartBoard) {
		if (!cartData || cartData.length === 0) {
			return this.noDataTip.tpl('购物车空空如也');
		} else {
			return tools.tplReplace(tpl(), {
				cartItem: this.renderCartList(cartData),
				price: this.totalPrice(cartData)
			});
		}
	}

	//产品列表
	renderCartList (cartData) {
		let list = '';

		cartData.forEach((item, index) => {
			list += tools.tplReplace(cartItemTpl(), {
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

	//选择产品
	checkClick (e) {
		const tar = e.target,
		      $tar = $(tar),
		      $total = $('.J_totalPrice').find('.total-price');

		let total = this.totalPrice(this.cartData);
		$total.text(total);
	}

	//计算总价
	totalPrice (cartData) {
		let total = 0,
		    $checks = this.$checks;
		
		cartData.forEach((item, index) => {
			if (!$checks) {
				total += parseInt(item.price);
			} else if ($checks && $checks[index].checked) {
				total += parseInt(item.price);
			} 
		});

		return total;
	}

	//总体结算
	payAllGoods (e) {
		const tar = e.target,
		      $tar = $(tar),
		      $checks = this.$checks,
		      cartData = this.cartData;

		let payGoods = this.payGoods,
		    noPayGoods = [],
		    isSelected = false;

		cartData.forEach((item, index) => {
			if (this.$checks[index].checked) {
				isSelected = true;
				payGoods.push(item);
			} else {
				noPayGoods.push(item);
			}
		});

		this.orderGoods(payGoods,noPayGoods, isSelected, 'all');
	}

	//单个结算
	payOneGoods (e) {
		const tar = e.target,
		      $tar = $(tar),
		      cartid = $tar.attr('data-cartid'),
		      cartData = this.cartData;

		let payGoods = this.payGoods,
		    noPayGoods = [],
		    isSelected = false;

		cartData.forEach((item, index) => {
			if (item.orderId === cartid) {
				isSelected = true;
				payGoods.push(item);
			} else {
				noPayGoods.push(item);
			}
		});

		this.orderGoods(payGoods, noPayGoods, isSelected, 'one');
	}

	//生成订单
	orderGoods (payGoods, noPayGoods, isSelected, type) {
		switch (type) {
			case 'all': 
				if (!isSelected) {
					alert('请选择要结算的产品！');
					return ;
				} else {
					this.storageToOrder(payGoods, noPayGoods);
				}
				break;
			case 'one':
				if (isSelected) {
					this.storageToOrder(payGoods, noPayGoods);
				} else {
					alert('结算失败，请重试！');
					return ;
				}
				break;
			default:
				break;
		}
	}

	//保存并跳转
	storageToOrder (payGoods, noPayGoods) {
		localStorage.setItem('cartData', JSON.stringify(noPayGoods));
		localStorage.setItem('purchaseData', JSON.stringify(payGoods));
		window.location.href = './order.html';
	}

	//点击删除
	removeGoods (e) {
		const tar = e.target,
		      $tar = $(tar),
		      cartid = $tar.attr('data-cartid'),
		      cartData = this.cartData;
		
		let delCartData = [];

		delCartData = cartData.filter((item, index) => {
			return item.orderId === cartid ? false : true;
		});

		localStorage.setItem('cartData', JSON.stringify(delCartData));
		window.location.reload(); //刷新
	}
}

export { CartBoard };