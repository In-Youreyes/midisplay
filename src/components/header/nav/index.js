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
		this.$nav = null;

		this.htmlCache = {}; //缓存ul > li

		this.posArr = [];
		this.isInMenu = false;
		this.isFirst = true;
		this.t = null;
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
			navItems: list,
			navMenu: this.navMenu.tpl()
		})
	}

	// 切换nav-item子菜单
	renderNavMenuTpl (phoneDatas, field, $tar) {
		const $navMenu = $('.J_navMenu');

		//将获取的item内容html()到ul中 - 筛选对于手机
		const navMenuTpl = this.navMenu.appendMenuCards(phoneDatas.filter((item) => {
			return item.field === field; //过滤对应的li
		}));
		
		//如果当前类别不存在，存入缓存池
		if (!this.htmlCache[field]) { 
			this.htmlCache[field] = this.navMenu.appendMenuCards(phoneDatas.filter((item) => {
				return item.field === field; //过滤对应的li
			}));	
		}

		//从缓存池中取出li
		$navMenu.html(this.htmlCache[field]);
		//高亮
		$tar.addClass('active').siblings().removeClass('active');
	}

	//鼠标移入/移出
	docMouseMove (isBind, e) {
		if (isBind) {
			$(document).on('mousemove', {ctx: this}, this.mouseMove);
		} else {
			this.$nav.find('.nav-item').removeClass('active');
			$(document).off('mousemove', this.mouseMove);
		}
	}

	//鼠标移动
	mouseMove (e) {
		let ctx = e.data.ctx,
		    count = 0;
		    
		if (count < 3) {
			ctx.posArr.push({
				x: e.pageX,
				y: e.pageY
			})
		}

		if (count >= 3) {
			ctx.posArr.shift();
		}
	}

	//鼠标移入item
	navItemEnter (e) {
		const data = e.data,
		      $tar = $(e.target);

		this.$nav = data.$nav;
		
		let field = $tar.attr('data-field'),
		    phoneDatas = data.phoneDatas,		      
		    posLen = this.posArr.length,
	      lastPos = this.posArr[posLen - 2] || {
	      	x: 0,
	      	y: 0
	      },
	      curPos = this.posArr[posLen - 1] || {
	      	x: 0,
	      	y: 0
	      },
	      toDelay = this.doTimeout(lastPos, curPos);
	  
		if (this.t) {
			clearTimeout(this.t);
		}

		//鼠标行为
		this.mouseBehavior(toDelay, phoneDatas, field, $tar);
	}

	//判断鼠标行为
	mouseBehavior (toDelay, phoneDatas, field, $tar) {
		if (!this.isFirst) {
			if (toDelay) {
				this.t = setTimeout(() => {
					if (this.isInMenu) {
						return ;
					}
					this.renderNavMenuTpl(phoneDatas, field, $tar);
				}, 300);
			} else {
				this.renderNavMenuTpl(phoneDatas, field, $tar);
			}
		//首次进入
		} else {
			this.renderNavMenuTpl(phoneDatas, field, $tar);
			this.isFirst = false;
		}
	}

	//移入/移出子菜单
	changeMenu (flag) {
		this.isInMenu = flag;
	}

	setClass (e) {
		$('nav-item').addClass
	}

	//计算坐标结果
	doTimeout (lastPos, curPos) {
		    //子菜单左上角
		let topLeft = {
		    	x: this.$nav.offset().left,
		    	y: this.$nav.offset().top + this.$nav.outerHeight()
		    },
		    //子菜单右上角
		    topRight = {
		    	x: this.$nav.offset().left + this.$nav.outerWidth(),
		    	y: this.$nav.offset().top + this.$nav.outerHeight()
		    };

		//判断点是否在三角形内
		return tools.pointInTriangle({
			lastPos,
			curPos,		
			topLeft,
			topRight
		})
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