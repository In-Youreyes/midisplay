import tpl from './index.tpl';

import './index.scss';

class NoDataTip {
	constructor (el) {
		this.name = 'noDataTip';
		this.$el = el;

		this.tpl = tpl;
	}
}

export{ NoDataTip };