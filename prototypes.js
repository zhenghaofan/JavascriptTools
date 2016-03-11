Array.prototypes:
  1.forEach(callback, [this])
    //usage: use this when in Objects
    // function Counter() {
    //   this.sum = 0;
    // }
    // Counter.prototype.add = function(arr) {
    //   arr.forEach(function(value) {
    //     this.sum += value;
    //   }, this);
    // };
    // new Counter.add([2,3,4])

    //implementation from MDN

    if(!Array.prototype.forEach) {

      Array.prototype.forEach = function(callback, thisArg) {

        var T,k;

        if (this == nul) {
          throw new TypeError(' this is null or not defined')
        }

        var O = Object(this); //Array instance, new Array()

        var len = O.length >>> 0; //Convert any JavaScript value to an unsigned 32bit integer.

        if (typeof callback !== 'function') {
          throw new TypeError(callback + 'is not a function')
        }

        if (arguments.length > 1) {
          T = thisArg; // save the 'this'
        }

        k = 0;

        while (k < len) {
          var kValue;

          if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
          }

          k++;
        }

        //return undefined
      };
    }

    //simple implementation
    Array.prototype.forEach = function (callback) {
      for (var i = 0; i < this.length; i++)
        callback.call(this, i, ...)
    }

    // if usage:
    // forEach(arr, function(value, index), context)

    //implementation

    var forEach = function (collection, callback, context) {
      if (Object.prototype.toString.call(collection) === '[object Object]') {
        for (var key in collection) {
          if (collection.hasOwnProperty(key)) {
            callback.call(context, collection, ...)
          }
        }
      } else {
        for (var i = 0; i < collection.length; i++) {
          callback.call(context, this, ...)
        }
      }
    }

    2.reduce(callback, [initialValue])
    //usage:
    //[0,1,2,3].reduce(function(previousValue, currentValue, index, array){
    //  return previousValue + currentValue
    //})

    //implementation from MDN
    if (!Array.prototype.reduce) {
      Array.prototype.reduce = function(callback, opt_init) {

        if (null === this || 'undefined' === typeof this) {
          throw new TypeError(
            'Array.prototype.reduce called on null or undefined');

          }
        if ('function' !== typeof callback) {
          throw new TypeError(callback + ' is not a function');
          }

        var index, value, length = this.length >>> 0, isValueSet = false;

        if (arguments.length > 1) {
          value = opt_init;
          isValueSet = true;
        }

        for(index = 0; index < length; index++) {
          if (this.hasOwnProperty(index)) {
            if (isValueSet) {
              value = callback(value, this[index], index, this);
            } else {
              value = this[index];
              isValueSet = true;
            }
          }
        }

        if (!isValueSet) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        return value;
      }
    }
