import { useState, useEffect } from 'react';
import { Label } from './styles';

import queryString from 'query-string';

export default function SearchBar({ handleData }) {
    const [shipType, setShipType] = useState('');
    const [weight, setWeight] = useState('');
    const [homePort, setHomePort] = useState('');
    const defaultUrl = 'http://localhost:4000/api/v1/ship';

    function fetchData() {
        const stringified = queryString.stringify({
            shipType,
            weight,
            homePort
        }, {skipNull: true, skipEmptyString: true});
        const querySection = stringified ? "?" + stringified : "";
        console.log(querySection);
        fetch(defaultUrl + querySection, {
            method: "GET",
            headers: { authorization: "Bearer sadfd" }
        }).then((response) => response.json())
        .then(({ data }) => handleData(data))
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);
      
    return (
      <form onSubmit={handleSubmit}>
        <Label>Ship Type  </Label>
        <select value={shipType} onChange={e => setShipType(e.target.value)}>
            <option value=""></option>
            <option value="Tug">Tug</option>
            <option value="Cargo">Cargo</option>
            <option value="Barge">Barge</option>
        </select>
        <br></br>
        <Input type="number" label="Weight" text={weight} handleChange={setWeight}/>
        <br></br>
        <Input type="text" label="Home Port"  text={homePort} handleChange={setHomePort}/>
        <button style={{ margin: '5px' }} type="submit">Search</button>
      </form>
    );
  }

function Input({ label, text, handleChange, type }) {
    return (
        <Label>
        {label}
        {' '}
        <input
            type={type}
            value={text}
            onChange={e => handleChange(e.target.value)}
        />
        </Label>
    );
}