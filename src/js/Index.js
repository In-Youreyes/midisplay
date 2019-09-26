import { App } from './App';

import { Header } from '../components/header';
import { Carousel } from '../components/carousel';
import { BoardTitle } from '../components/board_title';
import { ShowBoard } from '../components/show_board';
import { Footer } from '../components/footer';

class Index extends App {
	constructor ($) {
		super($, {
			swiper: true,
			phone: true,
			field: true
		});
	}

	// App - render方法 
	render () {
		//头部组件
		new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init(); //传入el并执行Header.init()
		//轮播组件
		new Carousel(this.$app, this.cache.swiperDatas).init();
		//列表组件
		new BoardTitle(this.$app, '手机上新').init();
		new ShowBoard(this.$app, this.filterDatas('new')).init(); //new,valueable,recom
		new BoardTitle(this.$app, '超值手机').init();
		new ShowBoard(this.$app, this.filterDatas('valueable')).init();
		new BoardTitle(this.$app, '官方推荐').init();
		new ShowBoard(this.$app, this.filterDatas('recom')).init();
		//底部组件
		new Footer(this.$app).init();
		//注册组件
		$('body').prepend(this.$app);
	}

	filterDatas (field) {
		return this.cache.phoneDatas.filter((item, index) => {
			switch (field) {
				case 'recom':
					return item.recom == 1;
					break;
				case 'valueable':
					return item.recom == 1;
				case 'new':
					return item.most_value == 1;
				default:
					break;
			}
		});
	}
}

new Index(jQuery);