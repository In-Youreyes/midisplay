import tpl from './index.tpl';

import './index.scss';

import tools from '../../../utils/tools';

class ContentItem {
	constructor () {
		this.name = 'contentItem';
	}

	tpl (content, price, current, index) {
		return tools.tplReplace(tpl(), {
			isCurrent: index === current ? 'current' : '',
			content,
			price: price ? price + '元' : ''
		});
	}

}

export { ContentItem };