import {useState} from 'react'

export default function Counter() {

    const [counter, setCounter] = useState(0)

    return(
        <div className="row">
            <button onClick={() => setCounter(prev => prev + 1)}>How many times did Gandalf save my life?</button>
            <p>{counter}</p>
        </div>
    )
}