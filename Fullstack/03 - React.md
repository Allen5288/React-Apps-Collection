# 1. JS Quick Refesh

## 1.1 Adding  JS to Project

With type="Module" syntax, you can import and export between different js file.
 
```html
<script src="asset/scripts/app.js" type="module"></script>
```

export content from one js to another

```javascript
export let apiKey = 'gnbsdauigha';
import {apiKey} from '../util.js'

export default "gdhsaujfidashfi" // just can export one default
import apiKey from '../util.js' // use default without {}
import * as util from "./util.js"
console.log(`${util.apiKey}, ${util.default}`);
```

## 1.2 Values, Variable, operator

String, Number, Boolean, Null & undefined

var, let, const

console.log

## 1.3 Func and Array Func

Basic Func:

```javascript
fucntion greet(param1, param2) {
    comsoloe.log(param1)
}
greet("hello", "life");
```

Array Function:

```javascript
export default (param1, param2) => { // multiple param should be with ()
    return param1 + param2;
}

param1 => { ... } // exactly just one param, or use (param1)

() => { ... } // if no params, only in this way

number => number * 3 // only param1 and no logic, directly return;

number => ({age: number}); // only way directly return an object
```

Use Function as Values

```javascript
function handleTimeout() { ... };

const handleTimeout2 = () => { ... };

setTimout(handleTimeout, 2000); // it ac-ts as value, to excute after 2000ms;
setTimout(handleTimeout2, 2000); // it acts as value, to excute 
setTimeout(() = > {
    ...;
}, 4000);

fucntion greeter(greetFn) {
    greetFn(); // print ...
}
greeter(() => console.log(...));
```

Defining function inside of Function

```javascript
fucntion init() {
    fucntion greet() {
        consoloe.log("Hi");
    }
    greet();
}
init();
```

## 1.4 Object and Class

Objects:

```javascript
const user = {
    name: 'Allen',
    age: 34,
    greet() { 
        consolot.log(this.age);
        return 'Hello'; 
    }
}
console.log(user.name);
user.greet();
```

Class:

```javascript
class user {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log('hi');
    }
}

const user1 = new User("Allen", 30);
console.log(user1)
user1.gteet();
```

## 1.5 Array

```javascript
const hobbies = ["sports", "reading"];
consoloe.log(hobbies[0]);

hobbies.push("working");

const index = hobbies.findIndex((item) => { // -1 if not found.
    return item === "reading"; // Or write: (item => item === "reading")
})

const editedHobbies = hobbies.map((item) => item + '!'); // origin not changed
```

## 1.6 Destructuring

```javascript
const [firstName, lastName] = ["Max", "sur"];

const {name: username, age} = { // pulled out by name, exactly match object name
    name: "xxx",
    age: 30
}

// For Fucntion params
function storeOrder(order) {
  localStorage.setItem('id', order.id);
  localStorage.setItem('currency', order.currency);
}
function storeOrder({id, currency}) { // destructuring
  localStorage.setItem('id', id);
  localStorage.setItem('currency', currency);
}

```

## 1.7 Spread Operator

```javascript
const mergedhobbies = [...hobbies, ...newHobbies]; /

const extndedUser = {
    isAdminL: true,
    ...user;
}
```

## 1.8 Manipulating the DOM

```javascript
const list = document.querySelector("ul");
list.remove();
```

## 1.9 Reference vs Primitive Value

Array is also object, Not store the value, but the memory from computer;

# 2. React Essentials - Coponents, JSX, Props, State &&

## 2.1 Components

### 2.1.1 Define and use a component:
```javascript
function Header() {
  return (
    <header>
      ...
    </header>
  );
}

function App() {
  return (
    <Header />
  );
}
```

We can sepeerate diff component in diff file

```javascript
export default function Header() { ... } // export in the outside compoent

import Header from "./components/Header";
<Header /> // Use it
```

### 2.1.2 Dynamic content
```javascript
const description = reactDescriptions[genRandomInt(2)];
<p>{description} React</p> // inside content {}
```

## 2.2 Class-based component
Normally we still use function component.

### 2.2.1 usage of class based component
1. State should be defined in constructor. state is always an object(in function can be anything).
2. super() must be called
3. this is used to call related state or method
```javascript
import { Component } from 'react';

import User from './User';
import classes from './Users.module.css';

class Users extends Component {
  constructor() {
    super();
    this.state = { // always be object
      showUsers: true,
      more: 'Test',
    };
  }

  toggleUsersHandler() {
    // this.state.showUsers = false; // NOT!
    this.setState((curState) => { // this.setState fixed usage here
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}
```

### 2.2.1 Lifecycle of class based component
1. componentDidMount() -- called once a component mounted, evaluyated & rendered by react; like useEffect(..., [])
2. componentDidUodate() -- called once a component updated, re-evaluated and re0rendered by React; like useEffect(..., [someValue])
3. componentWillUnmoint() -- Called right before component is unmounted, right before removed from DOM; like useEffect(()=> {return ()=>{...}}, []);

```javascript
class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  componentWillUnmount() {
    console.log('User will unmount!');
  }

  componentDidMount() {
    // Send http request...
    this.setState({ filteredUsers: DUMMY_USERS });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) { // we dont need to check in useEffect. but needed here.
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}
```

### 2.1.3 Error Boundaries
Error Boundaries are a React feature that allows you to catch JavaScript errors anywhere in your component tree, log those errors, and display a fallback UI instead of crashing the entire application. They were introduced in React 16 as a way to handle errors gracefully in React applications.


1. Component-Level Error Handling:

Error Boundaries work at the component level, meaning they catch errors in their child components. They do not catch errors inside the boundary itself, in event handlers, asynchronous code (like setTimeout or fetch), server-side rendering, or during the commit phase of rendering.

2. Lifecycle Methods Involved:

Two lifecycle methods are primarily used in Error Boundaries:
static getDerivedStateFromError(error): Used to update the state so that the next render shows the fallback UI.
componentDidCatch(error, info): Used to log the error information.

3. Fallback UI:

When an error is caught, an Error Boundary can render a fallback UI, which is a way to display a user-friendly message instead of the broken UI.

4. Where to Use Error Boundaries:

You should use Error Boundaries to wrap components that you expect might throw errors. This is especially useful for components from third-party libraries, large sections of your app, or any component where you want to display a specific error message if something goes wrong.

```javascript
// Define the ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state so the next render shows the fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log the error (you can also log it to an error reporting service)
  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render any fallback UI you want
      return <h1>Something went wrong.</h1>;
    }

    // Render children if there's no error
    return this.props.children;
  }
}

// Example of a component that may throw an error
function BuggyComponent() {
  const [count, setCount] = React.useState(0);

  if (count === 5) {
    // Simulate a JavaScript error when count reaches 5
    throw new Error('I crashed!');
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```


## 2.3 Props
pass data to components via a concept called "Props"

```javascript
function componentXXX(props) { // use props to represent all, Or can object destructoring {image, title, description}
    return(
        <xxx>{props.name}</xxx>
        <xxx>{props.age}</xxx>
        ...
    )
}

<componentXXX 
    name='allen' // string
    age={34} // number
    details={{userName: 'allen'}} // object
    hobbies={['Cooking', 'Reading']} // array value
/>

import { CORE_CONCEPTS } from "./data";
<CoreConcept {...CORE_CONCEPTS[1]} /> // directly write the object to it

export default function CoreConcept({ concept }) { ... }
<CoreConcept concept = {CORE_CONCEPTS[1]} /> // give a prop name to receive

export default function Button({ caption, type = "submit" }) { ... } // default param value
<Button caption="My Button" /> // to replace <Button type="submit" caption="My Button" />
```

props.children represent the content between your compnent text

```javascript
export default function TabButton(props) {
  return (
    <li>
      <button>{props.children}</button>
    </li>
  );
}

<TabButton>Components</TabButton>
```

The id prop, which is used to mark specially section or content, can not go through the component the outside used, like:
```javascript
<Section id="example"> // the id just can use outside, the css style can be apllied putside content. can not be used inside Section
```

If we want to transport many prop, but notnto write it one by one, we can use ...props;
```javascript
<Section id="example" className="xxx" mmmm> // the id just can use outside, the css style can be apllied putside content. can not be used inside Section

export default function Section({title, ...props}) {
  <div {...props}>....<> // then here use all outside other remainging props
}
```


### 2.3.1 Fragment

When we use component in react, we need return a whole body, rather than multiple, sometime we use <div>, but it will add a div into the content

Methods:
1. ```<div>```
2. ```<>```
3. ```<Fragment>```so we introduce fragment, without show anything on screen

## 2.4 Function

Without using arrow functions: Suitable when the event handler **doesn't require any parameters**, such as onClick={handleSelect}, where handleSelect is a function without parameters.

Using arrow functions: When you **need to pass parameters or ensure the function is executed only after a specific user action**, you should use an arrow function, like onClick={() => handleSelect('Components')}.

```javascript
 <TabButton onSelect={() => handleSlect('Components')}>Components</TabButton>

```


## 2.5 conditional

If Condition
```javascript
// method 1
{!selectedTopic ? (
  <p>Please select a topic</p>
) : (
  <h3>{EXAMPLES[selectedTopic].title}</h3>
)}

// method 2
{!selectedTopic && <p>Please select a topic</p> }
{ selectedTopic && (
  <div id="tab-content">
  <p>{EXAMPLES[selectedTopic].description}</p>
  </div>
)}

//method 3
let tabContent = <p>Please select a topic</p>;
if (selectedTopic) {
  tabContent = (
    <div id="tab-content">
    <h3>{EXAMPLES[selectedTopic].title}</h3>
    <p>{EXAMPLES[selectedTopic].description}</p>
    </div>
  )
}
```

iteral through each content
```javascript
<ul>
  {CORE_CONCEPTS.map((conceptItem) => (
    <CoreConcept key={conceptItem.title} {...conceptItem} />
  ))}
</ul>
```

## 2.6 class

className is used to select class to apply here
```javascript
<button className={isSelected ? "active" : undefined} onClick={onSelect}>
  {children}
</button>
```

## 2.7 Slot

Slot can be used to group and set dynamic changed outside of the compoennt, make it more flexiable.
```javascript
export default function Tabs({ children, buttons, ButtonsContainer = "menu" }) {
  // const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

<Tabs
  buttons={
    <>
      <TabButton
        isSelected={selectedTopic === "components"}
        onClick={() => handleSelect("components")}
      >
        Components
      </TabButton>
      <TabButton
        isSelected={selectedTopic === "jsx"}
        onClick={() => handleSelect("jsx")}
      >
        JSX
      </TabButton>
    </>
  }
>
  {tabContent}
</Tabs>
```

## 2.8 Resource
You should use the public/ folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the index.html file or favicons.

On the other hand, images that are used inside of components should typically be stored in the src/ folder (e.g., in src/assets/).

## 2.9 Data Update
### 2.9.1 Two way binding
```javascript
export default function Player({ initialName, symbol }) {
  const [playerName, setPlayerName] = useState(initialName);

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} /> // value is one way, onChange is another way
    );
    // btnCaption = 'Save';
  }
}
```

# 3. Styling React Apps

## 3.1 Vanilla CSS

Advantage:
1. CSS is decoupled from JSX code
2. You write CSS code as you may know and love it
3. CSS may be written by another developer who need only a minimal amount of access to your JSX code

Disadvantage:
1. You need to know CSS
2. CSS code ***is not scoped to components*** -> CSS rules mat clash accross components(same CSS class name used in different components for different purposes)

## 3.2 Mehtod 1: Inline Style
```javascript
<p style={{
  color: 'red',
  textAlign: 'left'
}}>Here is a Normal inline style try</p>

<label className={`label ${emailNotValid ? 'invalid' : ''}`}> // add more className initial as you want
<p style={{
  // CSS target is an object, so use emailNotValie rather than {emailNotValie}
  backgroundColor: emailNotValie ? '#fwfwfw' : '#g4g4g4' // emailNotValie is a judegment value
  className={emailNotValie ? 'invalid' : undefined} // dynamic add className to change style
}}>Here is a Dynamic&Condition inline style try</p>

<p style={{
  
}}>Here is a Dynamic&Condition inline style try</p>
```

Advantage:
1. Quick and eacy
2. only effext the element
3. **Add Dynamic and conditionally**

Disadvantage:
1. You need to know CSS
2. You need to style everyOne
3. No seperation between CSS and JSX

## 3.3 Method 2: Scope CSS Rule with CSS Module
```javascript
// change the css name to  Header.module.css with module key word

import classes from './Header.module.css';

<p className={classes.paragraph}>A community of artists and art-lovers.</p>
```
Advantage:
1. Decoupled
2. You write CSS code
3. can be writted by anotehr developer who need a small part
4. Scoped

Disadvantage:
1. You need to know CSS
2. You may end uo with many relatively small css files in your project

## 3.4 Method 3: Styled Component
```javascript
import { styled } from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({ $invalid }) => ($invalid ? '#fed2d2' : '#d1d5db')};
  color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
  border: 1px solid ${({ $invalid }) => ($invalid ? '#f73f3f' : 'transparent')};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function CustomInput({ label, invalid, ...props }) {
  return (
    <p>
      <Label $invalid={invalid}>{label}</Label>
      <Input $invalid={invalid} {...props} />
    </p>
  );
}

// To use it:
import Input from './Input.jsx';
<Input
  label="Email"
  invalid={emailNotValid}
  type="email"
  // style={{
  //   backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db'
  // }}
  onChange={(event) => handleInputChange('email', event.target.value)}
/>
```
Advantage:
1. Quick and easy
2. Continue thinking in react
3. Scoped

Disadvantage:
1. You need to know CSS
2. No seperation between CSS and JSX

## 3.5 Method 4: Tailwind CSS

VScode has plug-in
Advantage:
1. You do not need to know css
2. Quick
3. No style clash bettween components
4. Highly configurable

Disadvantage:
1. long classname
2. any style change require editing JSX
3. end upo with many relatively small "wrapper"
```javascript
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// in file
export default function Input({ label, invalid, ...props }) {
  let labelClasses = 'block mb-2 text-xs font-bold tracking-wide uppercase';
  let inputClasses = 'w-full px-3 py-2 leading-tight border rounded shadow';

  if (invalid) {
    labelClasses += ' text-red-400';
    inputClasses += ' text-red-500 bg-red-100 border-red-300';
  } else {
    labelClasses += ' text-stone-300';
    inputClasses += ' text-gray-700 bg-stone-300';
  }

  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} {...props} />
    </p>
  );
}

```

For config file:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Pacifico"', 'cursive']
      }
    },
  },
  plugins: [],
};

```

# 4. Debugging

## 4.1 devTools

## 4.2 Strict Mode


# 5. Refs & Portals

## 5.1 Refs Usage

### 5.1.1 Ref Basic usage
```javascript
const playerName = useRef();

const [enteredPlayerName, setEnteredPlayerName] = useState(null);

function handleClick() {
  setEnteredPlayerName(playerName.current.value);
  playerName.current.value = ''; // directly to clear content
}

<input
  ref={playerName} // receive content directly without useState onchange and value
  type="text"
/>
<button onClick={handleClick}>Set Name</button>
```

Compare State with Ref:

Ref:
1. Do not cause component re-evaluation when changed
2. Can be used to gain direct DOM element access (great for reading values or accessing certain browser APIs)

State:
1. Cause component re-evaluation when changed
2. should be used for values that are directly reflected in the UI
3. Should not be used for "behind the scenes" values that have no direct UI impact

### 5.1.2 Ref for pointer
```javascript
const timer = useRef();

function handleStart() {
  timer.current = setTimeout(() => { // here for the timer, diff element with it own timer ref
    setTimerExpired(true);
  }, targetTime * 1000);

  setTimerStarted(true);
}

function handleStop() {
  clearTimeout(timer.current);
}
```

### 5.1.3 Forward Ref
When you difined a new componet yourself to contain an system component, the origin ref such as used in the input cannot be used in your new Input components. at this time, you need forwardRef.
```javascript
export default function TimerChallenge({ title, targetTime }) {
  const dialog = useRef(); // later will forward this ref
  function handleStart() {
    dialog.current.showModal();
  }
  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
    </>
  );
}

// for the component which needed to be forward
import { forwardRef } from 'react';

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
})

export default ResultModal;
```

## 5.2 useImperativeHandle Hook Fucntion
must be used with ref
```javascript
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
    </dialog>
  );
})

export default ResultModal;


function handleStart() {
  dialog.current.open();
}
<ResultModal ref={dialog} targetTime={targetTime} result="lost" />
```

# 6 State (Hook)

The component function doesnot excute again, so a let variable will not work when you want to change that value;

## 6.1 state use rule
To solve it, use state.

Rules:
1. Only call Hooks inside of Component Functions, not outsides;
2. Only call hooks on the top level (not called in nested code statement (eg: in a if statements))

```javascript
const [selectedTopic, setSelectedTopic] = useState('Please click a button');
      // currentValue  // update function           // initial state value
```
## 6.2 Update State based on od state:
```javascript
setIdEditing(!isEditing); // DONOT DO LIKE THIS, this way will process in future like 1/2s, not instant; if you write two times, may all use old value, that will occur problem
setIdEditing(wasEditing => !wasEditing) // DO LIKE THIS
```

## 6.3 immutable change of state
Dont't mutate value directly of the original one, cause it it a reference
```javascript
const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      prevGameBoard[rowIndex][colIndex] = "X"; // DONT DO THIS
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = "X";
      return updatedBoard;
    });
  }
```

## 6.4 Lifting State Up
Lift the state up to the closet ancestor component that has access to all components that need to work with that state
```javascript
// ancestor component
const [activePlayer, setActivePlayer] = useState("X");
function handleSelectSquare() {
  setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
}
<Player
  initialName="Player 2"
  symbol="O"
  isActive={activePlayer === "O"}
/>
<GameBoard
  onSelectSquare={handleSelectSquare}
  activePlayerSymbol={activePlayer}
/>

// Child component
// player
<li className={isActive ? "active" : undefined} ></li>

// GameBoard
function handleSelectSquare(rowIndex, colIndex) {
  updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  onSelectSquare();
}
```
## 6.5 Advanced State: Context API
create
round(.provider)(Default to use, best way to use)
import, use, 
connect with sate. 
```javascript
// here to trigger a button from header to change page theme light and dark
// Context.js
import React from 'react';
export const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => {},
})

export default function ThemeContextProvider({children}) {
  const [currentTheme, setCurrentTheme] = React.useState('light');
  
  function toggleTheme() {
      setCurrentTheme((prevTheme) => {
          if (prevTheme === 'dark') {
              return 'light';
          } else {
              return 'dark';
          }
      });
  };
  
  const ctxValue = {
    theme: currentTheme,
    toggleTheme: toggleTheme,
  };
  
  
  return (
    <ThemeContext.Provider value={ctxValue}>
        {children}
    </ThemeContext.Provider>
  );
}

// app.sj
import Page from './Page';
import ThemeContextProvider from "./ThemeContextProvider.js";

function App() {
  return(
    <ThemeContextProvider>
        <Page />
    </ThemeContextProvider>
    );
}

export default App;

// A components
import React from 'react';
import {ThemeContext} from "./ThemeContextProvider.js";

export default function Header() {
  const {toggleTheme}  = React.useContext(ThemeContext);
  
  return (
    <header>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}

// B components
import Header from './Header';
import React from 'react';
import {ThemeContext}  from "./ThemeContextProvider.js";

export default function Page() {
    const themeCtx = React.useContext(ThemeContext);
    
  return (
    <div id="app" className={themeCtx.theme}>
    </div>
  );
}

```

A diff way to use context(Consumer) (not commonly used, not easy to read)

Reexcute hte project when the context value is changed.

## 6.6 UseReducer
Here is a counter example
```javascript
import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;


// using context
import { useContext } from 'react';
const cartCtx = useContext(CartContext);
function handleAddMealToCart() {
  cartCtx.addItem(meal);
}
```

# 7. Side Effects - UseEffect()

## 7.1 Some basic info
Side effects refer to any observable change in the state of the system that occurs as a result of executing a piece of code. This includes modifying a variable, writing to a file, updating a user interface, sending a network request, or any other action that changes the state outside of the function's scope.

What caused? 
May cause infinit loop: a function call inside a app, but not trigger by page, it triggered itself. if it set state in this function. state change - rerender - call function - set state - state cahnge - rerender - Infinit loop

When not used: like setStorage, and get storage before main app component start. some fucnction finished instanousouly will be OK.

***Effect dependence***: use props or state value(casue re-excute) in the useEffect function; so we cannot use  [] in the end.

## 7.2 UseEffect()
useEffect should be used in root component function; it need some time to excute sometimes.

Nots: under the [], if you set some fix number from outside, it may be not changed. but if you outpout a function, even the function npot change logic, bug every time it excute, it will use a new memory, so it will trigger the useEffect to run again.
```javascript
function App() {
  const [pickedPlaces, setPickedPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []); // if there is  no [], it will call infinit, with []. it just call once

  return (
    <>
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="Sorting places by distance..."
      />
    </>
  );
}
```
Effect dependences:
```javascript
function Modal({ open, children, onClose }) {
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // rather than []. it should add the props open here

  ...
}
```
## 7.3 Clean Up Function: return () =>

Should be known here: the : return () => modal.close(); is a clean up fucntion. It is is not executed immediately after the open variable is set to true.

It is only executed when:
1. The component re-renders, and open changes again (e.g., from true to false).
2. The component unmounts (the entire effect is cleaned up).

```javascript
useEffect(() => {
  const modal = dialog.current;

  if (open) {
    modal.showModal();
  }

  return () => modal.close();
}, [open]);
```

## 7.4 useCallBack()
As we said before, when component reexcute, the function into the [] will detect change cause the memory changed. so it will trigger the useEffect run again. we we use the useCallBack to prevent and control it.


# 8. A Look behind React & optimization techniques

## 8.1 How React DOM Render
1. Component Tree Construction
Component Tree: When an application is running, React organizes these components into a tree-like structure called the component tree. Each component in the tree can have one or more child components, forming a hierarchical structure.

Rendering: The root component (usually <App />) is at the top of this tree, and React recursively renders each component down the tree, turning them into the HTML that gets displayed in the browser.

2. Virtual DOM

Virtual DOM (VDOM): React creates a virtual representation of the UI, known as the Virtual DOM. This is a lightweight copy of the actual DOM (Document Object Model) in the browser. The VDOM allows React to make updates efficiently without directly manipulating the real DOM.

Initial Rendering: When a component renders for the first time, React creates a VDOM tree representing the entire UI structure. This tree is a snapshot of the components and their current state.

Reconciliation: When a component’s state or props change, React creates a new VDOM tree. It then compares this new tree with the previous one (a process known as "reconciliation") to determine the minimum number of changes needed to update the real DOM.

## 8.2 usememo()
### 8.2.1. When to Use useMemo()

a. Expensive Computations:

b. Avoiding Unnecessary Re-Renders:

c. Dependent Derived Values:


### 8.2.2. How useMemo() Works
useMemo() takes two arguments:


```javascript

const memoizedValue = useMemo(() => {
  // Compute and return a value
  return expensiveCalculation(a, b);
}, [a, b]); // Dependencies
```
First Render: On the initial render, the function inside useMemo() is executed, and the result is stored.

Subsequent Renders: On subsequent renders, React checks if any of the dependencies (a or b) have changed.

If no dependencies have changed, the memoized value is returned without re-executing the function.

If any dependency has changed, the function is re-executed, and the new result is memoized.

## 8.3 Use better with Key
1. Rendering Lists of Elements:

Whenever you are rendering a list of elements using .map() or a similar method, you should provide a key prop to each element.
Example:
```javascript

const items = ['Apple', 'Banana', 'Cherry'];

function FruitList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```
2. Dynamic Components:

When rendering components that depend on dynamic data, such as items fetched from an API or user-generated content, use a key to uniquely identify each component.
Example:
```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
3. Managing Child Components in a Parent Component:

If you have a parent component that conditionally renders or reorders child components, using a key ensures that each child component is correctly identified and preserved across updates.

Also:
If your components have local state or side effects, using key ensures that React preserves the correct state across re-renders. Without a stable key, React might reuse components inappropriately, leading to unexpected behavior or bugs.
Example:
```javascript

function App() {
  const [items, setItems] = React.useState(['A', 'B', 'C']);

  return (
    <div>
      {items.map((item) => (
        <ChildComponent key={item} item={item} />
      ))}
    </div>
  );
}

function ChildComponent({ item }) {
  // Child component logic here
  return <div>{item}</div>;
}
```

# 9. Data Fetching & HTTP Request

## 9.1 Sending Fetch request via useEffect

1. Fetching Data
```javascript
useEffect(() => {
  fetch('http://localhost:3000/places')
    .then((response) => {
      return response.json();
    })
    .then((resData) => {
      setAvailablePlaces(resData.places);
    });
}, []);

// extract to an api function
export async function fetchAvailablePlaces() { 
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
}

useEffect(() => {
  async function fetchPlaces() {
    setIsFetching(true);

    try {
      const places = await fetchAvailablePlaces();
      ...
```

2. Async fetch and catch error
```javascript
useEffect(() => {
  async function fetchPlaces() {
    setIsFetching(true);

    try {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }

      setAvailablePlaces(resData.places);
    } catch (error) {
      setError({
        message:
          error.message || 'Could not fetch places, please try again later.',
      });
    }

    setIsFetching(false);
  }

  fetchPlaces();
}, []);
```

## 9.2 Sending Post Requests
use fetch with put method
```javascript
export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data.');
  }

  return resData.message;
}

// usage
async function handleSelectPlace(selectedPlace) {
  ...

  try {
    await updateUserPlaces([selectedPlace, ...userPlaces]);
  } catch (error) {
    // ...
  }
}
```

# 10. Custom Hook

## 10.1 Rules of Hook
1. Only call hooks inside of component Functions

So If you outsource a range of code which use like useEffect or other system hook, it cannot be outsource as a standard function, and reuse in some component;

2. Only call Hooks on the top level

## 10.2 Define a custom Hook

Name should start with use;

state changed in custom hook, also cause component use that hook to re-render;

state will be seperated created in different component when using custom hook state.

```javascript
// custom hook
import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData, // also the setting can be output
    error
  }
}

// app component
const {
  isFetching,
  error,
  fetchedData: userPlaces,
  setFetchedData: setUserPlaces,
} = useFetch(fetchUserPlaces, []);
```

## 10.3 UseHttp Hook Example
A common USEHTTP HOOK
```javascript
import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}

```

# 11. Handle Form and User Input
## 11.1 Handling form submission

### 11.1.1 submit Form
1. problem: the button in the form has default behaviour which will send request to server to submit the info. so even if you add a button with a self deined function inside, the form will excute the default, and your function will not operated.

Solution: 
  1) add a type="button" to that ```<button>```;
  2) remove the button you add and add onSubmit={handleSubmit} inside the ```<form>```, and use ``` event.preventDefault() ``` to prevent the default sumit action of itself

### 11.1.2 Handle form data
2. Handle form values: useState, ref;

3. Handling values vis FormData & Native Browser APIs

using FormData to get item by 'name' property in the form;
```javascript
function handleSubmit(event) {
  event.preventDefault();

  const fd = new FormData(event.target); // Creates a FormData object with all form data.
  const acquisitionChannel = fd.getAll('acquisition'); // Retrieves all values for the field named acquisition.
  const data = Object.fromEntries(fd.entries()); // Converts all the form data into a plain JavaScript object.
  data.acquisition = acquisitionChannel; // Replaces the acquisition field in the object with an array of all its values.
  console.log(data);
}


<div className="control">
  <label htmlFor="email">Email</label> // using htmlFor keyWord to represent the type label
  <input id="email" type="email" name="email" /> // The name here is the identifier
</div>

<div className="control-row">
  <div className="control">
    <label htmlFor="password">Password</label>
    <input id="password" type="password" name="password" />
  </div>
```

### 11.1.3 Reset form
1. use reset type
```javascript
<button type="reset" className="button button-flat"> // with <form> inside, can direct use
  Reset
</button>
```

2. reset value by function
By clearing all ref or state or event.target.reset;

## 11.2 Validation

### 11.2.1 Via state

```javascript
const emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@');

<div className="control-error">
  {emailIsInvalid && <p>Please enter a valid email address.</p>}
</div>
```

### 11.2.1 Via lost focus(Blur)
```javascript
const [didEdit, setDidEdit] = useState({ // recvord the state, blur or not.
  email: false,
  password: false,
});

const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@'); // judge the blur state then judge

function handleInputChange(identifier, value) {
  setEnteredValues((prevValues) => ({
    ...prevValues,
    [identifier]: value,
  }));
  setDidEdit((prevEdit) => ({ // when type again, set the state to false, waiting next blur judgement
    ...prevEdit,
    [identifier]: false,
  }));
}

function handleInputBlur(identifier) {
  setDidEdit((prevEdit) => ({
    ...prevEdit,
    [identifier]: true, // set blue to true
  }));
}

<input
  id="email"
  type="email"
  name="email"
  onBlur={() => handleInputBlur('email')} // add func to the blur function
  onChange={(event) => handleInputChange('email', event.target.value)}
  value={enteredValues.email}
/>
```


### 11.2.1 Via Form Submission
```javascript
<form onSubmit={handleSubmit}>
```


### 11.2.1 Via Build-in Validation Props
1. required - not allowed here to be empty
2. type - like email, will judge which is not email;
3. minLength - define a min length for this input
```javascript
<input
  id="password"
  type="password"
  name="password"
  required
  minLength={6}
/>
</div>
```
# 12. Redux

like state, is a cross component state management function.

It not just used fo  react, all JS can use redux to config state;

## 12.1 Some state basic concept

### 12.1.1 State Range:
1. Local State - via useState(), useReducer()
2. Cross-component State - Requires "prop drilling", Eg, open/close state of a modal overlay
3. App-wide State - Requires "prop drilling", Eg, user authentication statuis or chosen theme

### 12.1.2 Redux vs React Context

1. React Context has some potential disadvantage

When deal with Complex Steup & Management; Also Performance(it is not optimized for high frequency state changes);

## 12.2 How Redux Work

1. It has a central Data(State) Store

Reducer Function (Mutates (=changes) data in Store)--> Central Data(State) Store --(Subscription)--> Components --(Dispatch)--> Action --(Forwarded to)--> Reducer Function

## 12.3 Using Redux Basic

npm install redux;

Some basic usage without react
```javascript
// Import Redux
const { createStore } = require('redux');

// Initial State
const initialState = {
  count: 0,
};

// Actions
const increment = () => ({
  type: 'INCREMENT',
});

const decrement = () => ({
  type: 'DECREMENT',
});

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// Create Store
const store = createStore(counterReducer);

// Subscribe to store updates
store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// Dispatch Actions
store.dispatch(increment()); // State updated: { count: 1 }
store.dispatch(increment()); // State updated: { count: 2 }
store.dispatch(decrement()); // State updated: { count: 1 }
```

## 12.4 Using Redux in React

npm install react-redux;

### 12.4.1. Crate store
```javascript
import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true }; // miltiple state

const counterReducer = (state = initialState, action) => {

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

### 12.4.2. provide store

you can provide it in the highest level for all component used;

```javascript
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> // provide here for whole App usage
    <App />
  </Provider>
);
```

### 12.4.3 Use store And Dispatch actions(With payload)

```javascript
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const show = useSelector((state) => state.showCounter); // use multiple state from redux

  const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 10 });
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  return (
    <main className={classes.counter}> // use state;
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    </main>
  );
};
```

### 12.4.4 use redux in class component
```javascript
class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
### 12.4.5 Some tips when using

1. Do not to change the state object itself directly. return a new object to update the state value;

## 12.5 Redux Toolkit

Problem when using redux: when there are more state in one redux need to manage, every time we return, we need return everyone, so it would be quiet a lot when we add more and more state.[toolkit can solve the changes problem, so you can directly use state.xxx to change]

*** npm install react-redux ***
*** npm install @reduxjs/toolkit ***

### 12.5.1 creat Redux toolkit

```javascript
// A slice
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

// B slice
import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;

// summary slice
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';


const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
```

### 12.5.2 provide Redux toolkit

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> // here provider it store
    <App />
  </Provider>
);
```

### 12.5.3 using Redux toolkit

A component
```javascript
// A component
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

B component
```javascript
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Auth = () => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.login());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
```

## 12.6 Side Effects, Async Tasks & Redux

Reducers must be pure, side-effect free, synchronous functions;

Where should side-eeffects & async tasks to be excuted? : Inside the components(vis useEffect), and Inside the action creators

### 12.6.1 Inside the components (Via UseEffect)
Problen:
1. We need to extract method form reducer to outside component, and every component we need copy one to release te function. cause the content must be processed outside, we cannot direct change the state content.

Solution: UseEffect in App component:
```javascript
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

```
### 12.6.2 Inside the Action

Thunk: A function that delays an action until later

In App.js
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData } from './store/cart-slice';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  ...
}
```

In action.js
```javascript
import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({ // here to replace cart reducer with this actions to update data from fetch
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

```



## 12.7 Redux DevTools

Redux DevTools --- serch and insert browser extension.
https://chromewebstore.google.com/detail/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=zh-CN&utm_source=ext_sidebar


# 13. React Router

## 13.1 Page in single Page basic


## 13.2 Using router

### 13.2.1. Step 1: Defineing Routes

With '/' is absolute path, if we directly use '', thats relative path; When we programming and using is the same, depend on we use relative or absolute path.

1. Commonly used Routes
```javascript
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />, // when an wrong route is coming
    element: <RootLayout />, // This will wrap all component at the top of the page to nevigate
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:productId', element: <ProductDetailPage /> },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

```

2. Index Routes
```javascript
children: [
  { index: true, element: <HomePage /> },
  { path: 'products', element: <ProductsPage /> },
  { path: 'products/:productId', element: <ProductDetailPage /> },
],

```

### 13.2.2. nevigate
Will not refresh page and reload resources

Here we use Navlink
```javascript
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
             <NavLink
              to="/"
              className={({ isActive }) => // not className, but a funcitron
                isActive ? classes.active : undefined
              }
              // style={({ isActive }) => ({ // Two ways also can use style
              //   textAlign: isActive ? 'center' : 'left',
              // })}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

```

### 13.2.3. Root Layout to nevigate

the ```<Outlet>``` component is used for rendering nested routes. It acts as a placeholder in a parent route component where the child routes will be rendered. If the page has children pages, use it. and add childre[] in router config

```javascript
import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import classes from './Root.module.css';

function RootLayout() {
  return (
    <>
      <MainNavigation /> // in MainNavigation, using ol li to list every page and link
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;


element: <RootLayout />, // This will wrap all component at the top of the page to nevigate
children: [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/:productId', element: <ProductDetailPage /> },
],
```

### 13.2.4 Error Page
```javascript
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  return (
    <>
      <MainNavigation /> // needed the navigation to route
      <main>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
}

export default ErrorPage;
```

### 13.2.5. nevigate programmaly

1. Basic navigate to some link programming
```javascript
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); // there are many charateris in navigate

  function navigateHandler() {
    navigate('/products'); // to related apge
  }

  return (
    <>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}
```

2. Dynamic Routes
```javascript
// Detail Page
import { useParams } from 'react-router-dom';
const params = useParams();
<p>{params.productId}</p> // here can use content what we put in the url

// Product Page
<ul>
  {PRODUCTS.map((prod) => (
    <li key={prod.id}>
      <Link to={`/products/${prod.id}`}>{prod.title}</Link>
    </li>
  ))}
</ul>

// App.js Router config
{ path: '/products/:productId', element: <ProductDetailPage /> }
```

## 13.3 Route with Fetch Data

### 13.3.1 Loader function

Before component render, loader can trigger to do something.

1. Fetch data from router with loder
```javascript
import EventsPage, { loader as eventsLoader } from './pages/Events';

path: 'events',
element: <EventsRootLayout />,
children: [
  {
    index: true,
    element: <EventsPage />,
    loader: eventsLoader, // add loader here;
  },
  { path: ':eventId', element: <EventDetailPage /> },
  { path: 'new', element: <NewEventPage /> },
  { path: ':eventId/edit', element: <EditEventPage /> },
],
```

2. Add data in pour page component

We can use in event page, Or directly use it in the eventsList components; the same usage wat;

We can use that data in same/lower level of that route, but not use in upper;
```javascript
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData(); // getting the data

  return <EventsList events={events} />;
}

export default EventsPage;

// here we make related fucntion together in corrsponding place;
export async function loader() { // export the loader data to app.js router config to use this method;
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // method 1:
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    }); // Error handling

    // method 2:
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events; // or direclty using return reponse;
  }
}
```
***Important***: loader()s must return null or any other value

When we deal error from reponse: in Error.js

```javascript
import { useRouteError } from 'react-router-dom';
const error = useRouteError();

// method 1:
if (error.status === 500) {
  ...
}
message = JSON.parse(error.data).message;
// method 2:
message = error.data.message;
```


### 13.3.2 action() function
Using action() function to fetch post data provided by router

```javascript
// In the page side:
import { json, redirect } from 'react-router-dom';

import EventForm from '../components/EventForm';

function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/events');
}
```
At the app.js
```javascript
{ path: 'new', element: <NewEventPage />, action: newEventAction },
```

In the form or some triggered component(EventForm, Triggered by default method):

```javascript
return (
    <Form method='post' className={classes.form}> // this post method will automatically trigger that function.

    ...
)
```

Triggered by programmatically way:

```javascript
export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  ...
}


// In component clock function:
const submit = useSubmit();

function startDeleteHandler() {
  const proceed = window.confirm('Are you sure?');

  if (proceed) {
    submit(null, { method: 'delete' }); // using the useSubmit to transfer the info
  }
}
```

### 13.3.3 useFetcher() function

`useFetcher()` is a hook provided by React Router that allows you to interact with resources or forms programmatically in your components. It's particularly useful when you need more control over how a resource is fetched, submitted, or reloaded, without triggering a full page navigation or relying on traditional form elements.

***Purpose of `useFetcher()`***

1. **Fetch Resources**: You can use `useFetcher()` to fetch data from the server without navigating away from the current page.
2. **Submit Forms**: It allows you to programmatically submit forms, providing more control over the process.
3. **Handle Side Effects**: `useFetcher()` provides methods to handle loading states, errors, and responses effectively.

***How `useFetcher()` Works***

When you use `useFetcher()`, it returns an object containing various methods and properties to manage the fetching or submission process. These include:

- `fetcher.load()`: Load a resource without a form submission.
- `fetcher.submit()`: Submit a form programmatically.
- `fetcher.data`: The data returned from the load or submit request.
- `fetcher.state`: The current state of the fetcher (`idle`, `loading`, `submitting`).
- `fetcher.formAction`: The action URL for the form submission.

***Example***

Here's an example that demonstrates how to use `useFetcher()` to submit a form and fetch data.

```jsx
import { useFetcher } from 'react-router-dom';

function NewsletterSignup() {
  const fetcher = useFetcher();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetcher.submit(formData, { method: 'post', action: '/subscribe' });
  };

  return (
    <fetcher.Form method="post" action="/subscribe" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Enter your email" required />
      <button type="submit">Subscribe</button>
    </fetcher.Form>
  );
}
```

In this example:
- `fetcher.Form` is a special form component that behaves like a regular HTML form but is managed by `useFetcher`.
- The `handleSubmit` function handles the form submission, where `fetcher.submit()` is used to programmatically submit the form data to the specified action URL (`/subscribe`).


### 13.3.4 defer()

`defer()` is a function provided by React Router to handle deferred data loading for components. It allows you to fetch data asynchronously while rendering the initial UI. This is particularly useful for improving the perceived performance of your application by rendering parts of the UI immediately while fetching the necessary data in the background.

***Purpose of `defer()`***

- **Improved Performance**: By deferring the loading of non-essential data, you can render parts of your UI faster, which enhances the user experience.
- **Concurrent Rendering**: React Router can start rendering a page or component while waiting for data, showing a loading state or skeleton until the data arrives.
- **Flexibility**: `defer()` allows you to load different pieces of data at different times, so you can prioritize what gets rendered first.

***How `defer()` Works***

When you use `defer()`, you wrap the data fetching function inside it, which returns a `Promise`. React Router handles the promise and allows the component to render immediately while the data is being fetched in the background.

***Example***

Let's create a route that uses `defer()` to load user data while displaying a loading state.

```jsx
import { defer, useLoaderData, Await } from 'react-router-dom';

async function fetchUser() {
  const response = await fetch('/api/user');
  return response.json();
}

export function loader() {
  return defer({
    user: fetchUser()
  });
}

function UserProfile() {
  const { user } = useLoaderData();

  return (
    <div>
      <h1>User Profile</h1>
      <React.Suspense fallback={<div>Loading user data...</div>}>
        <Await resolve={user}>
          {(userData) => (
            <div>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}
        </Await>
      </React.Suspense>
    </div>
  );
}
```

***Explanation***

1. **`fetchUser()`**: This is an asynchronous function that fetches user data from an API.
  
2. **`loader()`**: This function uses `defer()` to wrap the `fetchUser()` call. It returns an object where the key (`user`) holds the promise returned by `fetchUser()`.

3. **`UserProfile` Component**: 
   - Inside this component, `useLoaderData()` is used to access the deferred data.
   - `React.Suspense` is used to handle the loading state while the user data is being fetched.
   - `Await` is a component that waits for the promise to resolve before rendering the content. It also handles the resolved data (`userData`) and renders it.


# 14. Adding Authentication To React

Authentication is needed if c ontent should be protected;

## 14.1 Brief Introduce

**Getting Permission**
Client and server can\t just exchange a "Yes"

**Two methods:**
1. Server -side Sessions (backend always store info)

Store unique indentifier on server, send same identifier to client;

Client sends Identifier along with requests to protected resorces;

Server can then check if the identifier is valid(=previously issued by server to client)

2. Authntication Tokens

Create(but not store) "permission" token on server & send it to the client (when sign in)

Client attaches token to future requests for protected resources

Server can then vertify the attached token

## 14.2 Implementation

### 14.2.1 Add Token and use it

1. Auth Page side:

```jsx
import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json(); // Adding token here
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}

```

2. utils:

```jsx
export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}
```

page Detail:
```jsx
export async function action({ params, request }) {
  const eventId = params.eventId;

  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  ...
}
```

3. Components:

```jsx
function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}
```

4. Logout to remove it

```jsx
import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
}
```


### 14.2.2 Using token valiable status to control component and content showing

```jsx
import { NavLink, useRouteLoaderData } from 'react-router-dom';

const token = useRouteLoaderData('root'); // use this token to hide or show content
```


### 14.2.3 Adding Rute protection

protection Action:
```jsx
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}
```

Protected to router
```jsx
{
  path: 'edit',
  element: <EditEventPage />,
  action: manipulateEventAction,
  loader: checkAuthLoader,
},
```


### 14.2.4 Automatic Logout

Utils:
```jsx
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
```

Root:
```jsx
function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  ...
}
```

# 15. Deploying React Apps

## 15.1 Deploying Steps

Before Deploying: Test code, Optimize code with experience & performace

Build App: Run build process to parse, transform & optimize code

Upload App: Upload production code to hosting server

Configure Server: Ensure app is served securely & as intended

## 15.2 Lazy loading

Load code only when they are needed

inthe router app.js file
```jsx
import { lazy, Suspense } from 'react';

const BlogPage = lazy(() => import('./pages/Blog'));

{
  index: true,
  element: (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogPage />
    </Suspense>
  ),
  loader: () =>
    import('./pages/Blog').then((module) => module.loader()),
}
```


## 15.3 Building code for production

`npm run build`
Once finished, there is a build folder; the static - js folder, contain all file code you write

## 15.4 Deployment Example

A React SPA is a "static Website", it only HTML, CSS & Javascript, content no code run on server - A static site host is needed

### 15.4.1 Provides: Firebase Hosting
Build - hosting - get Started - Copy command and excute on our command - firebae login with website provided

Option: use an exiting project
Select a default firebase project for this directory: choose our directory
What do you want to use as your public directory: build(the content we build here)
Configure as a single-page app: yes (this is important when we have no server host, using app router, make sure always client side routing is using rather than server side.)
Set up automatic builds and deploys with github: n
File build/index.html already exits, overwrite?: n

The we click next step and run `firebase deploy`

Then it gives us a url we can use

Extra:
run `firbase hosting disable` : will take your site offline


# 16. React Query/Tanstack Quert: Handling HTTP with ease

## 16.1 Introduction

A library that helps with sending HTTP requests & keeping your frontend UI in **sync**.

Disadvantage of UseEffect & Fetch: Too many code, custom hook may improve somehow, but still some disadvantage

images are feched and (potentially) cached by the browser - React & React Query are not involved.

## 16.2 Installing and Set up using tanstack

`npm install @tanstack/react-query`

In the event page:
```js
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

const { data, isPending, isError, error } = useQuery({ // more data can be found in this return object
  queryKey: ['events'], // could have multiple values, with string, object, array ...
  queryFn: fetchEvents,
  // the following control how long data be kept
  staleTime: 5000, // fetch after 5000ms, default is 0 fetch immedialy; make sure some cache data can be re-used without fetch again
  gcTime: 30000 // default is 5s, cache data will be lept at gctime and then would be discarded
});
```

Set up a utils/http.js file
```js
export async function fetchEvents() {
  const response = await fetch('http://localhost:3000/events');

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
```

For App router file:
```js
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

## 16.3 Configure Query Behaviour

### 16.3.1 Dynamic function and aboring

By constructing a query key dynamically, React Query can cache (and reuse) different data for different keys based on the same query;

Two param to object: signal and searchTerm. the signam can be used internally to stop this request if they receive that signal

For the events:
```js
const [searchTerm, setSearchTerm] = useState();

// isLoading will be false if the enabled is disabled rather than isPending;
const { data, isLoading, isPending, isError, error } = useQuery({
  queryKey: ['events', { search: searchTerm }],
  queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }), // add dynamic searchTerm here
  enabled: searchTerm !== undefined // to control useQuery is disable or enable
});

function handleSubmit(event) {
  event.preventDefault();
  setSearchTerm(searchElement.current.value);
}
```

For the utils, using the dynamic key:
```js
export async function fetchEvents({ signal, searchTerm }) {

  let url = 'http://localhost:3000/events';

  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  const response = await fetch(url, { signal: signal }); // signal if received to abort

  ...
}
```

### 16.3.2 Change data with Mutations

For the mutation, we should add event to excute after the event;

For the event apge:
```js
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../util/http.js';

const { mutate, isPending, isError, error } = useMutation({ // isPending tells the action is on its way
  mutationFn: createNewEvent, // we do not need attach data here
  onSuccess: () => {
    queryClient.invalidateQueries({ 
      queryKey: ['events'],
      refetchType: 'none' // will not triggered again whenwe back, not immediatly
    });
    navigate('/events'); // define the action after mutation
  },
});

function handleSubmit(formData) {
  mutate({ event: formData }); // data is here
}
```

For the utils:
```js
export const queryClient = new QueryClient();

export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}
```

### 16.3.3 Optmistic Updating

Update the apge immediatly without refreshing page

```js
const { mutate } = useMutation({
  mutationFn: updateEvent,
  onMutate: async (data) => {
    const newEvent = data.event;

    await queryClient.cancelQueries({ queryKey: ['events', params.id] }); // if we had any outgoing queries for that key, those query will be canceled
    const previousEvent = queryClient.getQueryData(['events', params.id]); // get previous data if error coming, we roll back.

    queryClient.setQueryData(['events', params.id], newEvent); // manpualte data without waiting for a response

    return { previousEvent };
  },
  onError: (error, data, context) => {
    queryClient.setQueryData(['events', params.id], context.previousEvent);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['events', params.id]);
  }
});
```

# 17. Animating React App

## 17.1 Just CSS might be enough

### 17.1.1 Using transition
FOr the jsx Files:
```js
// For a drop button up or down
<div className={`challenge-item-details ${isExpanded ? 'expanded' : ''}`}>
  <p>
    <button onClick={onViewDetails}>
      View Details{' '}
      <span className="challenge-item-details-icon">&#9650;</span>
    </button>
  </p>

  ...
</div>

// For Modal transition
```

For the css file:
```css
.challenge-item-details-icon {
  display: inline-block;
  font-size: 0.85rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease-out; // all transition, add transform, also can use all here; 0.3s means duration;
}

.challenge-item-details.expanded .challenge-item-details-icon {
  transform: rotate(180deg);
}
```

### 17.1.2 Using CSS animation


FOr the jsx Files:
```js

```

It can using `keyframes` Even your component is not shown before it click out. like modal;

For the css file:
```css
.modal {
  top: 10%;
  border-radius: 6px;
  padding: 1.5rem;
  width: 30rem;
  max-width: 90%;
  z-index: 10;
  animation: slide-up-fade-in 0.3s ease-out forwards;
}

@keyframes slide-up-fade-in {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```


## 17.2 Build Complex Animation with Framer Motion

With complex animation, or like modal to cancel out, we can not use just CSS;

`npm install framer-motion`

replace `div` with `motion/div`, also other html content is the same; and also add `animate` and `trabsition` property to control it.

### 17.2.1 Some element Basic usage

Using **animate** when we have some flag or value control start or disapear
For the button icon:
```js
<motion.span // using motion.span to replace span
  animate={{ rotate: isExpanded ? 180 : 0 }} // add animate here
  className="challenge-item-details-icon"
>
  &#9650;
</motion.span>
```

Using **initial** and **exit** to show the start and end state

**variants**:it can be used to nested to reuse;

For the modal:
```js
<motion.dialog
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 30 }}
  // variants={{ // Using variants as values
  //   hidden: { opacity: 0, y: 30 },
  //   visible: { opacity: 1, y: 0 }
  // }}
  // initial="hidden"
  // animate="visible"
  // exit="hidden"
  open
  className="modal"
>
  <h2>{title}</h2>
  {children}
</motion.dialog>
```

For a button:
```js
<motion.button
  whileHover={{ scale: 1.1 }} // when hober
  transition={{ type: 'spring', stiffness: 500 }}
  onClick={handleStartAddNewChallenge}
  className="button"
>
  Add Challenge
</motion.button>
```

For ul and li:
```js
<motion.ul 
  id="new-challenge-images" 
  variants={{
    visible: { transition: { staggerChildren: 0.05 } } show li child one by one comes out
  }}>
  {images.map((image) => (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: [0.8, 1.3, 1] },
      }}
      exit={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring' }}
      key={image.alt}
      onClick={() => handleSelectImage(image)}
      className={selectedImage === image ? 'selected' : undefined}
    >
      <img {...image} />
    </motion.li>
  ))}
</motion.ul>
```

### 17.2.2 Imperative Animation

Here adding a shake effect for input when invalid submit
```js
import { motion, useAnimate, stagger } from 'framer-motion';

const [scope, animate] = useAnimate();

if (!challenge.title.trim() || !challenge.description.trim()) {
  animate(
    'input, textarea',
    { x: [-10, 0, 10, 0] }, // shape from left to right
    { type: 'spring', duration: 0.2, delay: stagger(0.05) } // stagger to shake not the same time
  );
}
```

### 17.2.2 Animate Layout

Like li in verticle, if we add **layout**, when we move first one, the second one will move to top in animation
```js
// for the child component
<motion.li layout>
  ...
</motion.li>
```

Using **AnimatePresence** to package the child; Used to automatically clean up animation elements that are no longer needed at the end of the animation

For the parent compoent;
```js
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence> 
  <ChallengeItem
    key={challenge.id}
    challenge={challenge}
  />
</AnimatePresence>
```

For the underLine, using **layoutid** to identify

Cause here is a union id, so when change tab, this id not change, it will move smoothly with animate
```js
{isSelected && <motion.div layoutId="tab-indicator" className="active-tab-indicator" />}
```


## 17.3 Scroll-based Animations

For the header:
```js
import { motion, useScroll, useTransform } from 'framer-motion';


const { scrollY } = useScroll();
const yCity = useTransform(scrollY, [0, 200], [0, -100]);
const opacityCity = useTransform(
  scrollY,
  [0, 200, 300, 500],
  [1, 0.5, 0.5, 0]
);
const yHero = useTransform(scrollY, [0, 200], [0, -150]);
const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);
const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);


<header id="welcome-header">
  <motion.div
    id="welcome-header-content"
    style={{ scale: scaleText, y: yText }}
  >
    <h1>Ready for a challenge?</h1>
    <Link id="cta-link" to="/challenges">
      Get Started
    </Link>
  </motion.div>
  <motion.img
    style={{ opacity: opacityCity, y: yCity }}
    src={cityImg}
    alt="A city skyline touched by sunlight"
    id="city-image"
  />
  <motion.img
    style={{ y: yHero, opacity: opacityHero }}
    src={heroImg}
    alt="A superhero wearing a cape"
    id="hero-image"
  />
</header>
```




# 101 Some tips
1. When fetch img src from backend

Sometime backend just give back a path rather than whole src, so you should add a url to the img src + that path

```javascript
<img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
```

2. Formatting data

one u can use is Intl.NumberFormat
```javascript
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
```
3. Nested JSX is that it must return a single element
4. Comments: `{/* */}` to wrap around the comment text.


# 102 MUI Usage


