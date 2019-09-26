import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';

import './index.scss';

import tools from '../../utils/tools';
import { ShowBoard } from '../show_board'; //手机列表展示模板
import { NoDataTip } from '../no_data_tip'; //关键字匹配为空模板

class Tab {
	constructor (el, fieldDatas, phoneDatas) {
		this.name = 'tab';
		this.$el = el;

		this.fieldDatas = fieldDatas;
		this.phoneDatas = phoneDatas;
		this.cache = {};

		this.noDataTip = new NoDataTip();
	}

	async init () {
		await this.render();
		this.bindEvent();
	}

	async render () {

		await this.$el.append(tools.tplReplace(tpl(), {
			list: this.makeList()
		}));
	}

	bindEvent () {
		const $tab = $('.J_tab'),
		      $board = $('.J_board'), //container
		      $searchInput = $('#J_search'),
		      oShowBoard = new ShowBoard();		      

		//监听分类点击
		$tab.on('click', '.tab-item', { $board, oShowBoard }, $.proxy(this.tabClick, this));
		//监听输入
		$searchInput.on('input', { $board, oShowBoard, $tab }, tools.throttle($.proxy(this.inputSearch, this), 1000));
	}

	//tab分类点击
	tabClick (e) {
		const tar = e.target,
          $tar = $(tar),
		      tagName = tar.tagName.toLowerCase();

		const data = e.data,
		      $board = data.$board, // 获取数据列表外盒
		      oShowBoard = data.oShowBoard; // 获取oShowBoard

		if (tagName === 'a') { //获取分类的data-field
			const field = $tar.attr('data-field');

			this.tabChange($tar);//切换分类

			//重新渲染数据
			this.appendList(field, $board, oShowBoard);
		}
	}

	//监听输入变化
	inputSearch (e) {
		const tar = e.target,
		      $tar = $(tar),
		      value = tools.trimSpaces($tar.val()),
		      len = value.length;

		const data = e.data,
		      $tab = data.$tab,
		      $board = data.$board, //ShowBoard
		      oShowBoard = data.oShowBoard;

		this.tabChange($tab.find('.all'));//每次搜索回到全部分类

		//重新渲染数据
		if (len <= 0) {
			this.appendList('all', $board, oShowBoard); //输入为空
		} else {
			this.appendList('all', $board, oShowBoard, value);//输入keyword
		}
	}

	//改变分类标题
	tabChange ($tar) {
		$tar.parent().addClass('current')
				.siblings().removeClass('current');
	}

	//重新渲染 ShowBoard 组件中 container 里的匹配数据
	appendList (field, $board, oShowBoard, keyword) {
		
		//渲染关键字的内容
		if (keyword) {
			let data = this.filterDatas(this.phoneDatas, field, keyword),	//从field中过滤keyword
			    len = data.length;

			if (len === 0) { //没有匹配到keyword
				$board.html(this.noDataTip.tpl()); //空数据直接
			} else {
				$board.html(oShowBoard.makeList(data)); //keyword匹配数据
			}
		
		//渲染普通分类的内容
		} else { 
			if (!this.cache[field]) {
				this.cache[field] = oShowBoard.makeList(this.filterDatas(this.phoneDatas, field))
			}
			$board.html(this.cache[field]); //渲染tab分类
		}
	}

	//当前列表
	makeList () {
		let list = '';

		this.fieldDatas.forEach((item, index) => {
			list += tools.tplReplace(itemTpl(), {
				field: item.field,
				series_name: item.series_name
			});
		});

		return list;
	}

	//过滤关键字 - 标签语言和手机名
	filterDatas (data, field, keyword) {
		return data.filter((item, index) => {		

			//输入了关键字则查找关键字内容
			if (keyword) {
				const phone_name = item.phone_name.toLowerCase(),
				      slogan = item.slogan.toLowerCase();

				keyword = keyword.toLowerCase();
				return phone_name.includes(keyword) || slogan.includes(keyword);

			//没有输入查找默认分类
			} else {
				switch (field) {
					case 'all':
						return true
						break;
					default:
						return item.field === field;
						break;
				}
			}

		});
	}
}

export { Tab };