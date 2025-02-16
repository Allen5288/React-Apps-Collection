# 1. Track change and value

## 1.1 Using State:
```js
import { useState } from "react";
const [progressBars, setProgressBars] = useState([]);

// Create a new progress bar with initial progress set to 0
const newProgressBar = {
    id: progressBars.length,
    progress: 0,
};

// Add the new progress bar to the state
setProgressBars((prevBars) => [...prevBars, newProgressBar]);

updateProgress(newProgressBar);
```

## 1.2 Using Memo
```js
// for 
const totalPages = useMemo(() => Math.ceil(users.length / pageShowNum), [pageShowNum]);

const paginatedUsers = useMemo(() => {
    const startIdx = (currPage - 1) * pageShowNum;
    return users.slice(startIdx, startIdx + pageShowNum);
}, [currPage, pageShowNum]);
```

## 1.3 UseEffect

```js
const [currIndex, setCurrIndex] = useState(0);

// Start the cycle on mount
useEffect(() => {
    const timeoutId = setTimeout(() => {
        setCurrIndex((prevIndex) => (prevIndex + 1) % cycleLight.length);
    }, cycleLight[currIndex].time);

    return () => clearTimeout(timeoutId);
}, [currIndex]); // Dependency on currIndex to change light after each cycle
```

# 2. Redener Related

## 2.1 Using requestAnimationFrame

requestAnimationFrame:
- requestAnimationFrame ensures that the progress bar update happens in sync with the browser's rendering cycle, leading to smoother animations.
- The progress is updated using timestamp, which provides a more accurate and smoother update compared to setInterval.

Progress Calculation:
- The progress is updated based on the time elapsed, calculated as (elapsedTime / 2000) * 100, so the progress bar takes exactly 2 seconds (2000ms) to fill up.
The Math.min function ensures the progress never exceeds 100%.
```js
function updateProgress(progressBar) {
    const startTime = performance.now(); // Get the start time of the animation

    function animateProgress(timestamp) {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min((elapsedTime / 2000) * 100, 100); // 2000ms = 2 seconds

        setProgressBars((prevBars) =>
            // Setting State --- progress
        );

        // Continue the animation until it reaches 100%
        if (progress < 100) {
            requestAnimationFrame(animateProgress); // Keep animating
        }
    }

    // Start the animation
    requestAnimationFrame(animateProgress);
}
```

## 2.2 Use const func and pre-reuest to render

```js
const Alert = ({ message }) => (
  <div className="alert">
    <div className="arrow"></div>
    {message}
  </div>
);

const [alertMessages, setAlertMessages] = useState({
    loadAmount: "",
    loadTerm: "",
    InterestRate: "",
});

if (loanInfo.loadTerm && !Number.isInteger(Number(loanInfo.loadTerm))) {
    newAlertMessages.loadTerm = "Loan term should be an integer.";
}

if (loanInfo.InterestRate && !/^(\d+(\.\d{1,2})?)$/.test(loanInfo.InterestRate)) {
    newAlertMessages.InterestRate = "Interest rate must be a valid number with up to 2 decimal places.";
}

<div className="form-group">
    <label>{label}: </label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
    />
    {alertMessage && <Alert message={alertMessage} />}
</div>
```

## 2.3 Using map to render

### 2.3.1 Basic With Map:
```js
<div>
    {progressBars.map((bar) => (
        <div key={bar.id}>
        <div className="progress-bar-outer">
            <div
                className="progress-bar-inner"
                // Using variable and configure style in html dynamic
                style={{ width: `${bar.progress}%`, }}
            ></div>
        </div>
        </div>
    ))}
</div>

// we can using the index from array
<div className="dice-area">
    {diceRender.map((value, index) => (
        <Dice key={index} value={value} />
    ))}
</div>
```
### 2.3.2 Using Filter + Map additional
```js
<div className="tab-content">
    {textList
        .filter((tab) => tabSelect === tab.id)
        .map((tab) => (
        <TabContent key={tab.id} content={tab.content} />
    ))}
</div>
```

```js
{Array.from({ length: 5 }).map((_, index) => {
    const isFilled = index < tempHighlightNum;
    return (
        <Star 
            key={index}
            isFilled={isFilled}
        />
    );
})}
```

## 2.4 HTML and CSS conditional

- CSS:
```js
className={`normal-button ${["like-loading", "like"].includes(buttonStatus) ? "like-button" : ""}`}

disabled={buttonStatus === "like-loading""}

{buttonStatus === "like-loading" ? (<SpinnerIcon className="icon-set" />) 
                                : (<HeartIcon className="icon-set" />)
                                }

{buttonStatus === "like-loading" ? "Loading..." : "Like"}
```

## 2.5 Component Transfer params

```js
const Star = ({ isFilled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`star-icon ${isFilled ? "star-icon-filled" : ""}`}
      className={`light ${light.color} ${index === currIndex ? "active" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        ...
      />
    </svg>
  );
};

<Star
    key={index}
    isFilled={isFilled}
    onClick={() => selectStar(index + 1)}
    onMouseEnter={() => handleMouseEnter(index + 1)}
    onMouseLeave={handleMouseLeave}
/>
```


# 3. Hierarchy

- For multiple layers, like file system.
```js
// State to manage the expanded/collapsed directories
const [expanded, setExpanded] = useState({});

// Recursive function to render files and directories
const renderFileTree = (items, isFirstLevel = false) => {
return items
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
    .map((item) => (
    <div
        key={item.id}
        className="file-tree-item"
        style={{ marginLeft: item.children ? 20 : 0 }}
    >
        {/* Render directory or file */}
        {item.children ? (
        <div className="directory">
            <span
            onClick={() => toggleExpand(item.id)}
            className="toggle-btn"
            >
            {expanded[item.id] ? "[-]" : "[+]"}
            </span>
            <span className="directory-name">{item.name}</span>
            {expanded[item.id] && renderFileTree(item.children)}
        </div>
        ) : (
        <div className={`file ${isFirstLevel ? "file-first-level" : ""}`}>
            {item.name}
        </div>
        )}
    </div>
    ));
};
```
# 4. Request

## 4.1 Post

```js
// Handle button click with API request
const handleClick = useCallback(async () => {
    const url = "https://www.greatfrontend.com/api/questions/like-button";
    const requestBody = { action: currStatus };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Success:", data);
            // Toggle the button state after success
            setButtonStatus(currStatus === "like" ? "unlike" : "like");
        } else if (response.status === 500) {
            const data = await response.json();
            console.error("Failure:", data);
            setButtonStatus(currStatus); // Restore previous status in case of failure
            setAlertStatus(true);
        } else {
            console.error("Unexpected status code:", response.status);
            setButtonStatus(currStatus);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        setButtonStatus(currStatus); // Restore previous status if an error occurs
    }
}, [buttonStatus]);
```

# 90 Syntax Quick Search For React Basic

## 0. Render

```jsx
// for JSX
ReactDOM.render(JSX/*componentToRender*/, document.getElementById('root')/*targetNode*/)

// for component
ReactDOM.render(<ComponentToRender />, document.getElementById('root'))
```

## 1. Component or Function

```jsx
// stateless function
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};

// class component
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi {this.props.xxx}</h1> // access props with this
    );
  }
}
```

## 3. props
Use default props
```jsx
// props to stateless func
const Welcome = (props) => <h1>Hello, {props.user}!</h1>

const ShoppingCart = (props) => {
  return <h1>Hello, {props.user}!</h1>
}
// set default prop
MyComponent.defaultProps = { location: 'San Francisco' }
// set prop type: quantity should be a number and required
MyComponent.propTypes = { quantity: PropTypes.number.isRequired }

// passing array to props
const ChildComponent = (props) => <p>{props.colors.join(', ')}</p>
<ChildComponent colors={["green", "blue", "red"]} />
```

## 4. State

State with class
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // define the state
      text: 'freeCodeCamp',
      visibility: 'false',
      counter: 1,
    }
    // bind hancleClick to this
    this.handleClick = this.handleClicks.bind(this);
  }
  handleClicks() {
    // three ways to setState
    this.setState({text: "You clicked!"});
    this.setState(state => ({
      visibility: !state.visibility
    }))
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
  }
  render() {
    this.setState({ // change the state
      name: 'React Rocks!'
    })
    const name = this.state.name; // directl write JS after render before return
    return (
      <div>
        <h1>{name}</h1>
        <GetInput input={this.state.text} handleChange={this.handleClicks}/>
      </div>
    );
  }
};

// passing state between class
class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};
```

## 5. LifeCycle method

- The **componentWillMount()** method is called before the render() method when a component is being mounted to the DOM
- The best practice with React is to place API calls or any calls to your server in the lifecycle method **componentDidMount()**. This method is called after a component is mounted to the DOM. 
- **The componentDidMount()** method is also the best place to attach any event listeners you need to add for specific functionality. 
- **componentWillUnmount()** It's good practice to use this lifecycle method to do any clean up on React components before they are unmounted and destroyed.
- when child components receive new state or props, and declare specifically if the components should update or not. The method is **shouldComponentUpdate()**, and it takes nextProps and nextState as parameters.

```jsx
shouldComponentUpdate(nextProps, nextState) {
  // only when return true, component will render
  if (nextProps.value % 2 === 0) return true;
}
```

## 6. DOM operation

EventListener:
```js
componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
}
componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
}
```

## 7. Inline Style

```jsx
// set it equal to a JavaScript object, using : 16 or :'16px';
<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>

// using const global style object for styling
const styles = { color: "purple", fontSize: 40, border: '2px solid purple' }
class Colorful extends React.Component {
  render() {
    return (
      <div style={styles}>Style Me!</div>
    );
  }
};
```

## 8. Condition Render

```jsx
render (){
  const buttonOne = ...

  // Directly using If and else
  if(..) {
    return (...)
  } else {
    return (...)
  }

  // concise conditional
  {condition && <p>markup</p>}

  // ternary conditional
  {this.state.userAge ?
    parseInt(this.state.userAge, 10) < '18' ?
      buttonThree : buttonTwo // no need to add {} for button
    : buttonOne
  }

  // with directly return, no {} needed
  return  this.props.fiftyFifty ? <h1>You Win!</h1> : <h1>You Lose!</h1> 
}
```

Render with Style
```jsx
// Change Inline CSS Conditionally
let inputStyle = {
  border: '1px solid black'
};
if (this.state.input.length > 15) {
  inputStyle.border = '3px solid red';
}
```

## 9. Dynamic Render with map

```jsx
const usersOnline = this.state.users.filter(user => user.online === true);
const renderOnline = usersOnline.map((item, index) => (
  <li key={index}>{item.username}</li>
));
```

## Render

Render on server:
```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};

ReactDOMServer.renderToString(<App />)
```


# 99 Application Build

## 1. Timer

Get Current Time related:
```js
const [time, setTime] = useState(new Date());

const hours = time.getHours().toString().padStart(2, "0");
const minutes = time.getMinutes().toString().padStart(2, "0");
const seconds = time.getSeconds().toString().padStart(2, "0");
const timeString = `${hours}:${minutes}:${seconds}`;
```

# 100 Some Component Prac

## 1. tab
https://www.greatfrontend.com/questions/user-interface/tabs/react?framework=react

## 2. table
https://www.greatfrontend.com/questions/user-interface/data-table/v/5d38f5e6-acd2-4d79-8d32-4d434ba5c727

```js
<table>
    <thead>
        <tr>
        {["ID", "Name", "Age", "Occupation"].map((label) => (
            <th key={label}>{label}</th>
        ))}
        </tr>
    </thead>
    <tbody>
        {paginatedUsers.map(({ id, name, age, occupation }) => (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{occupation}</td>
        </tr>
        ))}
    </tbody>
</table>
```

## 3. Select
```js
<select value={pageShowNum} onChange={handlePageSelectChange}>
    {[5, 10, 15].map((num) => (
    <option key={num} value={num}>
        Show {num}
    </option>
    ))}
</select>
```

## 4. Button
```js
<button
    className="page-change-button"
    onClick={() => changePage(-1)}
    disabled={currPage === 1}
>
    Prev
</button>
```

## 5. Input

```js
<input
    className="roll-text-input"
    type="number"
    name="diceNumber"
    value={diceNumber}
    onChange={onChange}
    min="1"
    max="12"
/>
```

## 6. Model

https://www.greatfrontend.com/questions/user-interface/modal-dialog

```js
<div className="modal-wrapper">
    {/* Button to open modal */}
    {!modalStatus && (
    <button className="open-modal-btn" onClick={switchModal}>
        Show Modal
    </button>
    )}

    {/* Modal */}
    {modalStatus && (
    <>
        {/* model backdrop */}
        <div className="modal-backdrop" onClick={switchModal}></div>
        {/* model self */}
        <div className="modal">
        <h2 className="modal-header">{title}</h2>
        <div className="modal-content">{children}</div>
        <button className="close-modal-btn" onClick={switchModal}>
            Close
        </button>
        </div>
    </>
    )}
</div>
```

```css
/* Backdrop when the modal is open */
.modal-backdrop {
  position: fixed; /* Fixed positioning to cover the entire viewport */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  right: 0; /* Align to the right */
  bottom: 0; /* Align to the bottom */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  z-index: 999; /* Make sure the backdrop is behind the modal but above other content */
  opacity: 0; /* Initial opacity for fade-in effect */
  animation: fadeIn 0.3s forwards; /* Fade-in animation */
}

/* Modal container */
.modal {
  position: fixed; /* Fixed position to make it stay in the same place when scrolling */
  top: 50%; /* Vertically center the modal */
  left: 50%; /* Horizontally center the modal */
  transform: translate(-50%, -50%); /* Center the modal exactly */
  background-color: white; /* White background for the modal */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Slight shadow for a lifted effect */
  padding: 20px; /* Padding inside the modal */
  z-index: 1000; /* Make sure the modal is above the backdrop */
  opacity: 0; /* Initial opacity for fade-in effect */
  animation: modalFadeIn 0.3s forwards; /* Fade-in animation */
}
```


# 200 MUI Usage




