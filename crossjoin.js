function crossJoin(arr) { //求二维数组的笛卡尔积
        for (var i = 0;i<arr.length;i++) {
            for (var j=0;j<arr[i].length;j++) {
                var item = arr[i][j];
                for(var k = i+1; k<arr.length; k++){
                    for (var m in arr[k])
                        console.log(item + ',' + arr[k][m])
                }
            }
        }
    }
