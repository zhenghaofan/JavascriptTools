String.prototype.mysubstring=function(beginIndex,endIndex){
  var str=this,
    strArr=str.split("");
  if(!endIndex){
    endIndex=str.length;
  }
  return strArr.slice(beginIndex,endIndex).join("");
};