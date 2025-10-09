import React, { useState } from 'react';
import './App.css';

function App() {
    const [x, setX] = useState('');
    const [b, setB] = useState('');
    const [operation, setOperation] = useState('sqrt');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = async () => {
        setResult(null);
        setError('');
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operation, x, b: operation === 'power' ? b : undefined }),
            });
            
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'An error occurred during calculation.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>Scientific Calculator</h1>
            <div className="calculator-grid">
                <select className="operation-select" value={operation} onChange={(e) => setOperation(e.target.value)}>
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
                    className="input-x"
                />

                {operation === 'power' ? (
                    <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        placeholder="Enter value for b"
                        className="input-b"
                    />
                ) : (
                    <div className="placeholder-b"></div>
                )}
                
                <button onClick={handleCalculate} className="calculate-button">Calculate</button>
            </div>
            
            {result !== null && <div className="result-display success">Result: {result}</div>}
            {error && <div className="result-display error">{error}</div>}
        </div>
    );
}

export default App;