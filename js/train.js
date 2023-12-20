let arr = [1, 2, 3, 5, 2];

//заменить двойку на тройку
//map
arr = arr.map((el) => {
  if (el === 2) {
    el = 3;
  }
  return el;
});
console.log(arr);
//for
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    arr[i] = 3;
  }
}
//for in или of
for (let item in arr) {
  if (arr[item] === 2) {
    arr[item] = 3;
  }
}
//forEach
arr.forEach((element, index) => {
  if (element === 2) {
    arr[index] = 3;
  }
});
//отфильтровать двойки
arr = arr.filter((i) => {
  return i !== 2;
});
//sort
arr.sort((a, b) => a - b);

//поменять на 'dog' если 'cat' используя условный оператор
let cat = "cat";

cat = cat === "cat" ? "dog" : cat;
