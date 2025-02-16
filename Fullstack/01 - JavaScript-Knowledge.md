## 1. Arrow Fucntion

### Syntax
Arrow functions use the `=>` syntax. Here's the basic structure:

```javascript
const functionName = (parameter1, parameter2) => {
  // function body
};
```

If there's only one parameter, you can omit the parentheses:

```javascript
const square = x => x * x;
```

If the function body consists of a single expression, you can omit the curly braces and return the value implicitly:

```javascript
const add = (a, b) => a + b;
```

### Key Features of Arrow Functions

#### 1. **Shorter Syntax**:
   Arrow functions are shorter, which is especially useful for small, one-line functions.

   ```javascript
   const multiply = (a, b) => a * b;
   ```

#### 2. **No `this` Binding**:
   One of the key differences between arrow functions and regular functions is how they handle the `this` keyword. In a regular function, `this` refers to the object that called the function. In an arrow function, `this` refers to the surrounding context in which the function was defined, not where it was called.

   **this does not bind to surround object, but this in arrow can bind to nearby function this**

   Here's an example that highlights the difference:
   
   ```javascript
   function RegularFunction() {
     this.value = 1;
     setTimeout(function() {
       this.value++;  // `this` refers to the global object (or undefined in strict mode)
       console.log(this.value);
     }, 1000);
   }

   new RegularFunction(); // Prints NaN or error due to incorrect `this` binding

   // Using an Arrow Function
   function ArrowFunction() {
     this.value = 1;
     setTimeout(() => {
       this.value++;  // `this` is inherited from ArrowFunction's context
       console.log(this.value);
     }, 1000);
   }

   new ArrowFunction(); // Prints 2 after 1 second
   ```

   In the second case, the arrow function inherits the `this` from the `ArrowFunction` context, so `this.value` correctly refers to the object instance.

   When using `this` inside a DOM event listener, it behaves differently depending on whether you're using a **regular function** or an **arrow function**. This is especially important when dealing with event listeners like `addEventListener`.

    **Regular Function with `this` in Event Listener**

    In a **regular function**, `this` refers to the element that triggered the event (in this case, the button). This is because event listeners are bound to the DOM elements, and when the event fires, `this` inside the listener points to the element that called it.

    ```javascript
    document.getElementById('button').addEventListener('click', function() {
    console.log(this);  // `this` refers to the DOM element (the button)
    this.style.backgroundColor = 'blue';  // Changes the button's background color
    });
    ```

    ```javascript
    document.getElementById('button').addEventListener('click', () => {
    console.log(this);  // `this` does not refer to the button, but to the surrounding context (e.g., the window object)
    this.style.backgroundColor = 'blue';  // This would not work as expected
    });
    ```


#### 3. **No `arguments` Object**:
   Arrow functions do not have their own `arguments` object. Instead, they inherit it from the enclosing non-arrow function (if there is one). Regular functions, on the other hand, have their own `arguments` object, which contains all passed arguments.

   ```javascript
   function normalFunction() {
     console.log(arguments);
   }

   const arrowFunction = () => {
     console.log(arguments);  // ReferenceError: arguments is not defined
   };

   normalFunction(1, 2, 3);  // Logs: [1, 2, 3]
   arrowFunction(1, 2, 3);  // Error
   ```

### When to Use Arrow Functions
- When you need a short function with a concise body.
- When you want to ensure that the `this` context is lexically inherited from the surrounding code.
- When you don’t need to use `arguments` or `new` for the function.


## 2. Call Apply bind

In JavaScript, **`call`**, **`apply`**, and **`bind`** are methods that allow you to explicitly set the value of `this` in a function. They are especially useful when dealing with functions that need to operate on an object, but you want to control what `this` refers to during execution. Let's look at each of them:

### 1. **`call()`**

The `call()` method invokes a function with a specific `this` value and individual arguments passed as comma-separated values.

#### Syntax:
```javascript
func.call(thisArg, arg1, arg2, ...);
```

- `thisArg`: The value to use as `this` when calling the function.
- `arg1, arg2, ...`: Arguments to be passed to the function (separated by commas).

#### Example:
```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = { name: 'Alice' };

greet.call(person);  // Output: "Hello, Alice"
```

In this example:
- `call()` allows you to explicitly set `this` to refer to `person` when calling `greet()`.
- Normally, `this` would refer to the global object (or `undefined` in strict mode), but `call()` overrides that.

#### Multiple Arguments Example:
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Bob' };

greet.call(person, 'Hello', '!');  // Output: "Hello, Bob!"
```

Here, we pass two arguments (`'Hello'` and `'!'`) to the `greet` function using `call()`.

### 2. **`apply()`**

The `apply()` method is similar to `call()`, but instead of passing arguments one by one, you pass them as an **array** or an **array-like object**.

#### Syntax:
```javascript
func.apply(thisArg, [arg1, arg2, ...]);
```

- `thisArg`: The value to use as `this` when calling the function.
- `[arg1, arg2, ...]`: An array (or array-like object) of arguments to be passed to the function.

#### Example:
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Charlie' };

greet.apply(person, ['Hi', '.']);  // Output: "Hi, Charlie."
```

In this example, instead of passing arguments one by one as in `call()`, we use an array to pass arguments to the `greet()` function.

#### Use Case for Arrays:
`apply()` is useful when the number of arguments is dynamic or when the arguments are stored in an array. For example, when working with functions like `Math.max()`:

```javascript
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max.apply(null, numbers));  // Output: 5
```

Here, `apply()` is used to pass the array of numbers to `Math.max()` as individual arguments.

### 3. **`bind()`**

The `bind()` method creates a **new function** that, when called, has its `this` value set to the provided value, and any given arguments are prepended to the arguments of the new function. This method does not call the function immediately but returns a new function that can be called later.

#### Syntax:
```javascript
const boundFunction = func.bind(thisArg, arg1, arg2, ...);
```

- `thisArg`: The value to use as `this` when calling the function.
- `[arg1, arg2, ...]`: Arguments to be prepended to the function's arguments when the bound function is called.

#### Example:
```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = { name: 'David' };

const greetDavid = greet.bind(person);
greetDavid();  // Output: "Hello, David“
```

In this example:
- `bind()` creates a **new function** (`greetDavid`) where `this` is always set to `person` when called.
- This is useful when you want to ensure a function always operates on a specific object, even if it is passed around or called later.

```js
const obj = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unBoundX = obj.getX; // Extracting the method getX from the object
console.log(unBoundX()); // => undefined...Without bind(), when you extract the method (unBoundX), the this context is lost, and it refers to the global object or undefined in strict mode.
// But to get it to work
const boundX = unBoundX.bind(obj)
console.log(boundX()); // => 42
```

#### Pre-Setting Arguments with `bind()`:
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Eve' };

const greetEve = greet.bind(person, 'Hey');
greetEve('!');  // Output: "Hey, Eve!"
```

In this example:
- We use `bind()` to create a new function (`greetEve`) with the `this` context bound to `person` and the first argument (`'Hey'`) pre-set.
- When `greetEve` is later called with `'!'`, it uses `'Hey'` as the greeting and `'!'` as the punctuation.

### Key Differences Between `call()`, `apply()`, and `bind()`:

| Method     | Description | Arguments | Return Value |
|------------|-------------|-----------|--------------|
| `call()`   | Invokes the function immediately with a specified `this` value and individual arguments. | Comma-separated values. | The result of the function call. |
| `apply()`  | Invokes the function immediately with a specified `this` value and an array of arguments. | An array (or array-like object) of arguments. | The result of the function call. |
| `bind()`   | Returns a new function with the `this` value set to the provided value and optional pre-set arguments. Does **not** invoke the function immediately. | Comma-separated values, with the first one being the `this` value. | A new function that can be invoked later. |

### Example Comparing All Three:
```javascript
const person = { name: 'Alice' };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

// Using call
greet.call(person, 'Hello', '!');  // Output: "Hello, Alice!"

// Using apply
greet.apply(person, ['Hi', '.']);  // Output: "Hi, Alice."

// Using bind
const greetAlice = greet.bind(person, 'Hey');
greetAlice('!');  // Output: "Hey, Alice!"
```

### Use Cases:
- **`call()` and `apply()`**: You want to invoke a function immediately but need to control the `this` context and pass specific arguments.
- **`bind()`**: You want to create a new function with a specific `this` context and optionally pre-set some arguments, but you don’t want to invoke the function immediately.

### Conclusion:
- **`call()`**: Invoke the function immediately with specific `this` and arguments.
- **`apply()`**: Similar to `call()`, but arguments are passed as an array.
- **`bind()`**: Creates a new function with a bound `this` and optional pre-set arguments, but does not invoke the function immediately.

## 3. Some ES6 Methods

#### 1. **destructure**

Obejct Order is not important, not need to list all;

Array is for index order
```js
// For object:
let myObj = {
    name: "Luke",
    age: 25,
    hobbies: "music"
};
let { name, age, hobbies } = myObj;
console.log(name, age, hobbies);    // => Luke 25 music

// For array:
let arr = [‘Jim’, ‘Bob’, ‘Sarah’, ‘Cassie’];
let [ jim, bob, cassie ] = arr;
console.log(jim, bob, cassie); //outputs: Jim Bob Sarah
```

#### 2. **Spread operator**
```js
let myObj = {
    name: "Luke",
    age: 25,
    hobbies: "music"
};
let { hobbies, ...rest } = myObj;  // => Luke 25 music
console.log(hobbies, rest)  // => music { name: 'Luke', age: 25 }
console.log(hobbies, rest.age)  // => music 25

```

```js
// Spread Operator in Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // Spread arr1 and add more elements
console.log(arr2);  // [1, 2, 3, 4, 5]

// Spread Operator in Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // Spread obj1 and add more properties
console.log(obj2);  // { a: 1, b: 2, c: 3 }

// Spread Operator for Cloning Arrays and Objects
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };

// Combining Arrays or Objects
const arr1 = [1, 2];
const arr2 = [3, 4];
const combinedArr = [...arr1, ...arr2];  // Combine both arrays
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 };  // Combine both objects

// Handling Function Arguments
function greet(...names) {
  console.log("Hello " + names.join(", "));
}

const people = ["Alice", "Bob", "Charlie"];
greet(...people);  // Hello Alice, Bob, Charlie
```

#### 3. **map and forEach**

forEach() method doesn’t actually return anything (undefined). 

map() method will also call a provided function on every element in the array.

#### 4. **Craete Class**

```js
class User {
	constructor (name, age) {
		this.name = name;
		this.age = age;
	}
	getUserData() {
		console.log(this.name + " is " + this.age + " years old.");
	}
}

let user = new User('paul', 18)
user.getUserData()
```

#### 5. **every**

```js

```

#### 6. **every**

```js
const allPositiveNumbers = [1 , 2, 3].every((item) => {
	return item > 0;
})
```

#### 7. **filter**

```js
let evenNumbersWithFilter = numberArray.filter((item) => (item % 2 === 0));
```

#### 8. **find, findIndex**

```js
const objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

const findIdWithb = objects.find((item) => {
	return item.id === 'b'
});

const findIdIndexWithb = objects.findIndex((item) => {
	return item.id === 'b'
});
```

#### 9. **reduce**

```js
function getWordCountReduce(arr) {
	return arr.reduce((counterObj, arrItem) => {
		counterObj[arrItem] = (counterObj[arrItem] + 1) || 1
		return counterObj;
	}, {});
}
```

#### 10. **some**

```js
const hasNegativeNumber = [1, 2, 3, -4, 5].some((item) => {
	return item < 0;
})
```

## 4. Closure

### What is a Closure in JavaScript?

A **closure** is a function that "remembers" its lexical environment, even when the function is executed outside that environment. In other words, a closure gives you access to the outer function's variables even after the outer function has finished executing.

Closures are a powerful feature of JavaScript, enabling functions to have **private variables** and allowing them to "capture" and "remember" variables from the outer scope.

### How Does a Closure Work?

When a function is created inside another function, the inner function has access to the variables of the outer function. This happens because JavaScript functions "remember" the environment in which they were created, even after the outer function has returned.

### Key Points About Closures:

1. **Lexical Scoping**: Functions can access variables from their outer scope due to lexical scoping.
2. **Persistence of Variables**: A closure allows the inner function to "remember" the variables of the outer function, even after the outer function has finished execution.
3. **Private Variables**: Closures allow you to create private variables, meaning variables that can't be accessed directly from the outside world but can be manipulated through closures.

### Basic Example of a Closure:

```javascript
function outerFunction() {
  let outerVariable = 'I am from outer function';
  
  function innerFunction() {
    console.log(outerVariable);  // Accessing outerVariable from the outer scope
  }
  
  return innerFunction;  // Returning innerFunction which forms a closure
}

const closure = outerFunction();  // outerFunction is executed, returning innerFunction
closure();  // Output: "I am from outer function"
```

#### Explanation:
1. `outerFunction` creates a local variable `outerVariable`.
2. `innerFunction` is defined inside `outerFunction` and has access to `outerVariable` because of lexical scoping.
3. When `outerFunction()` is called, it returns `innerFunction`, which forms a closure.
4. Even after `outerFunction()` finishes execution, calling `closure()` still gives access to `outerVariable` because of the closure.

### Closure and Private Variables:

A common use case for closures is to create private variables that cannot be accessed from the outside. These private variables can only be accessed and modified via the closure.

```javascript
function createCounter() {
  let count = 0;  // This variable is "private" to the closure
  
  return {
    increment: function() {
      count++;
      console.log(count);
    },
    decrement: function() {
      count--;
      console.log(count);
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();  // Output: 1
counter.increment();  // Output: 2
counter.decrement();  // Output: 1
console.log(counter.getCount());  // Output: 1

// The variable `count` is not accessible directly from outside
console.log(counter.count);  // Output: undefined
```

#### Explanation:
- `count` is a private variable inside the `createCounter` function.
- The returned object contains methods (`increment`, `decrement`, and `getCount`) that can access and modify `count`, but `count` is not accessible directly from outside the closure.
- This pattern is useful for creating **encapsulation** and **data hiding** in JavaScript.

### Closure and Asynchronous Code:

Closures are also commonly used in asynchronous code, like when using `setTimeout` or promises. They allow functions to "remember" their environment even after a delay or when execution context changes.

```javascript
function delayedGreeting(name) {
  setTimeout(function() {
    console.log(`Hello, ${name}!`);
  }, 1000);
}

delayedGreeting('Alice');  // Output: "Hello, Alice!" after 1 second
```

#### Explanation:
- The function passed to `setTimeout` is a closure that has access to the `name` parameter from `delayedGreeting()`, even after the outer function has finished executing.
- The closure "remembers" `name`, so when the `setTimeout` callback runs after 1 second, it can still access the `name` variable.

### Why Are Closures Important?

1. **Data Encapsulation**: Closures provide a way to create private variables and functions that are not accessible from outside the closure, promoting better data encapsulation.
2. **Callback Functions**: Closures are used extensively in asynchronous code, such as in `setTimeout`, `setInterval`, event listeners, and promises, where a function needs to remember the environment in which it was created.
3. **Functional Programming**: Closures are key in functional programming paradigms where functions are treated as first-class citizens and can be passed around, returned, and invoked later.

### Some question Tips:
- for loop inside using setTimeOut, for var, print all the same index of the last. for  let, print every index. cause var is function/global scope, let is block scope; if we continue use var, we can use a j inside to take the var i to log;

## 5. CallBack

### What is a Callback in JavaScript?

A **callback** is a function that is passed as an argument to another function and is executed (or "called back") at a later time, usually after some kind of asynchronous operation has been completed. In JavaScript, callbacks are commonly used for asynchronous tasks, like reading a file, making an HTTP request, or handling events like clicks or keyboard inputs.

Callbacks help you handle operations that take time to complete, without blocking the execution of other code (asynchronous programming). 

### Key Characteristics of a Callback:

1. **Function as an Argument**: A callback is simply a function that is passed as an argument to another function.
2. **Asynchronous or Synchronous**: While callbacks are often used with asynchronous operations, they can also be used in synchronous contexts.
3. **Executed Later**: The callback function is executed later — typically once a task (like a request or operation) has been completed.

### Basic Syntax of a Callback:

```javascript
function outerFunction(callback) {
  // Perform some task
  console.log("Doing some work...");
  
  // Call the callback function
  callback();
}

function innerFunction() {
  console.log("Callback function is executed!");
}

outerFunction(innerFunction);
```

#### Explanation:
1. `outerFunction` accepts `callback` as an argument, which is a function.
2. `innerFunction` is passed as the `callback` to `outerFunction`.
3. After doing some work inside `outerFunction`, it calls `callback()`, which triggers the execution of `innerFunction`.
4. The output will be:
   ```
   Doing some work...
   Callback function is executed!
   ```

### Callback with Asynchronous Code:

Callbacks are frequently used in JavaScript for handling asynchronous operations like HTTP requests, timeouts, and events. Here's an example with `setTimeout`:

```javascript
function greet(name, callback) {
  setTimeout(() => {
    console.log(`Hello, ${name}`);
    callback();  // Call the callback after greeting
  }, 1000);
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye); 
```

#### Explanation:
1. `greet` accepts `name` and a `callback` function.
2. Inside `greet`, `setTimeout` is used to simulate a delay (1 second).
3. After the greeting message is logged, the `callback` (which is `sayGoodbye`) is executed.
4. Output will be:
   ```
   Hello, Alice
   Goodbye!
   ```

### Why Use Callbacks?

1. **Asynchronous Execution**: Callbacks allow for the non-blocking execution of tasks. When performing operations that take time (like fetching data from an API or reading a file), a callback function can be used to execute some code once the operation completes, without freezing or blocking the entire program.
   
2. **Handling Events**: Callbacks are commonly used in event-driven programming to respond to user actions like clicks, mouse movements, or key presses. For example, in JavaScript, event handlers like `addEventListener` use callbacks to handle events asynchronously.

### Example with Event Listener:

```javascript
// Button click example
document.getElementById("myButton").addEventListener("click", function() {
  console.log("Button clicked!");
});
```

#### Explanation:
1. The `addEventListener` method accepts a callback function that is executed when the button is clicked.
2. The callback function (anonymous function here) prints "Button clicked!" to the console when the button is clicked.
3. This is an example of an asynchronous callback, as the function is executed later when the event (click) occurs.

### Nested Callbacks (Callback Hell):

Sometimes callbacks can become deeply nested, leading to code that is harder to read and maintain. This is often referred to as **callback hell** or **pyramid of doom**.

```javascript
function firstTask(callback) {
  setTimeout(() => {
    console.log("First task completed");
    callback();
  }, 1000);
}

function secondTask(callback) {
  setTimeout(() => {
    console.log("Second task completed");
    callback();
  }, 1000);
}

function thirdTask() {
  setTimeout(() => {
    console.log("Third task completed");
  }, 1000);
}

// Callback hell:
firstTask(function() {
  secondTask(function() {
    thirdTask();
  });
});
```

#### Explanation:
- In the above example, each callback is nested within the previous one. This makes the code hard to read, maintain, and debug, especially as the nesting increases.
- This is a common problem when chaining multiple asynchronous operations in callbacks.

### Solutions to Callback Hell:

1. **Promises**: Promises were introduced to help deal with callback hell by allowing asynchronous operations to be chained more cleanly.
2. **Async/Await**: The async/await syntax provides a cleaner and more readable way to work with asynchronous code, especially when dealing with multiple promises.

### Callback Example with Promises (Fixing Callback Hell):

```javascript
function firstTask() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("First task completed");
      resolve();
    }, 1000);
  });
}

function secondTask() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Second task completed");
      resolve();
    }, 1000);
  });
}

function thirdTask() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Third task completed");
      resolve();
    }, 1000);
  });
}

// Using promises to avoid callback hell
firstTask()
  .then(secondTask)
  .then(thirdTask)
  .catch(err => console.log("Error:", err));
```

#### Explanation:
- The use of `Promise` allows you to chain functions and handle asynchronous operations more cleanly.
- The `.then()` method handles the next task after the previous one resolves, and `.catch()` is used for error handling.

### Conclusion:

- A **callback** is a function passed as an argument to another function, to be executed later, typically after an asynchronous operation.
- Callbacks are widely used in JavaScript, especially for handling asynchronous tasks like events, HTTP requests, and timeouts.
- While callbacks are useful, they can become hard to manage when you have multiple nested callbacks, leading to callback hell.
- Modern JavaScript introduces **Promises** and **async/await** to handle asynchronous code more effectively and avoid callback hell.

## 6. Types

1. toPrecision() and toFixed() methods on numbers. A big warning to anyone thinking of using them – those methods return strings.
2. BigInts are a new numeric primitive in JavaScript (ES2020) that can represent integers with arbitrary precision. With BigInts, you can safely store and operate on large integers even beyond the safe integer limit for Numbers.
3. null is an empty or non-existent value. null must be assigned.
4. Undefined most typically means a variable has been declared, but not defined.
5. `typeof []` : Object. Actually Array is derived from Object. If you want to check array use Array.isArray(arr)
6. If one of the operands of the plus (+) operator is string it will convert other number or boolean to string and perform a concatenation. 
7. In constants mutation is allowed but reassignment is not allowed.
8. Object.freeze works on values, and more specifically, object values.
9. Only for additions, if one of the parameters is a string, the other one will be converted to string as well. For all other operations, as long as one of the parameters is a number, the other one will be converted to a number.
10. Object.is() static method, g(Object.is(NaN, NaN)); // true; +0 -0 false


### Symbol Usage
#### What is a Symbol in JavaScript?

A **Symbol** is a **primitive data type** introduced in ECMAScript 6 (ES6). It represents a unique and immutable value, often used as an identifier for object properties. Each time you create a Symbol, it is guaranteed to be **unique**, even if you create multiple Symbols with the same description.

#### Key Points about Symbols:

1. **Unique and Immutable**: Every Symbol is unique. Even if two Symbols are created with the same description, they are not equal.
2. **Used as Property Keys**: Symbols are commonly used as object property keys to avoid name clashes, especially in scenarios like defining private properties or when working with libraries where property names should not conflict.
3. **Not Automatically Stringable**: Symbols do not automatically convert to a string when you try to print them, unlike other primitive types.

#### Syntax:
```javascript
const mySymbol = Symbol("description");
```

- `"description"` is an optional string that helps describe the Symbol but does **not affect its uniqueness**.

#### Example of Using Symbols:

```javascript
const sym1 = Symbol("id");
const sym2 = Symbol("id");

const obj = {
  [sym1]: 1,
  [sym2]: 2
};

console.log(obj[sym1]);  // 1
console.log(obj[sym2]);  // 2
console.log(sym1 === sym2);  // false, because each Symbol is unique
```

##### Explanation:
- `sym1` and `sym2` are two Symbols with the same description but are **different values**.
- Symbols used as object keys ensure that each property is unique, even if they have the same description.

#### Use Cases:
- **Private Object Properties**: Symbols are often used to define properties that are not accessible or enumerable in the object.
- **Metaprogramming**: Symbols are used in JavaScript's internal mechanisms like `Symbol.iterator` (for iterators) or `Symbol.toStringTag` (for custom string representations).

## 7. Shadow copy and deep copy

### 1. **Shadow Copy (Shallow Copy)**

A **shallow copy** creates a **new object or array**, but it only copies the **references** to the nested objects or arrays (i.e., it doesn't copy the actual nested objects themselves). This means that both the original and copied objects share references to the same nested objects or arrays. 

#### Example of Shallow Copy:

```javascript
const obj1 = {
  a: 1,
  b: [2, 3],
};

const shallowCopy = { ...obj1 };

shallowCopy.a = 10;
shallowCopy.b[0] = 99;

console.log(obj1.a);  // 1
console.log(obj1.b);  // [99, 3]

console.log(shallowCopy.a);  // 10
console.log(shallowCopy.b);  // [99, 3]
```

#### Explanation:
- `shallowCopy` is a shallow copy of `obj1`, but the **nested array** `b` is **not deeply copied**. Instead, it **shares the reference** with `obj1.b`.
- Modifying `shallowCopy.b` also affects `obj1.b` because both `obj1` and `shallowCopy` point to the same array.

#### Shallow Copy Methods:
- **Object Spread**: `{ ...obj1 }`
- **`Object.assign()`**: `Object.assign({}, obj1)`
- **Array Spread**: `[...arr]`

### 2. **Deep Copy**

A **deep copy** creates a **completely new object or array**, including copies of all nested objects or arrays, so that the copied object is entirely independent of the original one. Any changes made to the copied object do not affect the original object, even for nested structures.

#### Example of Deep Copy:

```javascript
const obj1 = {
  a: 1,
  b: [2, 3],
};

const deepCopy = JSON.parse(JSON.stringify(obj1));

deepCopy.a = 10;
deepCopy.b[0] = 99;

console.log(obj1.a);  // 1
console.log(obj1.b);  // [2, 3]

console.log(deepCopy.a);  // 10
console.log(deepCopy.b);  // [99, 3]
```

#### Explanation:
- `deepCopy` is a deep copy of `obj1`, created by serializing (`JSON.stringify()`) and then deserializing (`JSON.parse()`) the original object.
- **Deep copying** ensures that `deepCopy.b` is **completely independent** of `obj1.b`. Changes to `deepCopy.b` do not affect `obj1.b`.

#### Deep Copy Methods:
- **`JSON.parse(JSON.stringify())`**: This is a simple, commonly used method for deep copying, but it has limitations (discussed below).
- **Custom deep copy function**: You can write your own recursive function to perform deep copy on more complex structures (e.g., handling `Date`, `RegExp`, functions, etc.).

### Differences Between Shallow Copy and Deep Copy

| Feature                    | Shallow Copy                                         | Deep Copy                                            |
|----------------------------|------------------------------------------------------|------------------------------------------------------|
| **What is copied?**         | Only the **top-level** properties or elements.       | **All properties**, including nested objects and arrays. |
| **Nested objects/arrays**   | Shared references to the same objects/arrays.       | New independent copies of the nested objects/arrays. |
| **Effect of changes**       | Modifying nested structures in the copy affects the original object. | Modifying the copy does not affect the original object. |
| **Performance**             | Generally faster because it only copies references. | Slower, as it needs to recursively copy all properties and nested structures. |
| **Best use case**           | When you don't need to modify nested structures in the copy. | When you need a fully independent copy of the object, including nested structures. |

### Limitations of Using `JSON.parse(JSON.stringify())` for Deep Copy:

1. **Non-serializable data**: `JSON.stringify()` does not work well with certain types of data:
   - **Functions**: Functions are lost in the deep copy.
   - **Date objects**: Dates are converted to strings, losing their `Date` type.
   - **RegExp objects**: They are converted into empty objects.
   - **Undefined**: Any `undefined` values are omitted from the copy.
   - **Circular references**: Circular references will cause an error with `JSON.stringify()`.

#### Example with `Date` (fails with `JSON.parse(JSON.stringify())`):

```javascript
const obj1 = {
  date: new Date(),
};

const deepCopy = JSON.parse(JSON.stringify(obj1));

console.log(deepCopy.date instanceof Date);  // false, it's a string now
```

#### Better Approach for Deep Copy with Complex Data:
For complex data types or objects with functions, you might need a custom deep copy function or use a library like **Lodash** with its `_.cloneDeep()` method.

```javascript
// Example using Lodash
const _ = require('lodash');

const obj1 = {
  a: 1,
  b: { c: 2 },
};

const deepCopy = _.cloneDeep(obj1);
deepCopy.b.c = 3;

console.log(obj1.b.c);  // 2
console.log(deepCopy.b.c);  // 3
```

### Summary:

- **Shallow copy**: Copies only the top-level properties of an object. Nested structures are shared between the original and the copy.
- **Deep copy**: Creates a completely independent copy of the object, including all nested objects and arrays.
- **Shallow copy** is faster but may lead to unintended side effects with nested structures.
- **Deep copy** ensures full independence but can be slower and has limitations with non-serializable data.

## 8. Storage & Cookie

- Cookie Options

By default, the cookie belongs to a current page. But you can tell the browser what path the cookie belongs to using a path parameter.
```js
document.cookie = "username=John; expires=Sat, 8 Jun 2019 12:00:00 UTC; path=/services"
```

## 9. Dangerous and safety Usage

### 9.1 Eval
The eval function allows you to inject a string and evaluate it at any time.



## 99. Small Code Knowledge

## 100. Some Scattered Knowledge

1. In JavaScript all functions are object methods.
2. All functions in JavaScript are closures.
3. in function, variable will move up the the top, but the assignment will not. so if a global a = 1, inside function a line behind log(a) define a = 2, the a go to top, then log output undefined
4. `0.2 + 0.1 === 0.3` return false cause floating point representation are not accurate but approximate.
5. In JavaScript, there are no true integers, all numbers are implemented in double-precision 64-bit binary format IEEE 754. Also called double-precision floats.
6. Encryption is two way and hashing is only one way.
7. ?? judge undefined and null; || judge false, 0, "", null, undefined, NaN;
8. Only these return false, all others are true: false 0 (zero) '' or "" (empty string) null undefined NaN;