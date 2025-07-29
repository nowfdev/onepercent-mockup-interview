// --------------------------------- Closure -----------------------------------------------------

const { useInsertionEffect } = require("react");

// Exercise 1
function outer() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// Exercise 2
function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Exercise 3
function secretHolder(secret) {
  return {
    getSecret: function () {
      return secret;
    },
    setSecret: function (newSecret) {
      secret = newSecret;
    },
  };
}

const holder = secretHolder("initial");
console.log(holder.getSecret()); // inital
holder.setSecret("updated");
console.log(holder.getSecret()); // updated

// Exercise 4
function buildFunctions() {
  let funcs = [];

  for (var i = 0; i < 3; i++) {
    funcs.push(function () {
      console.log(i);
    });
  }

  return funcs;
}

const fs = buildFunctions();
fs[0](); // ['0']
fs[1](); // ['0','1']
fs[2](); // ['0','1','2']

// Exercise 5
function greeting(name) {
  return function (message) {
    return `${message}, ${name}!`;
  };
}

const greetJohn = greeting("John");
console.log(greetJohn("Hello")); // Hello, John
console.log(greetJohn("Good morning")); // Good morning, John

// --------------------------------- Promise -----------------------------------------------------
/* 
Exercise 1: Basic Promise
Create a function checkNumber(num) that returns a Promise.
If the number is greater than 10, resolve with "Valid number".
If not, reject with "Number too small".
*/

// Promise
function checkNumber(num) {
  return new Promise((resolve, reject) => {
    if (parseInt(num) > 10) {
      resolve("Valid number");
    } else {
      reject("Numb too small");
    }
  });
}

checkNumber(21)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

/* 
Exercise 2: Simulated API Call
Create a function getUserData(userId) that returns a Promise.
Simulate a 2-second delay using setTimeout.
After the delay, resolve with a user object: { id: userId, name: "John Doe" }.
*/

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "John Doe",
      });
    }, 2000);
  });
}
getUserData("naa81nc")
  .then((rs) => console.log(rs))
  .catch((error) => console.log(error));

/* 
Exercise 3: Chain Promises
Using .then() chaining, create three functions:
    stepOne() – resolves with "Step 1 done".
    stepTwo(prev) – accepts previous result and resolves with "Step 2 after: " + prev.
    stepThree(prev) – accepts previous result and resolves with "Step 3 after: " + prev.
Chain them together and log the final result.
*/

function stepOne() {
  return Promise.resolve("Step 1 done");
}

function stepTwo(prev) {
  return Promise.resolve("Step 2 after: " + prev);
}

function stepThree(prev) {
  return Promise.resolve("Step 3 after: " + prev);
}

stepOne()
  .then((result1) => stepTwo(result1))
  .then((result2) => stepThree(result2))
  .then((final) => console.log(final))
  .catch((error) => console.log(error));

/* 
Exercise 4: Chain Promises
Create a function called fetchData(success) that returns a Promise.
If success is true, resolve the Promise with the string "Data fetched".
If success is false, reject the Promise with the string "Failed to fetch".
Use .then() to handle the success case and .catch() to handle the failure case when calling the function.
*/

function fetchData(success) {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve("data feched");
    } else {
      reject("failed to fetch");
    }
  });
}

fetchData(true)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

/* 
Exercise 5: Chain Promises
const p1 = Promise.resolve("First");
const p2 = new Promise(resolve => setTimeout(() => resolve("Second"), 1000));
const p3 = Promise.resolve("Third");
Use Promise.all to run them in parallel and log the array of results once all promises have resolved.
*/

const p1 = Promise.resolve("First");
const p2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 1000));
const p3 = Promise.resolve("Third");

Promise.all([p1, p2, p3])
  .then((results) => console.log(results))
  .catch((error) => console.log(error));

/* 
Exercise 6: Chain Promises
Create a function randomFetch() that:
Returns a Promise.
Resolves with "Success!" if Math.random() > 0.5.
Rejects with "Failed!" otherwise.
Try calling it multiple times and log either result.
*/

function randomFetch() {
  let num = Math.random();
  console.log(`num: ${num}`);
  return new Promise((resolve, reject) => {
    if (num > 0.5) {
      resolve("Success!");
    } else {
      reject("Failed!");
    }
  });
}

randomFetch()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

/* 
Exercise 7:
Create a function fetchWithRetry(retries) that:
Calls randomFetch() from Bonus 1.
If it fails, retry up to retries times.
If it succeeds, log the success message.
If all retries fail, log "All attempts failed".
*/
function fetchWithRetry(retries) {
  return randomFetch()
    .then((result) => console.log(result))
    .catch((error) => {
      if (retries > 0) {
        console.log(`Retry. ${retries} left`);
        return fetchWithRetry(retries - 1);
      } else {
        console.log("All attempts failed");
      }
    });
}

/* 
Exercise 8:
You have three async tasks:
function task(name, delay) {
return new Promise(resolve => {
setTimeout(() => resolve(`${name} completed`), delay);
});
}

Use this to run:
task("A", 1000)
task("B", 500)
task("C", 1500)
Use Promise.all() to run them in parallel and log the results once all tasks finish.
*/

function task(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} completed`), delay);
  });
}

Promise.all([task("A", 1000), task("B", 500), task("C", 1500)])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// ------------------------------------- Async / Await -----------------------------------------------------
/* 
Exercise: Async/Await with Delayed Fetch
Create a function fetchDataWithDelay(data, delay) that:
Returns a Promise that resolves with the given data after delay milliseconds.
Create an async function processData() that:
Calls fetchDataWithDelay to get "Hello" after 1 second.
Calls fetchDataWithDelay again to get "World" after 1.5 seconds.
Logs both results concatenated as "Hello World".
Use try/catch to handle any errors.
*/

function fetchDataWithDelay(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

async function processData() {
  try {
    let stringResult = "";
    stringResult += await fetchDataWithDelay(data, delay);
    console.log(stringResult);
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------- Async / Await -----------------------------------------------------
// 🔹 1. Variable Hoisting - var vs let vs const
// console.log(a);
// var a = 10;

// console.log(b);
// let b = 20;

// console.log(c);
// const c = 30;
// Task: What will be the output? Explain the difference in how var, let, and const are hoisted.

// =>
// ✅ var → undefined
// ❌ let → TDZ → ReferenceError
// ❌ const → TDZ → ReferenceError

// 🔹 2. Function Hoisting
// greet();

// function greet() {
//   console.log("Hello!");
// }

// welcome();

// var welcome = function () {
//   console.log("Welcome!");
// };
// Task: Which functions will run? Which won’t? Why?

// =>
// Function greet() can be executed because its func declaration
// Function welcome() will return TypeError: welcome is not a function, this is func expression. var welcome hoisted but not assignment

// 🔹 3. Temporal Dead Zone (TDZ)/
// console.log(x);
// let x = 5;
// Task: Will this log undefined, throw an error, or something else? Why?

// => It will shown ReferrenceError. let is hoisted but in Temporary Dead Zone

// 🔹 4. Hoisting with Nested Functions
// function outer() {
//   console.log(inner());

//   function inner() {
//     return "I am inner";
//   }
// }
// outer();
// Task: Explain what happens when outer() is called. Is inner() hoisted inside outer()?

// => Print out "I am inner". because its function declaration

// 🔹 Question 5: Function Hoisting + var Behavior
// sayHi();

// function sayHi() {
//   console.log(message);
//   var message = "Hi there!";
// }

// ❓ Your Task:
//     What will this code output?
//     Explain how hoisting affects the variable message and the function sayHi.

// => Print out "undefined". Function sayHi still able to be executed but  variable message is hoisted but not there value. => Variable delecared but undefined

// 🔹 Question 6: Function Declarations Inside a Block
// if (true) {
//   function test() {
//     console.log("Tested!");
//   }
// }
// test();
// ❓ Your Task:

//     What will this code output?
// =>  In strict mode (which is the default in ES6 modules and most modern JS), this will actually throw a ReferenceError in many environments.
//     Will the function test() be available outside the if block?
// =>  In modern JavaScript (ES6+), function declarations inside blocks are block-scoped — similar to let and const. So outside the if block, test() is not accessible in strict mode.
//     Explain how function declarations inside blocks are treated in modern JavaScript (ES6+) compared to older versions (ES5).
// =>
//   | Feature                             | ES5 Behavior                     | ES6+ Behavior (Strict Mode)              |
// | ----------------------------------- | -------------------------------- | ---------------------------------------- |
// | Function declarations inside blocks | Hoisted to function/global scope | Scoped to the block (like `let`/`const`) |
// | `test()` available outside block?   | ✅ Yes                            | ❌ No (ReferenceError)                    |
// | Common output                       | `"Tested!"`                      | `ReferenceError: test is not defined`    |

// ------------------------------------- jQuery -----------------------------------------------------
// 📝 Exercise:

// Using jQuery, select all paragraphs with class .intro and then:
//     Change their text color to green.
//     Set their font size to 18px.
//     Add a CSS class called "highlighted".
//     Finally, make them fade out over 2 seconds.
// Write the jQuery code using method chaining to accomplish all the above in one statement.

// $(".intro")
// .css("color", "green")
// .css('font-size', "18px").
// .addClass(".highlighed")
// .fadeOut(2000)

// ------------------------------------- Practice w/ array, object -----------------------------------------------------
// 1. Sum of Numbers
// By using for loop
const calculate = () => {
  let total = 0;
  const nums = [1, 2, 3, 4, 5];
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }
  return total;
};
calculate();

// By using reduce
const nums = [1, 2, 3, 4, 5];
const result = nums.reduce((acc, curr) => {
  return acc + curr;
}, 0);

// 2. Filter Even Numbers
const nums = [1, 2, 3, 4, 5, 6];
const result = nums.filter((item) => item % 2 == 0);

// 3. Get Names from People
const people = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 25 },
  { name: "Eve", age: 19 },
];
// Return an array of names only
const result = people.map((item) => item.name);

// 4. Sort People by Age (Ascending)
const people = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 25 },
  { name: "Eve", age: 19 },
];
// Sort the array by age (youngest to oldest)
const result = people.sort((a, b) => a.age - b.age);

// 5. Group by Age
const people = [
  { name: "Tom", age: 17 },
  { name: "Anna", age: 21 },
  { name: "Jack", age: 17 },
];
// Output should group people by age
const groupedByAge = people.reduce((acc, person) => {
  if (!acc[person.age]) {
    acc[person.age] = [];
  }

  acc[person.age].push(person.name);

  return acc;
}, {});

// Test commit
