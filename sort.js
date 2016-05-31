// 简单归并排序：
function merge(left, right) {
  var res = [];
  while(left.lenght > 0 && right.length > 0) {
    if(left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left).concat(right)
}
// 递归实现：
function mergeSort(items) {
  if (items.length == 1) {
    return items
  }
  var middle = Math.floor(items.length / 2),
  left = items.slice(0, middle),
  right = items.slice(middle);
  return merge(mergeSort(left), mergeSort(right))
}
// 循环实现：
function mergeSort(items) {
  if (items.length == 1) {
    return items
  }
  var work = [];
  for (var i = 0, len = items.length; i<len;i++) {
    work.push(items[i]);
  }
  work.push([]);
  for (var lim=len; lim > 1; lim = (lim+1)/2) {
    for (var j=0,k=0; k<lim; j++, k+=2) {
      work[j] = merge(work[k], work[k+1])
    }
    work[j] = []
  }
  return work[0]
}

// 快速排序：思路是选择一个基准值，将所有小于该元素的放左边，大于该元素的放右边；在排好的数组中递归这一过程
function qSort(items) {
  if (list.length === 0) {
    return [];
  }

  var leftArr = [], rightArr = [];
  var pivot = items[0];
  for( var i = 1; i<items.length; i++) {
    if (items[i] < pivot) {
      leftArr.push(items[i])
    } else {
      rightArr.push(items[i])
    }
  }
  return qSort(leftArr).concat(pivot, qSort(rightArr))
}

// 二分查找算法：
function binarySearch(items, data) {
  var begin = 0, end = items.length-1;
  while (begin <= end) {
    var mid = Math.floor((begin+end)/2);
    if(items[mid] < data) {
      begin = mid + 1;
    } else if (items[mid] > data) {
      end = mid - 1;
    } else {
      return mid
    }
  }
  return - 1
}
