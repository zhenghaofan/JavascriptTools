if(typeof Array.isArray === "undefined"){
	Array.isArray = function(args){
		return Object.prototype.toString.call(args)==="[object Array]";
	};
}