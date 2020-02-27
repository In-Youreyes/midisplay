import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';

import './index.scss';

import tools from '../../../utils/tools';

class DetailPic {
	constructor () {
		this.name = 'detailPic';
	}

	tpl (phonePics, color) {
		let list = '',
		    picData = phonePics[color][color];

		picData.forEach((item, index) => {
			list += tools.tplReplace(itemTpl(), {
				pic_url: item,
				isCurrent: index === 0 ? 'current' : ''
			})
		})

		return tools.tplReplace(tpl(), {
			pic_item: list
		});
	}
}

export { DetailPic };