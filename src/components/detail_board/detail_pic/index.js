import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';

import './index.scss';

import tools from '../../../utils/tools';

class DetailPic {
	constructor () {
		this.name = 'detailPic';
		this.$magWrap = null;
		this.$magImg = null;
		this.$pic = null;

		//pic位置
		this.picX = 0;
		this.picY = 0;
		//mag宽高
		this.magW = 0;
		this.magH = 0;
	}

	tpl (phonePics, color) {
		let list = '',
		    picData = phonePics[color][color];

		picData.forEach((item, index) => {
			list += tools.tplReplace(itemTpl(), {
				pic_url: item,
				isCurrent: index === 0 ? 'current' : ''
			});
		})

		return tools.tplReplace(tpl(), {
			pic_item: list,
			pic: picData[0]
		});
	}

	//初始
	init (opt) {
		this.$magWrap = opt.$magWrap;
		this.$magImg = opt.$magImg;
		this.$pic = opt.$pic;

		this.picX = opt.picX;
		this.picY = opt.picY;
		this.magW = opt.magW;
		this.magH = opt.magH;	
	}

	//鼠标移入
	picEnter (e) {
		this.$magWrap.addClass('show');		
		this.showMag(this.getXY(e).X, this.getXY(e).Y);
		$(document).on('mousemove', {ctx: this}, this.mouseMove);
	}

	//切换直接移入时，没有触发pic的mouseenter事件
	picChangeMove (e) {
		this.$magWrap.addClass('show');
	}

	//鼠标移出
	picOut (e) {		
		this.$magWrap.removeClass('show');
		$(document).off('mousemove', this.mouseMove);
	}

	//移动
	mouseMove (e) {
		const ctx = e.data.ctx;
		ctx.showMag(ctx.getXY(e).X, ctx.getXY(e).Y, ctx.getXY(e).mouseX, ctx.getXY(e).mouseY);
	}

	//放大镜显示
	showMag (x, y, mouseX, mouseY) {
		this.$magWrap.css({
			left: x + 'px',
			top: y + 'px'
		});
		this.$magImg.css({
			left: -x + 'px',
			top: -y + 'px',
		});

		if ( mouseX && mouseY) {
			if (mouseX < 0 || mouseX > this.$pic.width()) {
				this.$magWrap.removeClass('show');
			}
			if (mouseY < 0 || mouseY > this.$pic.height()) {
				this.$magWrap.removeClass('show');
			}
		}
	}

	//获取坐标
	getXY (e) {
		return {
			X: e.pageX - this.picX - this.magW / 2,
			Y: e.pageY - this.picY - this.magH / 2,
			mouseX: e.pageX - this.picX,
			mouseY: e.pageY - this.picY
		}
	}
}

export { DetailPic };