//不使用compose:
// function *random(next) {
//   if ('/random' == this.path) {
//     this.body = Math.floor(Math.random()*10);
//   } else {
//     yield next;
//   }
// };
//
// function *backwards(next) {
//   if ('/backwards' == this.path) {
//     this.body = 'sdrawkcab';
//   } else {
//     yield next;
//   }
// }
//
// function *pi(next) {
//   if ('/pi' == this.path) {
//     this.body = String(Math.PI);
//   } else {
//     yield next;
//   }
// }
//
// function *all(next) {
//   yield random.call(this, backwards.call(this, pi.call(this, next)));
// }
//
// app.use(all);

function compose(middleware){
  return function *(next){
    if (!next) next = noop();

    var i = middleware.length;

    while (i--) {
      next = middleware[i].call(this, next);
    }

    yield *next;
  }
}

function *noop(){}
