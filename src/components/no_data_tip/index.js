import tpl from './index.tpl';

import tools from '../../utils/tools';

import './index.scss';

class NoDataTip {
	constructor (el) {
		this.name = 'noDataTip';
		this.$el = el;
	}

	tpl (data) {
		return tools.tplReplace(tpl(), {
			noDataTip: data
		});
	}
}

export{ NoDataTip };