var domList = document.getElementsByTagName(‘input’)
var checkBoxList = [];
var len = domList.length;　　
//缓存到局部变量

while (len--) {　　
//使用while的效率会比for循环更高
	if(domList[len].type="checkbox"){
		checkBoxList.push(domList[len]);
	}
}