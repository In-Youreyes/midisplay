import { App } from './App';

import { Header } from '../components/header';
import { ShowBoard} from '../components/show_board';
import { Footer } from '../components/footer';
import { Tab } from '../components/tab';

import tools from '../utils/tools';

class List extends App {
	constructor ($) {
		super($, {
			swiper: false,
			field: true,
			phone: true
		});
		
		this.keyword = tools.getUrlQueryValue('keyword');
	}

	async render() {

		//是否重定向url
		this.isRefreshUrl();


		const oTab = new Tab(this.$app, this.cache.fieldDatas, this.cache.phoneDatas);

		//头部组件
		new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init(); //传入el并执行Header.init()

		//tab组件
		oTab.init();
		//tab关联列表组件
		new ShowBoard(this.$app, oTab.filterDatas(this.cache.phoneDatas, 'all', this.keyword)).init();
		
		//底部组件
		new Footer(this.$app).init();

		//注册组件
		await $('body').prepend(this.$app);
		this.bindEvent();
	}

	bindEvent () {
		$(window).on('beforeunload', $.proxy(this.refreshLoad, this));
	}

	//重定向url
	isRefreshUrl () {
		const url = window.sessionStorage.getItem('url');

		//存有url则重定向到url
		if (url) {
			window.location.href = url
			window.sessionStorage.removeItem('url'); //删除重定向url
		}
	}

	//浏览器刷新
	refreshLoad () {	
		//浏览器刷新保存重定向url	
		window.sessionStorage.setItem('url', "list.html"); //保存重定向url
	}
}

new List(jQuery);