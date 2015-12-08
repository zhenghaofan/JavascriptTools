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

//2.sort()，性能较好
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

Array.prototype.unique1 = function()
{
    var n = []; //一个新的临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
};

Array.prototype.unique2 = function()
{
    var n = [this[0]]; //结果数组
    for(var i = 1; i < this.length; i++) //从第二项开始遍历
    {
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
        //那么表示第i项是重复的，忽略掉。否则存入结果数组
        if (this.indexOf(this[i]) == i) n.push(this[i]);
    }
    return n;
};

Array.prototype.unique3 = function()
{
    var n = {},r=[]; //n为hash表，r为临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        if (!n[this[i]]) //如果hash表中没有当前项
        {
            n[this[i]] = true; //存入hash表
            r.push(this[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
};


// 其中第1种和第2种方法都用到了数组的indexOf方法。此方法的目的是寻找存入参数在数组中第一次出现的位置。很显然，js引擎在实现这个方法的时候会遍历数组直到找到目标为止。所以此函数会浪费掉很多时间。

// 而第3中方法用的是hash表。把已经出现过的通过下标的形式存入一个object内。下标的引用要比用indexOf搜索数组快的多。

// 但是内存占用方面应该第二种方法比较多，因为多了一个hash表。这就是所谓的空间换时间。

// 2010年10月7日更新:

// 根据hpl大牛的思路，我写了第四种方法：

// 这个方法的思路是先把数组排序，然后比较相邻的两个值。 排序的时候用的JS原生的sort方法，JS引擎内部应该是用的快速排序吧。 最终测试的结果是此方法运行时间平均是第三种方法的三倍左右，不过比第一种和第二种方法快了不少。
Array.prototype.unique4 = function()
{
    this.sort();
    var re=[this[0]];
    for(var i = 1; i < this.length; i++)
    {
        if( this[i] !== re[re.length-1])
        {
            re.push(this[i]);
        }
    }
    return re;
};