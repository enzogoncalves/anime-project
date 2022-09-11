let arr = {arr: [1,2,3,4,5,6,7,8,9,10]}
arr.arr = arr.arr.filter((item) => {
  return item != 2;
})
console.log(arr.arr)