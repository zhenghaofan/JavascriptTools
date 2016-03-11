函数替换：
function anotherLog() {
    return console.log.apply(console, arguments);
}

isArray:
if(typeof Array.isArray === "undefined"){
	Array.isArray = function(args) {
		return Object.prototype.toString.call(args)==="[object Array]";
	};
}

substring:
String.prototype.mysubstring = function(beginIndex,endIndex) {
  var str=this, strArr=str.split("");
  if(!endIndex){
    endIndex=str.length;
  }
  return strArr.slice(beginIndex,endIndex).join("");
};

uppercase:
// upper var msg = 'aa-bb-cc'
function combo(msg) {
    var arr = msg.split("-");
    for(var i = 1 ; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase()+arr[i].substr(1,arr[i].length-1);
    }
    msg = arr.join("");
    return msg;
}
