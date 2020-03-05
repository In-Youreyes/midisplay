import tpl from './index.tpl';

import './index.scss';

import { DetailTitle } from './detail_title';
import { ContentItem } from './content_item';
import { DetailPic } from './detail_pic';

import tools from '../../utils/tools';

class DetailBoard {
	constructor (el, phoneData) {
		this.name = 'detailBoard';
		this.$el = el;

		this.detailTitle = new DetailTitle()
		this.contentItem = new ContentItem();
		this.detailPic = new DetailPic();
		this.phoneData = phoneData;

		//颜色版本的DOM
		this.$version = null;
		this.$color = null;
		//购物车DOM
		this.$addToCart = null;
		this.$purChase = null;
		//图片DOM
		this.$magImg = null;

		this.id = '';
		//颜色和版本的数据
		this.version = {};
		this.color = {};
		this.pics = {};
		this.name = {};
		//颜色版本的位置
		this.curV = 0;
		this.curC = 0;
		//当前图片
		this.picLen = 0;
		this.picNum = 0;

		//购物车和购买
		this.cartData = [];
		this.purchaseData = [];
	}

	async init () {
		await this.render();
		this.bindEvent();
	}

	async render () {
		const detailTitle = this.detailTitle,
		      contentItem = this.contentItem,
		      detailPic = this.detailPic,
		      phoneData = this.phoneData,
		      picData = $.parseJSON(phoneData.pics);

		this.id = phoneData.id;

		this.cartData = JSON.parse(localStorage.getItem('cartData')) || [];
		this.purchaseData = JSON.parse(localStorage.getItem('purchaseData')) || [];

		this.pics = picData;
		this.name = phoneData.phone_name;
		this.version = $.parseJSON(phoneData.version_info); //版本信息
		this.color = $.parseJSON(phoneData.color); //颜色数据

		this.picLen = picData[0][0].length; //每组图片数量

		//插入dom
		await this.$el.append(tools.tplReplace(tpl(), {
			detail_pic: detailPic.tpl(picData, this.curC),//[0][version][color]
			phone_name: phoneData.phone_name,
			slogan: phoneData.slogan,
			default_price: phoneData.default_price,
			title_1: detailTitle.tpl('手机版本'), //参数替换detailTitle中的{{title}}		
			versions: this.makeList(this.contentItem, this.version, 'version'), //版本信息
			title_2: detailTitle.tpl('手机颜色'),
			colors: this.makeList(this.contentItem, this.color, 'color') //颜色信息
		}));
	}

	bindEvent () {
		//点击选择版本和颜色
		const $container = $('.detail-board'),
		      $pic = $container.find('.pic'),
		      $magWrap = $pic.find('.mag'),
		      $magImg = $pic.find('.mag-img');

    this.$version = $container.find('.J_version');
    this.$color = $container.find('.J_color');
    this.$cart = $container.find('.J_btnGroup');

    this.$magImg = $magImg;

    //传参
		this.detailPic.init({
			$pic,
			$magWrap,
			$magImg,
			picX: $pic.offset().left,
			picY: $pic.offset().top,
			magW: $magWrap.width(),
			magH: $magWrap.height()
		});
    //点击图片
    $pic.on('click', { $pic }, $.proxy(this.picClick, this));
    //移入移出图片
    $pic.on('mouseenter', $.proxy(this.detailPic.picEnter, this.detailPic));

    $pic.on('mouseleave', $.proxy(this.detailPic.picOut, this.detailPic));
    //切换时在pic内移动
    $pic.on('mouseenter', '.detail-pic', $.proxy(this.detailPic.picChangeMove, this.detailPic));

		//点击选择版本
		this.$version.on('click', '.content-item','version', $.proxy(this.changeClick, this));
		// 点击选择颜色
		this.$color.on('click', '.content-item', 'color', $.proxy(this.changeClick, this));
		// 点击加入购物车/点击购买
		this.$cart.on('click', '.detail-btn', $.proxy(this.cartClick, this));
	}

	//点击切换图片
	picClick (e) {
		const tar = e.target,
		      className = tools.trimSpaces(tar.className),
		      $tar = $(tar),
		      dir = $tar.attr('data-dir'), //上下页属性
		      picItem = e.data.$pic.find('.detail-pic'); //图片组
		      
		this.changeNum(dir); //更改num
		this.changePic(picItem, this.picNum); //更换图片
	}

	//更改显示图片的num
	changeNum (dir) {
		switch (dir) {
			case 'next':
				if (this.picNum >= this.picLen - 1) { //最后一页
					this.picNum = 0;
				} else {
					this.picNum ++;
				}
				break;
			case 'prev':
				if (this.picNum <= 0) { //第一页
					this.picNum = this.picLen - 1;
				} else {
					this.picNum --;
				}
				break;
			default:
				break;
		}
	}

	//切换图片显示
	changePic (picItem, num) {
		let cur = this.curC;
		//详情图
		picItem.eq(num).addClass('current')
		   		 .siblings().removeClass('current');
		//放大镜图
		this.$magImg.attr("src", this.pics[cur][cur][num]);
	}

	//切换版本
	changeClick (e) {
		const tar = e.target,
		      $tar = $(tar),
		      cur = e.data;
		
		switch (cur) {
			case 'version':
				this.curV = $tar.index();
				break;
			case 'color':
				this.curC = $tar.index();
				break;
		}

		this.picNum = 0; //更换了图片，从第一张开始
		this.appendList();
	}

	//添加购物车/购买
	cartClick (e) {
		const tar = e.target,
		      $tar = $(tar),
		      field = $tar.attr('data-field'),
		      phone = this.storageCart() || {};

		let id = phone.id || '',
		    version = phone.version || '',
		    color = phone.color || '';

		switch (field) {
			case 'purchase':
				if (phone && this.hasGoods(this.purchaseData, id, version, color)) {	
					alert('该产品已购买');
					return ;
				}
				this.purchaseData.push(phone);
				localStorage.setItem('purchaseData', JSON.stringify(this.purchaseData));
				alert('已成功购买该产品');		
				window.location.href = './order.html'; //跳转order页
				break;

			case 'addToCart':
				if (phone && this.hasGoods(this.cartData, id, version, color)) {	
					alert('该产品已加入购物车');
					return ;
				}
				this.cartData.push(phone);
				localStorage.setItem('cartData', JSON.stringify(this.cartData));
				alert('已成功加入购物车');
				window.location.href = './cart.html'; //跳转cart页
				break;

			default:
				break;
		}
	}

	//颜色和版本list
	makeList (contentItem, phoneInfo, type) {
		let phoneList = "";

		switch (type) {
			case 'version':
				phoneInfo.forEach((item, index) => {
					phoneList += contentItem.tpl(item.version, item.price, null, this.name, this.curV, index);
				});
				break;
			case 'color':
				phoneInfo.forEach((item, index) => {
					phoneList += contentItem.tpl(item, null, this.pics[index][0], this.name, this.curC, index);
				});
				break;
			default: 
				break;
		}

		return phoneList;
	}

	//更改图片，颜色，版本
	appendList () {
		const $pic = $('.pic'),
		      picItem = $pic.find('.detail-pic');

		let versionList = '',
		    colorList = '';

		versionList = this.makeList(this.contentItem, this.version, 'version');
		colorList = this.makeList(this.contentItem, this.color, 'color');
		
		$pic.html(this.detailPic.tpl(this.pics, this.curC));
		
		this.$version.html(versionList);
		this.$color.html(colorList);
	}

	storageCart () {
		let dateTime = new Date().getTime();

		return {
			id: this.id,
			name: this.name,
			link: location.href,
			price: this.version[this.curV].price,
			version: this.version[this.curV].version,
			color: this.color[this.curC],
			img: this.pics[this.curC][this.curC][0],
			orderId: dateTime + tools.formatData(6),
			purchaseTime: Date.toLocaleString(dateTime)
		}
	}

	hasGoods (goods, id, version, color) {
		console.log(goods)
		return goods && goods.some((item, index) => {
			return item.id === id && 
						 item.version === version && 
						 item.color === color;
		});
	}
}

export { DetailBoard };

/*
	数据模型 - phoneData[curC][curC][0-4]
	phoneData = [{"0": [
			"https://i8.mifile.cn/a1/pms_1550572195.46364290.jpg",
			"https://i8.mifile.cn/a1/pms_1550572195.46137649.jpg",
			"https://i8.mifile.cn/a1/pms_1550572195.39145044.jpg",
			"https://i8.mifile.cn/a1/pms_1550572195.40115066.jpg"
		]},{"1": [
			"https://i8.mifile.cn/a1/pms_1550572212.22651454.jpg",
			"https://i8.mifile.cn/a1/pms_1550572208.13566321.jpg",
			"https://i8.mifile.cn/a1/pms_1550572205.86937593.jpg",
			"https://i8.mifile.cn/a1/pms_1550572214.68477714.jpg"
		]},{"2": [
			"https://i8.mifile.cn/a1/pms_1550572227.36038081.jpg",
			"https://i8.mifile.cn/a1/pms_1550572224.37041645.jpg",
			"https://i8.mifile.cn/a1/pms_1550572222.314258.jpg",
			"https://i8.mifile.cn/a1/pms_1550572229.34841308.jpg"
		]}
	]
*/
/*
id: "8"
name: "小米6X"
link: "http://xiaomi.jsplusplus.com/detail.html?id=8"
price: "999"
version: "6G+64G 移动4G"
color: "赤焰红"
img: "https://i8.mifile.cn/a1/pms_1524621225.83162698.jpg"
orderId: "1582689337192543149"
purchaseTime: "2020-02-26 11:55:37"

id: "8"
phone_name: "小米6X"
default_price: "999"
version_info: "[{"version":"6G+64G 移动4G","price":"999"},{"version":"6G+64G","price":"1049"}]"
color: "["赤焰红","曜石黑"]"
pics: "[{"0":["https://i8.mifile.cn/a1/pms_1524621225.83162698.jpg"]},{"1":["https://i8.mifile.cn/a1/pms_1524621222.66011593.jpg"]}]"

orderId
purchaseTime
*/