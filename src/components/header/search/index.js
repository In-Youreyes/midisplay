import tpl from './index.tpl';

import './index.scss';

import tools from '../../../utils/tools';

class Search {
	constructor () {
		this.name = 'search';
		this.tpl = tpl;
	}

	searchPhone (e) {
		const $searchForm = $('#J_searchForm'), //获取form的action拼接url
		      $searchInput = $('#J_keyword'); //input

		const action = $searchForm.prop('action'),
		      keyword = tools.trimSpaces($searchInput.val()),
		      keywordLen = keyword.length,
		      isList = window.location.href.includes('list.html');

		//搜索页搜索时在当前页打开
		if (isList && keywordLen > 0) {
			window.location.href = `${action}?keyword=${keyword}`; //当前页打开
			window.sessionStorage.removeItem('url'); //清除重定向url

		} else if (keywordLen > 0) {
			window.open(action + '?keyword=' + keyword); //添加页打开
		}
	}
}

export { Search };

/*
	window.open("index.html",'top'); 
		只是表示打开这个页面，并不是打开并刷新index.html
	window.location.href="index.html"; 
		表示重新定向到新页面，同时刷新打开的这个页面；

	window.open()是可以在一个网站上打开另外的一个网站的地址 
	而window.location()是只能在一个网站中打开本网站的网页
*/