import tpl from './index.tpl';

import './index.scss';

import tools from '../../utils/tools';

class BoardTitle {
	constructor (el, data) {
		this.name = 'boardTitle';
		this.$el = el;
		
		this.$data = data;
	}

	init () {
		this.render();
	}

	render () {
		this.$el.append(tools.tplReplace(tpl(), {
			title: this.$data
		}));
	}
}

export { BoardTitle };