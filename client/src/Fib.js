import React, { useEffect, useState } from "react";
import axios from 'axios';

const Fib = () => {
    const [seenIndices, setSeenIndices] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        setValues({ values: values.data});
    };

    const fetchIndices = async () => {
        const seenIndices = await axios.get('/api/values/all');
        setSeenIndices(seenIndices.data);
    };

    useEffect(() => {
        fetchValues();
        fetchIndices();
    }, []);

    const renderSeenIndices = () => {
        return seenIndices.map(({ number }) => number).join(', ');
    };

    const renderValues = () => {
        const entries = [];

        for (let key in values["values"]) {
            console.log("values", key, values, values["values"][key])
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values["values"][key]}
                </div>
            )
        };
        return entries;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/values', {
            index: index
        });

        setIndex('');
        fetchValues();
        fetchIndices();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={e => setIndex(e.target.value)}/>
                <button>Submit</button>
            </form>

            <h3>Indices I have seen:</h3>
            {renderSeenIndices()}
            <h3>Calculated values: </h3>
            {renderValues()}
        </div>
    )
};

export default Fib;