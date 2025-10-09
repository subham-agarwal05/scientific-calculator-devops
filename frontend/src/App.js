import React, { useState } from 'react';
import './App.css';

function App() {
    const [x, setX] = useState('');
    const [b, setB] = useState('');
    const [operation, setOperation] = useState('sqrt');
    const [result, setResult] = useState(null);

    const handleCalculate = async () => {
        try {
            // NOTE: In a real app, you would configure this URL
            const response = await fetch('http://localhost:8080/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operation, x, b }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Calculation failed:", error);
            setResult("Error!");
        }
    };

    return (
        <div className="App">
            <h1>Scientific Calculator</h1>
            <div className="calculator">
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="sqrt">Square Root (√x)</option>
                    <option value="factorial">Factorial (x!)</option>
                    <option value="log">Natural Log (ln(x))</option>
                    <option value="power">Power (x^b)</option>
                </select>
                <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    placeholder="Enter value for x"
                />
                {operation === 'power' && (
                    <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        placeholder="Enter value for b"
                    />
                )}
                <button onClick={handleCalculate}>Calculate</button>
                {result !== null && <div className="result">Result: {result}</div>}
            </div>
        </div>
    );
}

export default App;