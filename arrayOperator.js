//原型push方法：返回push后数组的长度
var arr = [];
arr.push(1);
arr.push(2);
var myvar = arr.push(3);
console.log(myvar);//3
[].push.apply(arr,[4,5]);//实现concat()
console.log(arr);//[1,2,3,4,5]
var obj = {};
[].push.call(obj,1);
console.log(obj);//{'0':1,length:1} 向对象push元素时，会加入length属性

//原型pop方法：删除最后一个元素并返回这个元素
arr.pop();//5

//原型join,返回一个字符串，如果不加参数，默认以逗号分隔
arr.join('');//将arr转为字符串
[].join.call('hello','-');//'h-e-l-l-o'

//原型concat，返回一个数组
arr.concat(['1','2','3']);//连接字符串
arr.concat(1,2,3);//连接数字

//原型shift,删除一个第一个元素并返回该元素
arr.shift();

//原型slice，返回指定位置组成的新数组，原数组不变
var a = [1,2,3];
a.slice();//[1,2,3]
a.slice(0);//[1,2,3]
a.slice(1);//[2,3],默认是1到末尾
a.slice(1,2);//[2]
a.slice(-1);//[3],返回数组的最后一个元素
a.slice(4);//[]
a.slice(2,1);//[],一般情况第二个必须大于第一个数
a.slice(2,6);//[3]

function aa(){
    var aug = [].slice.call(arguments);//转化为真数组
}

//原型splice，切，删除某些元素并返回这些元素，会修改原数组
//arr.shift() === arr.splice(0,1)
arr.splice(1);//分为两个数组
arr.splice(3,2);//从第四个元素开始删除两个，删除第四个、第五个元素
arr.splice(3,2,'2','3','4');//后面为插入的数组
arr.splice(3,0,'a','b');//从数组的第3个位置插入'a','b'

//原型map,返回一个新数组
//原型forEach,没有返回值