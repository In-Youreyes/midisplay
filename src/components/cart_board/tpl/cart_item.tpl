<tr>
	<td>
		<input type="checkbox" class="checkbox" data-cartid="{{cartid}}" checked>
	</td>
	<td>
		<span>{{cartid}}</span>
	</td>
	<td>
		<a href="{{link}}" target="_blank">
			<img src="{{img}}" alt="{{name}}">
		</a>
	</td>
	<td>
		<a href="{{link}}" target="_blank">{{name}}</a>
	</td>
	<td>
		<span class="price">￥{{price}}</span>
	</td>
	<td>
		<span>{{version}}</span>
	</td>
	<td>
		<span>{{color}}</span>
	</td>
	<td>
		<button class="purchase-btn" data-cartid="{{cartid}}">结算</button>
	</td>
	<td>
		<a href="javascript:;" class="remove-btn" data-cartid={{cartid}}>删除</a>
	</td>
</tr>