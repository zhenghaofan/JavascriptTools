// usage:
// var p1 = new Promise(function(resolve, reject){
//   setTimeout(function(){
//     console.log('aaa');
//     resolve('p1 is resolved')
//   }, 3000);
//   console.log('bbb')
// });
//
// var p2 = new Promise(function(resolve, reject){
//   setTimeout(function(){
//     console.log('ccc');
//     resolve('p2 is resolved')
//   }, 3000);
//   console.log('ddd')
// });
//
// var p3 = p2.then(function(value){console.log('success'+value)});

function doResolve(resolver, onFulFilled, onRejected) { //保证只调用一次
  var done = false;
  try {
    resolver(function (value){
      if(done) return;
      done = true;
      onFulFilled(value)
    }, function (reason) {
      if(done) return;
      done = true;
      onRejected(reason);
    })
  } catch (e) {
    if (done) return;
    done = true;
    onRejected(e);
  }
}

function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
  return null;
}

function resolve(result) {
  try {
     var then = getThen(result);
     if(then) {
       doResolve(then.bind(result), this.resolve, this.reject);
       return;
     }
     fulfill(result);
  } catch (e) {
    reject(e);
  } finally {

  }
}

function fulfill(result) {
  this.state = 'fulfilled';
  this.value = result;
  handlers.forEach(this.handle);
  handlers = null;
}

function reject(error) {
  this.state = 'fulfilled';
  this.value = error;
  handlers.forEach(this.handle);
  handlers = null;
}

function handle(handler) {
  if (state === PENDING) {
     this.handlers.push(handler);
   } else {
     if (state === FULFILLED &&
       typeof handler.onFulfilled === 'function') {
       handler.onFulfilled(value);
     }
     if (state === REJECTED &&
       typeof handler.onRejected === 'function') {
       handler.onRejected(value);
     }
   }
}

function Promise(resolver) {
  this.status = 'pending',
  this.value = null;
  this.handlers = [];
  doResolve(resolver, resolve, reject);
}

Promise.prototype.done = function (onFulfilled, onRejected) {//done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误
  setTimeout(function () {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }, 0);
}

Promise.prototype.then = function (onFulfilled, onRejected) { // 传递的两个回调函数将传入Pormise的构造函数库中
  var self = this;
  return new Promise(function (resolve, reject) {
    return self.done(function (result) {
      if (typeof onFulfilled === 'function') {
        try {
          return resolve(onFulfilled(result));
        } catch (ex) {
          return reject(ex);
        }
      } else {
        return resolve(result);
      }
    }, function (error) {
      if (typeof onRejected === 'function') {
        try {
          return resolve(onRejected(error));
        } catch (ex) {
          return reject(ex);
        }
      } else {
        return reject(error);
      }
    });
  });
}
