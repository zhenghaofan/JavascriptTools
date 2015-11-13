(function(window,document,undefined){
	var interval = 800;
	var closeDelay = 200;
	var index = 0;
	var couponlinks ; //优惠券链接
	var getCoupon = function(){
		if(index >= couponlinks.length){
			console.log("领取完毕");
			return;
		}
	
	var coponLink = couponlinks[index];
	coponLink.click();
	index++;
	console.log("领取第"+index+"张");
	setTimeout(getCoupon, inteval);
	setTimeout(function(,{
		var close = document.querySelector('.selector');
		if(close!= null) close.click();
	}, closeDelay);
	}
	
	var _scrollTop = 0;
	var _scrollStep = document.documentElement.clientHeight;//可见区域高度
	var _maxScrollTop = document.body.clientHeight - document.documentElement.clientHeight;
	var autoScrollDown = setInterval(function(){
		_scrollTop += _scrollStep;
		if(_scrollTop > _maxScrollTop){
			clearInterval(autoScrollDown);
			couponlinks = documentElement.querySelectorAll('.select');
			console.log("总共："+couponlinks.length+"条优惠券待领取");
			getCoupon();
		}else{
			document.body.scrollTop = _scrollTop;
		}
	},500);
})(window,document)