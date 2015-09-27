1.var module1 = (function(){
　var _count = 0;
　var m1 = function(){
　  //...
　};
　var m2 = function(){
　　//...
　};
　return {
　　m1 : m1,
　　m2 : m2
　};
})();

module1.m1,module1.m2;

2.var module1 = (function (mod){
　mod.m3 = function () {
　　//...
　};
　return mod;
})(module1);
//或
var module1 = ( function (mod){
　//...
　return mod;
})(window.module1 || {});