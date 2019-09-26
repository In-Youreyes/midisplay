import tpl from './tpl/wrapper.tpl'; //外层tpl

import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';

import './index.scss';

import tools from '../../utils/tools';

class Carousel {
	constructor (el, data) {
		this.name = 'carousel';
		this.$el = el;

		//轮播图数据
		this.data = data;
		this.dataLen = this.data.length;
		this.curIndex = 0;
		this.delay = 3000;
		this.flag = true;
	}

	async init () {
		await this.render();
		this.autoPlay();
		this.bindEvent();
	}

	async render () {
		//替换模板
		await this.$el.append(tools.tplReplace(tpl(), {
			list: this.makeList(), //list模板
			control: controlTpl(), //直接替换
			indicatorW: 18 * this.dataLen, //style像素
			indicator: this.makeIndicators() //indicator模板
		}));

		this.$carousel = $('.J_carousel'); //轮播盒子
		this.$carItems = this.$carousel.find('.car-item'); //item
		this.$carIndicators = this.$carousel.find('.indicator-item'); //轮播图
	}

	bindEvent () {
		//监听点击
		this.$carousel.on('click', $.proxy(this.carouselClick, this))

		//监听移入移出
		this.$carousel.on('mouseenter', $.proxy(this.mouseInOut, this));	
		this.$carousel.on('mouseleave', $.proxy(this.mouseInOut, this));
	}

 	//自动轮播
	autoPlay () {
		clearTimeout(Carousel.timer); //清除 'mouseleave' 的定时器
		Carousel.timer = setTimeout(this.run.bind(this, 'next'), this.delay); //下一页
	}

	//轮播切换
	run (dir) {
		switch (dir) {
			case 'next':
				if (this.curIndex >= this.dataLen - 1) { //最后一页
					this.curIndex = 0;
				} else {
					this.curIndex ++;
				}
				break;
			case 'prev':
				if (this.curIndex <= 0) { //第一页
					this.curIndex = this.dataLen - 1;
				} else {
					this.curIndex --;
				}
				break;
			default:
				break;
		}

		this.fadeAction(this.curIndex); //轮播样式			

		Carousel.timer = setTimeout(this.run.bind(this, 'next'), this.delay); //定时轮播
	}

	//轮播样式
	fadeAction (index) {
		//图片淡入淡出 —— stop(true,true)(停止后续动画, 完成当前动画)
		this.$carItems.eq(index).fadeIn(800)
		              .siblings().fadeOut(800, this.fadeCallback.bind(this));

 		//样式类切换		              
		this.$carIndicators.eq(index).addClass('current')
		                   .siblings().removeClass('current');
	}

	//动画回调函数
	fadeCallback () {
		this.flag = true; 
	}


	//替换list模板 - 轮播图
	makeList () {
		let list = '';

		this.data.forEach((item, index) => {
			list += tools.tplReplace(itemTpl(), {
				id: item.phone_id,
				swiper_img: item.pic,
				alt: item.alt,
				isActive: index === 0 ? 'active' : '' 
			});
		});

		return list;
	}

	//替换indicator模板 - 小圆点
	makeIndicators () {
		let list = '',
		    len = this.dataLen;

		for (var i = 0; i < len; i++) {
			list += tools.tplReplace(indicatorTpl(), {
				isCurrent: i === 0 ? 'current' : ''
			});
		}

		return list;
	}

	//移入移出事件
	mouseInOut (e) {
		const eType = e.type;

		switch (eType) {
			case 'mouseenter':
				clearTimeout(Carousel.timer); //移入清除定时器
				break;
			case 'mouseleave':
				this.autoPlay(); //移出重新定时轮播
				break;
			default:
				break;
		}
	}

	//点击事件
	carouselClick (e) {
		
		if (!this.flag) return; //被锁直接结束调用
		this.flag = false; //点击上锁

		const tar = e.target, //目标对象
		      className = tools.trimSpaces(tar.className), //去空格
		      $tar = $(tar); //转jQuery对象
		  
		switch (className) {
			case 'indicator-item': //点击小圆点 item
				this.curIndex = $tar.index();
				this.fadeAction(this.curIndex);//淡入淡出
				break;

			case 'car-control': //点击上下页
				const dir = $tar.attr('data-dir');		
				clearTimeout(Carousel.timer);
				this.run(dir); //翻页
				break;

			default:
				break;
		}
	}
}

export { Carousel };

/*
	DOM结构图
	wrapper
		<item></item>  图片
		<indicator></indicator>  圆点
		<control></control>  上下页
	wrapper
*/