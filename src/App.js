import { useState } from "react";
import "./App.css";

const CalcButton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const CalcOper = ["/", "+", "-", "x", "C", "="];
function Compute(First, op, Second) {
  switch (op) {
    case "-":
      return First - Second;
    case "+":
      return Number(First) + Number(Second);
    case "/":
      return First / Second;
    case "x":
      return First * Second;
    default:
      return 1;
  }
}
function Calculate(Arr) {
  let newArr = Arr.map((item) =>
    CalcOper.includes(item) ? item : Number(item)
  );
  let finalAnswer = 1;
  console.log(newArr);
  for (let i = 0; i < Arr.length - 1; i += 2) {
    Arr[i + 2] = Compute(Arr[i], Arr[i + 1], Arr[i + 2]);
    finalAnswer = Arr[i + 2];
    console.log(finalAnswer);
  }
  return finalAnswer;
} //TODO Make the Compute Function to Evaluate each 2 pair of values in the stack
function App() {
  const [result, setResult] = useState("");
  const [stack, setStack] = useState([]);
  function handleNumber(value) {
    console.log(value);
    if (result === "0") setResult(`${value}`);
    else setResult(`${result}${value}`);
  }
  function handleOper(value) {
    console.log(value);
    let NewArr = [];
    if (value !== "C" && value !== "=") {
      if (result !== "") {
        NewArr = stack;
        NewArr.push(result);
        NewArr.push(value);
        setStack(NewArr);
      }
      console.log(NewArr);

      setResult("");
    } else if (value === "C") {
      setResult("");
      setStack([]);
      console.log("Cleared");
    } else if (value === "=") {
      NewArr = stack;
      NewArr.push(result);
      setStack(NewArr);
      setResult(`${Calculate(stack)}`);
      setStack([]);
      console.log("Nice");
    }
  }
  return (
    <div className="Calculator">
      <div className="calc">
        <Title />
        <Header result={result} />
        <Button
          Operetor={CalcOper}
          Numbers={CalcButton}
          handleValue={handleNumber}
          handleOper={handleOper}
        />
      </div>
    </div>
  );
}
function Title() {
  return (
    <div>
      <h1>CALCULATOR</h1>
    </div>
  );
}
function Header({ result }) {
  return (
    <div className="Screen">
      <p className="TEXT">{result}</p>
    </div>
  );
}
function Button({ Operetor, Numbers, handleValue, handleOper }) {
  return (
    <div className="layout">
      <div className="Numbers">
        {Numbers.map((value) => (
          <button
            className="But"
            value={value}
            onClick={() => handleValue(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="Oper">
        {Operetor.map((value) => (
          <button
            className="But"
            value={value}
            onClick={() => handleOper(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
export default App;
