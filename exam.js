var a = 1;
function test() {
  var a = 2;
  setTimeout(function () {
    console.log(a);
    a = 4;
  }, 1000);
  a = 3;
  setTimeout(function () {
    console.log(a);
    a = 5;
  }, 3000)
}
test();
console.log(a);
// 结果：1 3 4

var foo = 1;
function main() {
  console.log(foo);
  var foo = 2;
  console.log(this.foo);
  this.foo = 3
}
main();// undefined 1
new main();// undefined undefined

var b = 2;
function test() {
  var b = 3; //局部变量，函数退出时销毁
  console.log(b);
}
test();
console.log(b);
