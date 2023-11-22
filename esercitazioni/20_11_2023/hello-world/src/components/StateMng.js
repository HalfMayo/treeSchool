import { useState } from "react";

const initialString = "Henlo"

export default function StateMng() {
    const [number, setNumber] = useState(0);
    const [string, setString] = useState(initialString);

    return(
        <>
        <div className="row gap">
            <div className="row minor-gap">
                <button onClick={() => setNumber(prev => prev + 2)}>+</button>
                <button onClick={() => setNumber(prev => prev - 2)}>-</button>
                <button onClick={() => setNumber(prev => prev * 2)}>*</button>
                <button onClick={() => setNumber(prev => prev / 2)}>/</button>
                <p className="bold">?</p>
            </div>
            <h3>{number} is {number%2 === 0 ? "even" : "odd"}</h3>
        </div>
        <div className="row gap">
            <div className="row minor-gap">
                <button onClick={() =>setString(prev => prev + " Quaso")}>Add string</button>
                <button onClick={() =>setString(prev => prev + 2)}>Add number</button>
                <button onClick={() =>setString(initialString)}>Reset</button>
                <p className="bold">?</p>
            </div>
            <h3>{string}</h3>
        </div>
        </>
    )
}