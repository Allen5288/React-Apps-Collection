import { useState } from "react";
import { Link } from "react-router-dom";
import Results from "./components/Result/Resutl";
import UserInput from "./components/UserInput/UserInput";
import { calculateInvestmentResults } from "./investment";
import "./InvestmentCalculator.css";

function InvestmentCalculator() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const [result, setResult] = useState([]);

  const inputIsValid = userInput.duration >= 1;

  function onChange(inputIdentifier, newValue) {
    setUserInput((previousValue) => {
      return {
        ...previousValue,
        [inputIdentifier]: +newValue, // + force convert this string to number value
      };
    });
  }

  return (
    <div id="investment-calculator">
      <header id="header">
        <img
          src="https://th.bing.com/th/id/R.e5a4081f4c8b3dfc8beafb3ca767e587?rik=Z4j4hpX2Y1uoKQ&pid=ImgRaw&r=0"
          alt="Logo showing a money bag"
        />
        <h1>Investment Calculator</h1>
      </header>

      <UserInput userInput={userInput} onChange={onChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results input={userInput} />}
    </div>
  );
}

export default InvestmentCalculator;
