# JavaScript

## Description

This note is based on Teacher Ally's Lecture 04 JavaScript framework, supplemented with content from W3School and MDN, aimed at assisting the 26th Full Stack video series, helping students build a basic learning framework.

## Table of Contents

- [JavaScript](#javascript)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [JavaScript Introduction](#javascript-introduction)
  - [Variables](#variables)
  - [JS Data Types](#js-data-types)
  - [Operators](#operators)
  - [Conditional Statements](#conditional-statements)
  - [Loops](#loops)
  - [Array Methods](#array-methods)
  - [Functions](#functions)

## JavaScript Introduction

History of JS

- JavaScript was developed by Brendan Eich in ten days. JavaScript was initially created to provide dynamic interaction capabilities in browsers. It has now become one of the most popular languages and is an important component of the Web.

ECMAScript Standard

- Later, ECMAScript standardized JavaScript, laying the foundation for its further development. Important versions such as ES6 (ECMAScript 2015) introduced many new features, such as arrow functions, template strings, destructuring assignment, etc., enhancing the language's expressiveness and development efficiency.

Modern JavaScript Frameworks and Libraries:

- As web applications have become more complex, many JavaScript frameworks and libraries have emerged, such as React, Angular, Vue, etc., to simplify and accelerate the web development process.

JavaScript Outside the Browser:

- With the emergence of Node.js, JavaScript began to be widely used in server-side applications. Node.js allows JavaScript to run on the server, making it a full-stack development language.

Single-threaded and Asynchronous Programming

- JavaScript is a single-threaded language, meaning it can only execute one task at a time. To handle asynchronous operations, JavaScript uses an Event Loop to handle callback functions, Promises, async/await, and other mechanisms to ensure non-blocking execution.

- Web API and Web Platform Development:
  As the Web platform continues to evolve, browsers provide rich Web APIs that allow developers to access device hardware, geolocation, media streams, and other features, driving innovation and diversity in Web applications.

Scripting Language

- No compilation is needed; the running process is interpreted and executed line by line by the JS interpreter.

Uses of JS

- Form validation, web effects, server-side development (Node.js), desktop applications (Electron), mobile apps (Cordova), IoT, game development, etc.

Components of JS

1. ECMAScript standard
2. DOM (Document Object Model)
   - Interface provided by the browser for manipulating the page
3. BOM (Browser Object Model)
   - For interaction with the browser

Where to Write JS Code/Files

1. Inline JS, written within HTML command lines.
   - Rarely used, poor readability, difficult to maintain

   ```html
   <input type="button" onclick="alert('Button clicked')" />
   ```

2. Embedded JS

   ```html
   <script>
     alert("Hello, World.");
   </script>
   ```

3. External JS files
   - Import external JS files, best practice: It makes JavaScript code maintainable separately, can be shared by multiple pages, and browsers can cache these files, improving page loading speed. This also follows best practices, especially important in large projects.

   ```html
   <script src="index.js"></script>
   ```

## Variables

Declaration and Assignment

- Variables need to be declared before use; the essence of declaration is to allocate memory space for variables. Common keywords for declaring variables are let, const, and var, which have some differences:
  ![var_let_const](./assets/images/var_let_const.jpg)
  - let: Has block scope, can be reassigned.
  - const: Has block scope, cannot be reassigned, suitable for constants.
  - var: Has function scope (no block scope), variable hoisting exists, can be repeatedly declared and reassigned, easily leads to global variable pollution.

  ```js
  // For example, a variable var declared inside a function is not defined outside the function
  function fun() { // function scope
  var num1 = 20;
  console.log('num1', num1) //-> num1 20
  }
  console.log('num1', num1) //-> Error

  if (true) {
     var a = 1;
  }
  console('a',a) //-> a,1
  //This shows that for var, if doesn't have block scope, variable a defined in if can be accessed outside if
  ```

  > let and const added block scope after ES6

  > Interviews might ask about the differences between var, let, and const
  > Normally you just need to understand them, but for interviews, you need to memorize each interview question based on your understanding
  > Use try catch to handle errors

Naming Conventions
![js_variable_naming_convention](./assets/images/js_variable_naming_convention.jpg)

- Variables, properties, functions, parameters cannot be named with keywords and reserved words
  ![js_keyword](./assets/images/js_keyword.jpg)
- Camel case is commonly used

## JS Data Types

> JS is a weakly typed language

Data Types

1. Primitive Data Types
    - Number, Boolean, String, Undefined, Null
      ![js_data_basic_type](./assets/images/js_data_basic_type.jpg)
2. Reference Data Types
    - Function, Array, Object
    - Stores address, not value

JS Type Conversion

- String + other types, the final result is always string type
  Dynamic data operation

```js
console.log("" + 12); //-> "12"
console.log("5" + 6); //-> "56"
```

- toString()
- String()
- parseInt() can convert strings to number type, resulting in integers

  ```js
  console.log(parseInt("3.14")); //-> 3
  console.log(parseInt("120px")); //-> 120
  console.log(parseInt("rem120px")); //-> NaN
  ```

- parseFloat() can convert strings to number type, resulting in decimals

  ```js
  console.log(parseFloat("3.14")); //-> 3.14
  console.log(parseFloat("120px")); //-> 120
  console.log(parseFloat("rem120px")); //-> NaN
  ```

- Number()
- Using -, *, / to convert strings to Number type

  ```js
  console.log("12" - 0); //-> 12
  console.log("123" - "120"); //-> 3
  console.log("123" * 1); //-> 123
  ```

- Boolean()

  ```js
  console.log(Boolean("")); //-> false
  console.log(Boolean("0")); //-> false
  console.log(Boolean("NaN")); //-> false
  console.log(Boolean("null")); //-> false
  console.log(Boolean("undefined")); //-> false
  console.log(Boolean("123")); //-> true
  console.log(Boolean("hello")); //-> true
  ```

## Operators

Determining Data Types

1. Using typeof to determine data type

   ![js_typeof](./assets/images/js_typeof.jpg)

2. Using instanceof to determine data type

   ![js_instanceif](./assets/images/js_instanceif.jpg)

3. Determining if something is an Array
   - Array.isArray()

     ```js
     // Array.isArray(parameter); Method added in H5, supported in IE9 and above
     console.log(Array.isArray(arr)); //-> true
     console.log(Array.isArray(obj)); //-> false
     ```

Arithmetic Operators

- `+`, `-`, `*`, `/`, `%`
- Cannot directly calculate with floating point numbers, there will be calculation errors
  - Solutions:
    1. First convert to integers, add, then convert back to decimals
    2. `toFixed(1);`

Increment and Decrement Operators

- Prefix increment operator ++a
  - Rule of thumb: Increment first, then return value

  ```js
  let a = 1;
  console.log(++a); //-> 2
  console.log(a); //-> 2
  ```

- Postfix increment operator a++
  - Rule of thumb: Return value first, then increment

  ```js
  let a = 1;
  console.log(a++); //-> 1
  console.log(a); //-> 2
  ```

Comparison Operators

![js_compare_1](./assets/images/js_compare_1.jpg)
![js_compare_2](./assets/images/js_compare_2.jpg)

- == and ===
  - Two equals is rarely used; in professional work, strict equality === is generally required

Logical Operators

- `&&`
  - `console.log(3 > 5 && 3 > 2);`
  - Returns true only if both are true
- `||`
  - `console.log(3 > 5 || 3 > 2);`
  - Returns true if at least one is true
- `!`
  - `console.log(!(3 > 5));`
  - Negation

Operator Precedence
![js_compare_priority](./assets/images/js_compare_priority.jpg)

Spread Operator `...`

1. copy array

   ```js
   let arr = [1, 2, 3];
   let arr2 = [...arr];
   ```

2. concatenating array

   ```js
   let arr = [1, 2, 3];
   let arr2 = [4, 5, 6];
   let arr3 = [...arr, ...arr2];
   ```

3. output

   ```js
   // Commonly used method in professional work
   let person = { name: "tom", age: 18 };
   let person2 = { ...person, name: "jack" };
   ```

   - Similar method: `person2 = Object.assign({}, person, { name: "jack" })`

Destructuring Assignment

- Destructuring assignment is a method in JavaScript that assigns values from arrays or objects to variables using a specific syntax. This allows for more concise extraction of data and assignment to variables.
- There are two main forms of destructuring assignment syntax: array destructuring assignment and object destructuring assignment.
- Strings can also use destructuring assignment
- Destructuring assignment can set default values

```js
// array
let numbers = [1, 2, 3, 4, 5];
let [a, b, ...rest] = numbers;

console.log(a); // Output: 1
console.log(b); // Output: 2
console.log(rest); // Output: [3, 4, 5]

// object
let person = { name: "John", age: 30, city: "New York" };
let { name, age, ...rest } = person;

console.log(name); // Output: John
console.log(age); // Output: 30
console.log(rest); // Output: { city: "New York" }

// string
let [a, b, ...rest] = "hello";

console.log(a); // Output: h
console.log(b); // Output: e
console.log(rest); // Output: ["l", "l", "o"]

// default values
let user = { name: "John", age: 30 };
let { name, age, gender = "male" } = user;

console.log(gender); // Output: "male"
```

Uses of Destructuring Assignment:

```js
// 1. Swapping variables
let num1 = 1;
let num2 = 2;
[num1, num2] = [num2, num1];
console.log(num1, num2); //-> 2 1

// 2. Returning multiple values from a function
// Return an array
function example() {
   return [1, 2, 3];
}

let [a, b, c] = example();
// Return an object
function example2() {
   return {
      sum1: 1,
      sum2: 2
   };
}

let { sum1, sum2 } = example2();
```

```js
function sum(first, ...args) {
  console.log(first); //-> 10
  console.log(args); //-> [20, 30]
}

sum(10, 20, 30);
```

## Conditional Statements

Using Conditional Statements to make code decisions

- `if else`
- `switch`
- Ternary expression
  - expression ? expression1 : expression2

## Loops

- `for` loop
- `while` loop

  ```js
  let sum = 0;
  let i = 1;
  while (i <= 100) {
    sum += i;
    i++;
  }
  ```

- `do...while`
  Using `break` and `continue` to control loop behavior
  - `continue`: Exit the current iteration, proceed to the next
  - `break`: Exit the entire loop

## Array Methods

- `push()`
- `shift()`
- `pop()`
- `unshift()`
  - Add a new element to the beginning of the array, returns the length of the new array
- `indexOf`
  - Returns the index of the first element that satisfies the condition, returns `-1` if not found
- `lastIndexOf`
  - Returns the index of the last element that satisfies the condition, returns `-1` if not found
- `forEach()`
  - Uses a callback function to operate on each element
- `filter()`
  - Does not change the original array, returns a new array that includes items that meet the condition
- `reduce`
  - The main purpose of this method is to execute a provided callback function on all elements of the array, reducing the array to a single value. This method is often used for accumulating, summing, finding maximum or minimum values, and performing various aggregation operations on array elements.

Iterating through objects

- `for in`

  ```js
  for (variable in object) {
  }
  ```

- `Object.keys(obj)`
  - Gets all the keys in an object and returns an array

  ```js
  Object.keys(obj).forEach((key) => {
    console.log(obj[key]);
  });
  ```

- `Object.values(obj)`
  - Gets all the values in an object and returns an array
- `Object.entries()`
  - Gets all key:value pairs in an object and returns an array

  ```js
  Object.entries(obj).forEach(([key, value]) => {
    console.log(value);
  });
  ```

> For methods, pay attention to whether the original array has changed and what is returned

> Some array methods consume a lot of resources; in professional work, try to avoid unnecessary use of resource-intensive methods  
> For example, `concat` consumes more than `push()`. If changing the original array is allowed, you can choose to change the original array  
> If the requirement is not to change the original array, then you can only make a copy

## Functions

Different ways to write functions and their differences:

- function declaration

```js
function fun(a, b){
   console.log(a, b)
}
```

- function expression

```js

const fun = function(a, b){
   console.log(a, b)
}

```

- arrow function

  ```js
  const fun = (a, b) => {
     console.log(a, b)
  }
  ```

  > If fewer arguments are passed than parameters, the missing arguments will be `undefined`

`return` statement

- Terminates the function, code after `return` will not be executed
- `return` can only return one value; if multiple values are written after return, the last one will be returned. `return a, b, c; //-> c`
- If no `return` is specified, the function returns `undefined`

Shallow Copy (when you don't want to change the original array, or for non-nested structures):

- Array
  - The simplest method is lodash's `_.clone` method
  - Spread Operator
  - `Array.from(arr)`
  - `arr.slice()`
- Object
  - Spread Operator
    > Commonly used in professional work
  - `Object.assign()`
    > Commonly used in professional work
- For nested structures, shallow copy only copies the first level. For deeper modifications, changes will still affect multiple arrays or objects, which is when you need to use deep copy

Deep Copy

- `JSON.parse(JSON.stringify(object))`
- The `cloneDeep` method from lodash package `_.cloneDeep`
  - The simplest approach
- `structuredClone()`
