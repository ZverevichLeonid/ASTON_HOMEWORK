var result = [];
for (let i = 0; i < 5; i++) {
  result[i] = function () {
    console.log(i);
  };
}
result[0]();
result[1]();
result[2]();
result[3]();
result[4]();

//////////////////////////////////////////////////

function getGroup() {
  let students = [];
  let i = 0;
  while (i < 10) {
    let j = i;
    students[j] = function () {
      console.log(j);
    };
    i++;
  }
  return students;
}

let group = getGroup();

group[0]();
group[5]();

//////////////////////////////////////////////////

// Напишите функцию multiply, должна принимать произвольное количество аргументов и возвращать их произведение.

function multiply(a) {
  let sum = a;
  function innerMultiply(b) {
    if (b == undefined) {
      return a;
    } else {
      sum = a * b;
      return multiply(sum);
    }
  }
  return innerMultiply;
}

const result1 = multiply(2)(3)(4)();
console.log(result1); // Вывод: 24
const result2 = multiply(2)(3)(4)(5)();
console.log(result2); // Вывод: 120

/////////////////////////
// Написать функцию getUniqArray(arr), которая на вход принимает массив чисел и
// возвращает массив уникальных чисел.
//     Если аргумент arr состоит не из чисел, тогда функция должна выбросить ошибку.
//     Текст ошибки: "В getUniqArray был передан невалидный параметр. Аргумент arr
// должен быть массивом чисел".

function getUniqArray(array) {
  let uniqNumbers = [];
  for (let number of array) {
    if (typeof number !== "number")
      throw new Error(
        "В getUniqArray был передан невалидный параметр. Аргумент arr должен быть массивом чисел"
      );
    if (!uniqNumbers.includes(number)) uniqNumbers.push(number);
  }
  return uniqNumbers;
}
console.log(getUniqArray([1, 1, 1, 5, 5]));
console.log(getUniqArray([1, 2, 2, 3, 4, 5]));
// console.log(getUniqArray([1, 2, 2, 3, 4, 5, "5"]));
// console.log(getUniqArray(["5", "2"]));
