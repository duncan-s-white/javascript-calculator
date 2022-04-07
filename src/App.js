import React, { useReducer } from 'react';
import './index.css';
//import Button from './components/Button.js';
import Display from './components/Display.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'

function App() {

  const initialState = {
    display: '0',
    record: []
  };
  const limit =  16;
  const operators = ['+', '-', '*', '/'];
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action){

    let updatedDisplay = state.display;
    let len = state.display.length;

    switch (action.type) {
      case 'clear':
        return {...state, display: initialState.display};
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if(len >= limit) return state;
        updatedDisplay = (state.display !== '0' ? state.display : '') + action.type;
        break;
      case '+':
      case '-':
      case '*':
      case '/':

        if(state.display.length >= limit) return state;

        //check if the last

        if(action.type == '-'){ //if symbol is '-' append the new operator ('-')
          //check to see if the last 2 digits are operators in which case  do not add any more minus signs
          if(!operators.includes(state.display[len-1]) || !operators.includes(state.display[len-2])){
            updatedDisplay = state.display + action.type;
          }
        } else if (!operators.includes(state.display[len-1])) { //else if lastChar is not a operator then append the new operator
          updatedDisplay = state.display + action.type;
        } else {
          //loop through from the end of the string removing any operators before adding the new operator
          for(let i = len-1; i => 0; i--){
            //console.log(updatedDisplay)
            if(operators.includes(state.display[i])){
              updatedDisplay = updatedDisplay.slice(0, -1);
              console.log(updatedDisplay)
            } else break;
          }
          updatedDisplay = updatedDisplay + action.type;
        }


        break;
      case '.':
        let appendDecimal = true; //set to true but check if the currentNumber already has a decimal and if so set to false
        let lastOperatorPos = -1
        for(let operator of operators){
          let symPos = state.display.lastIndexOf(operator);
          if(symPos > lastOperatorPos) lastOperatorPos = symPos;
        }
        let currentNumber = state.display;
        if(lastOperatorPos !== -1) currentNumber = state.display.slice(lastOperatorPos+1);
        if(currentNumber.includes('.')) appendDecimal = false;
        //console.log("display: " + state.display + "\ncurrent number: " + currentNumber + "\nlastOpPos: " + lastOperatorPos + "\nappendDecimal: " + appendDecimal)
        if(state.display.length >= limit) return state;
        if(appendDecimal) updatedDisplay = state.display + '.';
        break;
      case '=':
        updatedDisplay = Math.round(eval(updatedDisplay) * 100000) / 100000;
        let updatedRecord = [state.display + " = " + updatedDisplay];
        return {record: [updatedRecord, ...state.record], display: updatedDisplay.toString()};
        break;
      default:
        throw new Error();
    }
    //updatedDisplay = updatedDisplay.replace(/\d/, 'A')
    return {...state, display: updatedDisplay};
  }

  return (
    <>
    <div id="calculator">
      <Display content={state.display} />
      <div id="button-container">
        <div className="button" id="seven" onClick={() => dispatch({type: "7"})}>7</div>
        <div className="button" id="eight" onClick={() => dispatch({type: "8"})}>8</div>
        <div className="button" id="nine" onClick={() => dispatch({type: "9"})}>9</div>
        <div className="button" id="add" onClick={() => dispatch({type: "+"})}>+</div>
        <div className="button" id="clear" onClick={() => dispatch({type: "clear"})}>C</div>
        <div className="button" id="four" onClick={() => dispatch({type: "4"})}>4</div>
        <div className="button" id="five" onClick={() => dispatch({type: "5"})}>5</div>
        <div className="button" id="six" onClick={() => dispatch({type: "6"})}>6</div>
        <div className="button" id="subtract" onClick={() => dispatch({type: "-"})}>-</div>
        <div className="button" id="one" onClick={() => dispatch({type: "1"})}>1</div>
        <div className="button" id="two" onClick={() => dispatch({type: "2"})}>2</div>
        <div className="button" id="three" onClick={() => dispatch({type: "3"})}>3</div>
        <div className="button" id="multiply" onClick={() => dispatch({type: "*"})}>*</div>
        <div className="button" id="equals" id="equals" onClick={() => dispatch({type: "="})}>=</div>
        <div className="button" id="zero" onClick={() => dispatch({type: "0"})}>0</div>
        <div className="button" id="decimal" onClick={() => dispatch({type: "."})}>.</div>
        <div className="blank"><FontAwesomeIcon icon={faFreeCodeCamp} /></div>
        <div className="button" id="divide" onClick={() => dispatch({type: "/"})}>/</div>
      </div>
    </div>
    <div id="results">
      <ul>
      {
        state.record.map((element, index) => (
        <li key={index}>{element}</li>
      ))
      }
    </ul>
    </div>
    </>
  );

}

export default App;
