import tpl from './index.tpl';
import './index.scss';

import { Logo } from './logo';
import { Nav } from './nav';
import { Search } from './search';

import tools from '../../utils/tools';

class Header {
	constructor (el, fieldDatas, phoneDatas) {
		this.name = 'header';
		this.$el = el;

		this.fieldDatas = fieldDatas;
		this.phoneDatas = phoneDatas;

		this.logo = new Logo();
		this.nav = new Nav();
		this.search = new Search();
	}

	async init () {
		await this.render();
		//先渲染，再绑定事件
		this.bindEvent(); 
	}

	async render () {
		//将tpl中的 {{xxxx}} 替换成xxxx.tpl整个模板，再插入到el中
		await this.$el.append(tools.tplReplace(tpl(), {
			logo: this.logo.tpl(), //logo.tpl
			nav: this.nav.tpl(this.fieldDatas), //nav.tpl
			search: this.search.tpl() //search.tpl
		}));
	}

	bindEvent () {
		const $nav = $('.J_nav'), //获取nav
		      $searchBtn = $('.J_searchBtn'); //获取searchBtn

		//nav nav-item代理绑定事件
		$nav.on('mouseenter', '.nav-item',
			{ 
				//通过jquery传入到e.data中			
				phoneDatas: this.phoneDatas, //手机信息
				oNav: this.nav //nav实例
			},
			this.nav.navMouseEnter //nav实例函数
		);

		//search button绑定事件
		$searchBtn.on('click', this.search.searchPhone);
	}
}

export { Header };