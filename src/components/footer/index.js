import tpl from './index.tpl';

import './index.scss';

class Footer {
	constructor (el) {
		this.name = 'footer';
		this.$el = el;
		this.tpl = tpl;
	}

	init () {
		this.render();
	}

	render () {
		this.$el.append(tpl());
	}
}

export { Footer };