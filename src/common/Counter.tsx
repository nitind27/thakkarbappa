// components/Counter.tsx
"use client"
import React from 'react';
import { useNumber } from './NumberContext';

const Counter: React.FC = () => {
    const { number, setNumber } = useNumber();

    return (
        <div>
            <h1>Current Number: {number}</h1>
            <button onClick={() => setNumber(number + 1)}>Increment</button>
            <button onClick={() => setNumber(number - 1)}>Decrement</button>
        </div>
    );
};

export default Counter;