<div class="cart-board J_cartBoard cover">
	<div class="container clearfix">
		<div class="cart-tb">
			<table>
				<tr>
					<th>选择</th>
					<th>商品号</th>
					<th>图片</th>
					<th>名称</th>
					<th>价格</th>
					<th>版本</th>
					<th>颜色</th>
					<th>结算</th>
					<th>删除</th>
				</tr>
				{{cartItem}}
			</table>
		</div>
		<div class="cart-bar">
			<button class="total-purchase-btn">结 算</button>
			<span class="J_totalPrice">￥<span class="total-price">{{price}}</span>.00</span>
		</div>
	</div>
</div>