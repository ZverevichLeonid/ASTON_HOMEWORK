// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
// console.log("1");
// setTimeout(() => console.log("2"), 1);
// let promiseNew = new Promise((resolve) => {
//   console.log("3");
//   resolve();
// });
// promiseNew.then(() => console.log("4"));
// setTimeout(() => console.log("5"));
// console.log("6");
//////////////////////////////  в Node - 1,3,6,4,2,5 в консоли - 1,3,6,4,5,2. Объясните пожалуйста на лекции или в комментарии к pr.

// 2)
// let promiseTree = new Promise((resolve, reject) => {
//   resolve("a");
//   console.log("1");
//   setTimeout(() => {
//     console.log("2");
//   }, 0);
//   console.log("3");
// });
///////////////////////// 1 3 2
// 1,3 - синхронный код
// 2 - макротаска
// "a" - никуда не попадает

// 3)
// let promiseTwo = new Promise((resolve, reject) => {
//   resolve("a");
// });
// promiseTwo
//   .then((res) => {
//     return res + "b";
//   })
//   .then((res) => {
//     return res + "с";
//   })
//   .finally((res) => {
//     return res + "!!!!!!!";
//   })
//   .catch((res) => {
//     return res + "d";
//   })
//   .then((res) => {
//     console.log(res);
//   });
///////////////////////////// abc
// finally ничего не принимает и не возвращает
// catch не отработает

// 4)
// function doSmth() {
//   return Promise.resolve("123");
// }
// doSmth()
//   .then(function (a) {
//     console.log("1", a); // 1 123
//     return a;
//   })
//   .then(function (b) {
//     console.log("2", b); // 2 123
//     return Promise.reject("321");
//   })
//   .catch(function (err) {
//     console.log("3", err); // 3 321
//   })
//   .then(function (c) {
//     console.log("4", c); // 4 undefined (undefined потому что ничего не вернули в catch)
//     return c;
//   });
///////////////////////////
// 5)
// console.log("1");
// setTimeout(function () {
//   console.log("2");
// }, 0);
// Promise.resolve().then(() => console.log("3"));
// console.log("4");
//////////////////////////// 1 4 3 2
// 1,4 - синхронный код
// 3 - микротаска
// 2 - макротаска

//7)
// async function a() {
//   console.log("a");
// }

// console.log("1");

// (async function () {
//   console.log("f1");
//   await a();
//   console.log("f2");
// })();
// console.log("2");
////////////////////////////// 1 f1 a 2 f2
// 1, f1, 2 - синхронный код
// "a", f2 - микротаски ?

//8)
// console.log(1);

// setTimeout(() => console.log(2));

// async function func() {
//   console.log(3);

//   await new Promise((resolve) => {
//     console.log(4);
//     resolve();
//     console.log(5);
//   })
//     .then(() => console.log(6))
//     .then(() => console.log(7));

//   console.log(8);
// }

// setTimeout(() => console.log(9));

// func();

// console.log(10);

/////////////////////////////////// 1 3 4 5 10 6 7 8 2 9
// 1 3 4 5 10 - синхронный код
// 6 7 8 - микротаски
// 2 9 - макротаски

// 9)*
// function foo(callback) {
//   setTimeout(() => {
//     callback("A");
//   }, Math.random() * 1000);
// }
// function bar(callback) {
//   setTimeout(() => {
//     callback("B");
//   }, Math.random() * 1000);
// }
// function baz(callback) {
//   setTimeout(() => {
//     callback("C");
//   }, Math.random() * 1000);
// }

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))

// Моя реализация функции (надеюсь так в реальности никто не пишет)

// const wrapperFn = (callback) => {
//   return new Promise((resolve) => {
//     callback((result) => {
//       console.log(result);
//       resolve();
//     });
//   });
// };

// wrapperFn(foo)
//   .then(() => {
//     return wrapperFn(bar);
//   })
//   .then(() => {
//     return wrapperFn(baz);
//   });

///////////////
// // todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
// function resolveAfter2Seconds(x) {
//   console.log(`Какой Х пришёл -> ${x}`);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x); //
//     }, 5000);
//   });
// }

// async function add1(x) {
//   console.log("add1 Hello");
//   const a = await resolveAfter2Seconds(20);
//   const b = await resolveAfter2Seconds(30);
//   console.log("add1 Bye");
//   return x + a + b;
// }

// add1(10).then(console.log);

// add1 hello
// Какой Х пришёл -> 20
// Какой Х пришёл -> 30
// add1 bye
// 60
// Объясняю. Вызываем add1 с аргументом 10, далее по порядку синхронно отрабатывают console.log, в конце считаем результат.

// Переписанная версия на промисах

// function add1(x) {
//   console.log("add1 Hello");
//   return resolveAfter2Seconds(20).then((a) => {
//     return resolveAfter2Seconds(30).then((b) => {
//       console.log("add1 Bye");
//       return x + a + b;
//     });
//   });
// }

// function resolveAfter2Seconds(x) {
//   console.log(`Какой Х пришёл -> ${x}`);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x); //
//     }, 2000);
//   });
// }
// add1(10).then(console.log);
