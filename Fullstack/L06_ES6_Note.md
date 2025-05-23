# JavaScript ES6

## Description

- These notes are compiled from Teacher Ally's Lecture 06 JS ES6 class content
- References:
  - ES6 comprehensive application in React project example: <https://codepen.io/Justin-hu/pen/dyBVaWV?editors=0010>
  - Craftsman Web Full Stack Front-end Knowledge Overview: <https://docs.google.com/spreadsheets/d/1jB3HThHu95NGC7YUCPkgzU5yUfKuU79S_wULg_AVeX4/edit?gid=0#gid=0>
  - Lecture Slides: <https://www.canva.com/design/DAGKiGT6X0I/tkeuhbXXFXY_XCXWtbGsig/view?utm_content=DAGKiGT6X0I&utm_campaign=designshare&utm_medium=link&utm_source=viewer>

## Table of Contents

- [JavaScript ES6](#javascript-es6)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [1. Java vs. JavaScript](#1-java-vs-javascript)
  - [2. Frontiers of Front-end Developers](#2-frontiers-of-front-end-developers)
  - [3. What is ES6](#3-what-is-es6)
  - [4. ES6 Basic Syntax Updates](#4-es6-basic-syntax-updates)
    - [4.1. `let`](#41-let)
    - [4.2. const](#42-const)
    - [4.3. Global Scope vs. Block Scope vs. Function Scope](#43-global-scope-vs-block-scope-vs-function-scope)
    - [4.4. Destructuring Assignment](#44-destructuring-assignment)
      - [4.4.1. **Array Destructuring**](#441-array-destructuring)
      - [4.4.2. **Object Destructuring**](#442-object-destructuring)
      - [4.4.3. **Default Values**](#443-default-values)
    - [4.5. **Default Parameters**](#45-default-parameters)
    - [4.6 **Rest/Spread Operator**](#46-restspread-operator)

## 1. Java vs. JavaScript

Java was developed by Sun Microsystems (now part of Oracle Corporation) and was initially released in 1995. It is an object-oriented programming language widely used for enterprise-level applications and large system development. **JavaScript was heavily influenced by Java**, initially developed by Netscape, aimed at adding interactivity to webpages, making them able to dynamically respond to user operations as a **scripting language**.

JavaScript:

- Borrowed basic syntax from the C language.
- Borrowed data types and memory management from Java.
- Borrowed from the Scheme language, elevating functions to the status of "first-class citizens."
- Borrowed from the Self language, using a prototype-based inheritance mechanism.

## 2. Frontiers of Front-end Developers

The following includes but is not limited to areas that front-end developers can engage in, which can serve as references for learning:

- Charts: [https://echarts.apache.org/examples/en/](https://echarts.apache.org/examples/en/)
- 3D Domain: [https://echarts.apache.org/examples/en/](https://echarts.apache.org/examples/en/)
- H5 Games: [https://oldj.net/static/html5-tower-defense/td.html](https://oldj.net/static/html5-tower-defense/td.html)

## 3. What is ES6

- ECMAScript 6 (ES6) was released in 2015. It introduced many new syntax features, standard libraries, and improvements to enhance developer productivity and code maintainability. Current mainstream browsers are fully compatible with ES6. Some important features introduced by ES6 include arrow functions, template strings, destructuring assignment, classes, variable declaration methods like let and const, and improvements in asynchronous programming such as Promises.

- ES6 compatibility checking tool: Can I Use [https://caniuse.com/](https://caniuse.com/)

## 4. ES6 Basic Syntax Updates

### 4.1. `let`

`let` is a keyword used in JavaScript for declaring variables. It introduces the concept of block scope and solves some problems that exist when declaring variables with `var`.

1. **Block Scope**: Variables declared with `let` are only valid within the current code block (inside the curly braces {}), and cannot be accessed outside of that code block. This means that variables declared with `let` in loops, conditional statements, or functions are only effective within their block scope.

```js
function example() {
  let x = 10;
  if (true) {
    let y = 20;
    console.log(x); // Can access x
    console.log(y); // Can access y
  }
  console.log(x); // Can access x
  console.log(y); // Error: y is not defined
}
```

2. **No Variable Hoisting**: Unlike `var`, variables declared with `let` are not hoisted (hoisting), and they are not available before they are defined. Accessing a variable declared with `let` before its declaration will result in a ReferenceError.

```js
console.log(x); // Error: Cannot access 'x' before initialization
let x = 10;
```

3. **No Duplicate Declarations**: In the same scope, using `let` to repeatedly declare the same variable will result in a SyntaxError.

```js
// Example
let userName = "My Name";
console.log(userName);

let userName = "another name";
// Error: 'userName' is already defined
```

4. **Suitable for Loop Variables**: Variables declared with `let` in loops create a new independent variable in each iteration, solving the closure problems that may be caused by using `var` in loops.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // Outputs 0, 1, 2
  }, 1000);
}
```

> The teacher recommends always using `let` instead of `var` when declaring variables, but you still need to understand the characteristics of `var`.

### 4.2. const

`const` is a keyword used in JavaScript for declaring constants. It declares variables as constants, meaning they cannot be modified once assigned.

1. **Immutability**: Once a constant is declared and assigned using `const`, it cannot be reassigned. Any attempt to reassign will result in a SyntaxError.

```js
// Example
const PI = 3.1415926; // Declare and immediately assign value, cannot be changed after declaration
PI = 3.16; // SyntaxError: "PI" is read-only
```

2. **Block Scope**: Similar to `let`, constants declared with `const` also have block scope, only valid within the current code block.

```js
if (true) {
  const MAX_VALUE = 100;
  console.log(MAX_VALUE); // Can access MAX_VALUE
}
console.log(MAX_VALUE); // Error: MAX_VALUE is not defined
```

3. **No Variable Hoisting**: Constants declared with `const` also do not undergo variable hoisting and must be used after declaration.

```js
console.log(PI); // Error: Cannot access 'PI' before initialization
const PI = 3.14;
```

4. **No Duplicate Declarations**: Similar to `let`, it is not allowed to repeatedly declare the same constant in the same scope.

```js
const PI = 3.14;
const PI = 3.14159; // Error: Identifier 'PI' has already been declared
```

5. **Object Properties are Mutable**: Constants declared with `const` point to a memory address, which means the constant itself cannot be modified, but if the constant is an object (arrays are also objects), the properties of the object can be modified.

```js
// Example 1:
const arr = [1, 2, 3, 4];
arr[0] = 10;
console.log(arr);
// [10, 2, 3, 4]

// Example 2:
const userInfo = {
  userName: "Desert",
  age: 18,
};
userInfo.userName = "Damo";
console.log(userInfo);
// {userName: 'Damo', age: 18}
```

### 4.3. Global Scope vs. Block Scope vs. Function Scope

Global scope, block scope, and function scope are different types of scopes in JavaScript that determine the visibility and access range of variables in code.

1. **Global Scope**:

- Global scope is the outermost scope of the entire JavaScript program. Variables and functions defined outside of any function belong to the global scope.
- Variables and functions declared in the global scope can be accessed by any code in the program, and they exist throughout the entire script's lifecycle.
- Global scope can be defined by variables and functions declared using var, let, or const keywords.

2. **Block Scope**:

- Block scope refers to the scope formed by a pair of curly braces {}.
- Variables declared in block scope are only visible within that code block and cannot be accessed outside of that block.
- Before ES6 (ECMAScript 2015), JavaScript did not have block scope, but block scope was introduced through the let and const keywords.
- Variables declared with let or const have block scope, while variables declared with var can be accessed outside of the block scope.

3. **Function Scope**:

- Function scope refers to the scope determined by the declaration position of a function, typically inside a function.
- Variables declared inside a function can only be accessed within that function, while variables declared outside the function cannot be accessed inside the function.
- Functions in JavaScript are closures with their own scope. The inside of a function can access variables from the outer scope, but the outer scope cannot access variables inside the function, except through return values or closures.

### 4.4. Destructuring Assignment

Destructuring assignment is a method in JavaScript to extract data from arrays or objects and assign them to variables. It makes it easier to access and use values in arrays and objects. Destructuring assignment is also a form of syntactic sugar.

#### 4.4.1. **Array Destructuring**

```js
// Define an array
const colors = ["red", "green", "blue"];

// Use destructuring assignment to get values from the array
const [firstColor, secondColor, thirdColor] = colors;

console.log(firstColor); // Outputs 'red'
console.log(secondColor); // Outputs 'green'
console.log(thirdColor); // Outputs 'blue'
```

> If there are more elements in the array than variables in the destructuring, the extra elements will be ignored. If there are more variables in the destructuring than elements in the array, the unmatched variables will be assigned undefined.

```js
const colors = ["red", "green", "blue"];

const [firstColor, secondColor] = colors;

console.log(firstColor); // Outputs 'red'
console.log(secondColor); // Outputs 'green'
```

> Array destructuring can also be combined with rest parameters, as well as nested array destructuring

```js
// Define an array
const numbers = [1, 2, 3, 4, 5];

// Destructure the first two numbers to variables, put the remaining numbers in a new array
const [first, second, ...rest] = numbers;

console.log(first); // Output: 1
console.log(second); // Output: 2
console.log(rest); // Output: [3, 4, 5]

// Define a nested array
const matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// Destructure the nested array
const [[a, b], [c, d], [e, f]] = matrix;

console.log(a, b); // Output: 1 2
console.log(c, d); // Output: 3 4
console.log(e, f); // Output: 5 6
```

> Variable swapping

```js
const [i, j] = [1, 2];
[i, j] = [j, i];
console.log(i); // 2
console.log(j); // 1
```

> Function return values

```js
function getData() {
  return [111, 222];
}

const [x, y] = getData();
console.log(x); // 111
console.log(y); // 222
```

#### 4.4.2. **Object Destructuring**

When we have an object and want to extract properties from it and assign them to variables, we can use object destructuring. Object destructuring uses curly braces {} and the variable names match the property names of the object.

```js
// Define an object
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

// Use destructuring assignment to get values from the object
const { name, age, city } = person;

console.log(name); // Outputs 'Alice'
console.log(age); // Outputs 30
console.log(city); // Outputs 'New York'
```

> You can specify new variable names

```js
// Define an object
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

// Use object destructuring and specify new variable names
const { name: personName, age: personAge, city: personCity } = person;

console.log(personName); // Outputs 'Alice'
console.log(personAge); // Outputs 30
console.log(personCity); // Outputs 'New York'
```

> Nested object destructuring

```js
// Define a nested object
const person = {
  name: "Alice",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
};

// Use nested object destructuring
const {
  name,
  age,
  address: { city, country },
} = person;

console.log(name); // Outputs 'Alice'
console.log(age); // Outputs 30
console.log(city); // Outputs 'New York'
console.log(country); // Outputs 'USA'
```

#### 4.4.3. **Default Values**

Very common in daily business development.

```js
// Define an object
const person = {
  name: "Alice",
  age: 30,
};

// Use destructuring assignment to get values from the object and provide default values
const { name, age, city = "New York" } = person;

console.log(name); // Outputs 'Alice'
console.log(age); // Outputs 30
console.log(city); // Outputs 'New York', because the object doesn't have a city property, so the default value is used
```

### 4.5. **Default Parameters**

Default parameters (Default Parameter) refer to specifying a default value for parameters when defining a function. If the corresponding parameter is not passed when calling the function, the function will use this default value.
In React, default parameters are commonly used in functional components or event handler functions. They help simplify code and avoid undefined or errors when parameters are not passed.

### 4.6 **Rest/Spread Operator**

- Rest Operator:
The Rest operator is mainly used to collect an uncertain number of parameters or elements into an array. It's typically used in function parameters to indicate that the function can accept any number of parameters.

```js
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3)); // Output: 6
console.log(sum(1, 2, 3, 4, 5)); // Output: 15
```

- Spread Operator:
The Spread operator is used to "spread" elements in an array or object into individual elements. It's commonly used in function calls, array construction, or object merging.

```js
const numbers = [1, 2, 3];
console.log(...numbers); // Output: 1 2 3

const moreNumbers = [4, 5, 6];
const combined = [...numbers, ...moreNumbers];
console.log(combined); // Output: [1, 2, 3, 4, 5, 6]
```
