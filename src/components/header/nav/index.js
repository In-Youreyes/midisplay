//导航nav
import navTpl from './tpl/nav.tpl'; //外部
import navItemTpl from './tpl/nav_item.tpl';//内部item

import './index.scss';

import { NavMenu } from './nav_menu';//导入菜单

import tools from '../../../utils/tools';

class Nav {
	constructor () {
		this.name = 'headerNav';
		this.navMenu = new NavMenu();

		this.htmlCache = {}; //缓存ul > li
	}

	tpl (data) {
		let list = '';

		data.forEach((item) => { //渲染内部item
			list += tools.tplReplace(navItemTpl(), {
				field: item.field,
				seriesName: item.series_name
			});
		});

		return tools.tplReplace(navTpl(), { //渲染导航外部
			navItems: list, //将{{navItems}} 替换为 item的list
			navMenu: this.navMenu.tpl()
		})
	}

	//鼠标移入事件
	navMouseEnter (e) {
		const data = e.data, //使用jquery取出传入事件中的对象
		      phoneDatas = data.phoneDatas, //手机信息
		      oNav = data.oNav; //nav的实例

		const field = $(this).attr('data-field'); //获取nav-item上的data-field

		const $navMenu = $('.J_navMenu');//获取navMenu的ul
		
		//将获取的item内容html()到ul中 - 筛选对于手机
		const navMenuTpl = oNav.navMenu.appendMenuCards(phoneDatas.filter((item) => {
			return item.field === field; //过滤对应的li
		}));

		if (!oNav.htmlCache[field]) { //如果当前类别不存在，存入缓存池
			oNav.htmlCache[field] = oNav.navMenu.appendMenuCards(phoneDatas.filter((item) => {
				return item.field === field; //过滤对应的li
			}));	
		}

		$navMenu.html(oNav.htmlCache[field]); //从缓存池中取出li
		// console.log(phoneDatas);
	}
}

export { Nav };

/*
	nav导航结构

	<Nav>
		<NavItem></NavItem>
		<NavMenu>
			<NavMenuItem></NavMenuItem>
		</NavMenu>
	</Nav>
*/