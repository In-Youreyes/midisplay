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
		      $searchBtn = $('.J_searchBtn'), //获取searchBtn
		      $navMenu = $nav.find('.J_navMenu');

		//nav nav-item代理绑定事件
		$nav.on('mouseenter', '.nav-item',
			{ 		
				phoneDatas: this.phoneDatas,
				$nav: $nav
			},
			this.nav.navItemEnter.bind(this.nav)
		);

		//整体移入/移出
		$nav.on('mouseenter', this.nav.docMouseMove.bind(this.nav, true));
		$nav.on('mouseleave', this.nav.docMouseMove.bind(this.nav, false));

		//子菜单移入/移出
		$navMenu.on('mouseenter', this.nav.changeMenu.bind(this.nav, true));
		$navMenu.on('mouseleave', this.nav.changeMenu.bind(this.nav, false));

		//search button绑定事件
		$searchBtn.on('click', this.search.searchPhone);
	}
}

export { Header };