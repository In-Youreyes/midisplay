import boardTpl from './tpl/board.tpl';
import itemTpl from './tpl/item.tpl';

import './index.scss';

import { NoDataTip } from '../no_data_tip'; //关键字匹配为空模板

import tools from '../../utils/tools';

class ShowBoard {
	constructor (el, filterDatas) {
		this.name = 'showBoard';
		this.$el = el;

		this.filterDatas = filterDatas;

		this.noDataTip = new NoDataTip();
	}

	init () {
		this.render();
	}

	async render () {
		//将列表组件插入到DOM中
		await this.$el.append(tools.tplReplace(boardTpl(), {
			//渲染列表内容 - 过滤数据
			list: this.makeList(this.filterDatas) 
		}));
	}

	//列表内容
	makeList (data) {
		let list = '',
		    len = data.length;
		
		//搜索没有相关数据
		if (len === 0) {
			list = this.noDataTip.tpl('没有搜到相关数据');

		//搜索成功返回数据
		} else { 
			data.forEach((item, index) => {
				list += tools.tplReplace(itemTpl(), {
					isFirst: index % 5 === 0 ? 'first' : '',
					id: item.id,
					pic: $.parseJSON(item.pics)[0][0][0],
					phone_name: item.phone_name,
					slogan: item.slogan.substr(0, 20),
					default_price: item.default_price
				});
			});
		}

		return list;
	}
}

export { ShowBoard };