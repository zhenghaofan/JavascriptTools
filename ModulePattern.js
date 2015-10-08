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

2.
//往模块中添加m3新方法，返回新的模块module1
var module1 = (function (mod){
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

3.var blogModule = (function (my) {
    var oldAddPhotoMethod = my.AddPhoto;

    my.AddPhoto = function () {
        // 重载方法，依然可通过oldAddPhotoMethod调用旧的方法
    };

    return my;
} (blogModule));

4.(function($, window, document) {

  function initialize() {
  }

  function dieCarouselDie() {
  }

  //attach to the global scope
  window.finalCarousel = {
    init : initialize,
    destroy : dieCouraselDie
  }

})( jQuery, window, document );

5.添加AMD/CMD支持：
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD. Register as an anonymous module.
        define( [ "jquery" ], factory );//依赖jquery生成的新模块
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {
    // 这里放模块代码
    return $.widget;
}));