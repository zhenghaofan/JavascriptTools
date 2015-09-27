//1.indexOf()
function unique(arr){
	var result = [];
	for (var i = 0;i<arr.length;i++){
		if(result.indexOf(arr[i]==-1)){
			result.push(arr[i]);
		}
	}
	return result;
}

//2.sort()
function unique (arr) {
    arr.sort();
    var result=[arr[0]];
    for(var i = 1; i < arr.length; i++){
        if( arr[i] !== arr[i-1]) {
            result.push(arr[i]);
        }
    }
    return result;
}