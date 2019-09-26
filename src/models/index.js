// 数据模型

import { API } from '../utils/config';

class IndexModel {
	constructor (options) {
		this.url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`
	}

	getDatas () {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: API.base_url + this.url,
				type: 'get',
				dataType: 'JSONP',
				jsonp: 'cb',
				success (data) {
					resolve(data);
				},
				error (err) {
					reject(err);
				}
			});
		})
	}
}

module.exports = { IndexModel };