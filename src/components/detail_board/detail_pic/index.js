import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';

import './index.scss';

import tools from '../../../utils/tools';

class DetailPic {
	constructor () {
		this.name = 'detailPic';
	}

	tpl (phoneData, color) {
		let list = '',
		    picData = $.parseJSON(phoneData.pics)[color][color];

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