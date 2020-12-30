export const recursive = (arr, v) => {
  // 递归遍历多级数组
  if (Array.isArray(arr) && arr.length > 0) {
    var result = [];
    var res = [];
    // 遍历一维数组
    arr.forEach(item => {
      result.push(item[v]);
      if (item.children && item.children.length > 0) {
        res = res.concat(recursive(item.children, v));
      }
    });
    return result.concat(res);
  }
  // 递归遍历多级对象
}
