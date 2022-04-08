import React, { useReducer } from "react";
import "./index.css";
import Display from "./components/Display.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
import Button from "./components/Button";

function App() {
  const initialState = {
    display: "0",
    record: [],
  };
  const limit = 16;
  const operators = ["+", "-", "*", "/"];
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { display, record } = state;
    let updatedDisplay = display;
    let len = display.length;

    switch (action.type) {
      case "clear":
        return { ...state, display: initialState.display };
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (len >= limit) return state;
        if (
          display === "0" ||
          display === "Error!" ||
          display === "NaN" ||
          display === "Infinity"
        ) {
          updatedDisplay = action.type;
        } else if (
          display.charAt(len - 1) === "0" &&
          operators.includes(display.charAt(len - 2))
        ) {
          updatedDisplay = display.substring(0, len - 1) + action.type;
        } else {
          updatedDisplay = display + action.type;
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (len >= limit) return state;
        if (action.type === "-") {
          //if symbol is '-' append the new operator ('-')
          //check to see if the last 2 digits are operators in which case  do not add any more minus signs
          if (
            !operators.includes(display[len - 1]) ||
            !operators.includes(display[len - 2])
          ) {
            updatedDisplay = display + action.type;
          }
        } else if (!operators.includes(display[len - 1])) {
          //else if lastChar is not a operator then append the new operator
          updatedDisplay = display + action.type;
        } else {
          //loop through from the end of the string removing any operators before adding the new operator
          for (let i = len - 1; i >= 0; i--) {
            if (operators.includes(display[i])) {
              updatedDisplay = updatedDisplay.slice(0, -1);
              console.log(updatedDisplay);
            } else break;
          }
          updatedDisplay = updatedDisplay + action.type;
        }

        break;
      case ".":
        let appendDecimal = true; //set to true but check if the currentNumber already has a decimal and if so set to false
        let lastOperatorPos = -1;
        for (let operator of operators) {
          let symPos = display.lastIndexOf(operator);
          if (symPos > lastOperatorPos) lastOperatorPos = symPos;
        }
        let currentNumber = display;
        if (lastOperatorPos !== -1)
          currentNumber = display.slice(lastOperatorPos + 1);
        if (currentNumber.includes(".")) appendDecimal = false;
        if (len >= limit) return state;
        if (appendDecimal) updatedDisplay = display + ".";
        break;
      case "=":
        try {
          updatedDisplay =
            Math.round(eval(updatedDisplay.replace("--", "- -")) * 100000) /
            100000;
        } catch (e) {
          updatedDisplay = "Error!";
        }
        let updatedRecord = [display + " = " + updatedDisplay];
        return {
          record: [updatedRecord, ...record],
          display: updatedDisplay.toString(),
        };
      default:
        throw new Error();
    }
    return { ...state, display: updatedDisplay };
  }

  return (
    <>
      <div id="calculator">
        <Display content={state.display} />
        <div id="button-container">
          <Button id="seven" type="7" dispatch={dispatch} />
          <Button id="eight" type="8" dispatch={dispatch} />
          <Button id="nine" type="9" dispatch={dispatch} />
          <Button id="add" type="+" dispatch={dispatch} />
          <Button id="clear" type="clear" content="C" dispatch={dispatch} />
          <Button id="four" type="4" dispatch={dispatch} />
          <Button id="five" type="5" dispatch={dispatch} />
          <Button id="six" type="6" dispatch={dispatch} />
          <Button id="subtract" type="-" dispatch={dispatch} />
          <Button id="one" type="1" dispatch={dispatch} />
          <Button id="two" type="2" dispatch={dispatch} />
          <Button id="three" type="3" dispatch={dispatch} />
          <Button id="multiply" type="*" dispatch={dispatch} />
          <Button id="equals" type="=" dispatch={dispatch} />
          <Button id="zero" type="0" dispatch={dispatch} />
          <Button id="decimal" type="." dispatch={dispatch} />
          <div className="blank">
            <FontAwesomeIcon icon={faFreeCodeCamp} />
          </div>
          <Button id="divide" type="/" dispatch={dispatch} />
        </div>
      </div>
      <div id="results">
        <ul>
          {state.record.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
