
var MyQueueFunc = function(){
	this.funArr = [];
}

MyQueueFunc.prototype.execute = function(){

	var executing = this.funArr[0];
	var callbacks = [].splice.call(arguments,1);
	executing.apply(this,callbacks[0]);
}


//循环实现
function MyQueueFunc() {
	this.cbs = [];
};

MyQueueFunc.prototype.push = function(cb) {
	if (typeof cb === "function") {
		this.cbs.push(cb);
		return;
	}

	throw new TypeError("cb is not a function!");
}

MyQueueFunc.prototype.execute = function() {
	var copy = Object.create(this.cbs),
		len  = this.cbs.length,
		i;

	for (i = 0; i < len - 1; i++) {
		copy[i] = copy[i].bind(null, copy[i + 1]); // 把下一个回调当成参数赋值给当前回调
	}

	// 执行
	copy[0]();
}

//实现
var queue = new MyQueueFunc();

var item1 = function (cb) {
	console.log('firstFun');
	if (typeof cb === "function") {
		cb();
	}
}
var item2 = function (cb) {
	console.log('secondFun');
	if (typeof cb === "function") {
		cb();
	}
}

queue.push(item1);
queue.push(item2);
queue.execute();


// 实现效果：
var queue = new MyQueueFunc();
var item1 = function (callback) {
	console.log('firstFun');
	callback();
}
var item2 = function (callback) {
	console.log('secondFun');
	callback();
}
queue.funArr.push(item1);
queue.funArr.push(item2);
queue.execute();