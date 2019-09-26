import navMenuTpl from './tpl/nav_menu.tpl';
import navMenuItemTpl from './tpl/nav_menu_item.tpl';

import './index.scss';

import tools from '../../../../utils/tools';

class NavMenu {
  constructor () {
  	this.name = 'navMenu';
    this.tpl = navMenuTpl;
  }

  //返回一个dom节点的文本字符串
  appendMenuCards (data) {
    let list = '';

    data.forEach((item, index) => {
      if (index < 6) {
      	list += tools.tplReplace(navMenuItemTpl(), {
          id: item.id,
          field: item.field,
          pic: $.parseJSON(item.pics)[0][0][0],
          phone_name: item.phone_name,
          default_price: item.default_price,
          isFirst: index === 0 ? 'first' : '' //第一项的左边没有边框
      	});
      }
    });

    return list;
  }
}

export { NavMenu };