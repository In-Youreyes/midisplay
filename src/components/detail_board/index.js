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


		//颜色和版本的数据
		this.version = {};
		this.color = {};
		//颜色版本的位置
		this.curV = 0;
		this.curC = 0;
		//当前图片
		this.picLen = 0;
		this.picNum = 0;
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

		this.version = $.parseJSON(phoneData.version_info); //版本信息
		this.color = $.parseJSON(phoneData.color); //颜色数据
	
		this.picLen = picData[0][0].length;; //每组图片数量

		//插入dom
		await this.$el.append(tools.tplReplace(tpl(), {
			detail_pic: detailPic.tpl(phoneData, this.curC),//[0][version][color]
			phone_name: phoneData.phone_name,
			slogan: phoneData.slogan,
			default_price: phoneData.default_price,
			title_1: detailTitle.tpl('手机版本'), //参数替换detailTitle中的{{title}}		
			versions: this.makeList(this.contentItem, this.version, this.color).versionList, //版本信息
			title_2: detailTitle.tpl('手机颜色'),
			colors: this.makeList(this.contentItem, this.version, this.color).colorList //颜色信息
		}));
	}

	bindEvent () {
		//点击选择版本和颜色
		const $container = $('.detail-board'),
		      $pic = $container.find('.pic');

    this.$version = $container.find('.content-wrapper:first'),
    this.$color = $container.find('.content-wrapper:last');

    //点击图片
    $pic.on('click', { $pic }, $.proxy(this.picClick, this));

		//点击选择版本
		this.$version.on('click', '.content-item', $.proxy(this.versionClick, this));
		// 点击选择颜色
		this.$color.on('click', '.content-item', $.proxy(this.colorClick, this));
	}

	//点击图片
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
		picItem.eq(num).addClass('current')
		   .siblings().removeClass('current')
	}

	//切换版本
	versionClick (e) {
		const tar = e.currentTarget,
		      $tar = $(tar);

		this.curV = $tar.index();
		this.appendList();
	}

	//切换颜色
	colorClick (e) {
		const tar = e.currentTarget,
		      $tar = $(tar),
		      pic = $();

		this.curC = $tar.index();
		this.picNum = 0; //更换了图片，从第一张开始
		this.appendList();
	}

	//颜色和版本list
	makeList (contentItem, version, color) {
		let versionList = '',
		    colorList = '';
		    
		version.forEach((item, index) => {
			versionList += contentItem.tpl(item.version, item.price, this.curV, index);
		});
		color.forEach((item, index) => {
			colorList += contentItem.tpl(item, null, this.curC, index);
		});

		return { versionList, colorList };
	}

	//更改图片，颜色，版本
	appendList () {
		const $pic = $('.pic'),
		      picItem = $pic.find('.detail-pic');

		const list = this.makeList(this.contentItem, this.version, this.color);

		$pic.html(this.detailPic.tpl(this.phoneData, this.curC));
		
		this.$version.html(list.versionList);
		this.$color.html(list.colorList);
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