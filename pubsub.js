//思路：全局维护一个事件数组，订阅的时候push,取消订阅的时候splice,触发的时候调用这个事件函数
var PubSub = {};
// 用于储存事件队列
var queue = {};

// 订阅接口
PubSub.on = function(event, cb) {
  if (!queue[event]) {
    queue[event] = [];
  }
  queue[event].push(cb);
};

// 退订接口
PubSub.off = function(event, cb) {
  var currentEvent = queue[event];
  var len = 0;
  if (currentEvent) {
    len = currentEvent.length;
    for (var i = len - 1; i >= 0; i--) {
      if (currentEvent[i] === cb) {
        currentEvent.splice(i, 1);
      }
    }
  }
};

// 发布接口
PubSub.emit = function(event) {
  var currentEvent = queue[event];
  if (currentEvent) {
    for (var i = 0; i < currentEvent.length; i++) {
      currentEvent[i]();
    }
  }
};

//使用：
// 订阅
var callbackA = function () {
    console.log('event a happened');
};
PubSub.on('a', callbackA);
PubSub.on('b', function() {
    console.log('event b happened');
});

// 退订 , 第二个参赛传入回调函数的引用
PubSub.off('a', callbackA);

// 发布
PubSub.emit('a');
PubSub.emit('b');
