import { useState } from 'react';

export default function SearchBar() {
    const [shipType, setShipType] = useState('');
    const [weight, setWeight] = useState('');
    const [homePort, setHomePort] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
          alert(`You said ${weight} to ${shipType}`);
        }, 5000);
    }
      
    return (
      <form onSubmit={handleSubmit}>
        <label for="pet-select">Ship Type</label>
        <select name="pets" id="pet-select" value={shipType} onChange={e => setShipType(e.target.value)}>
            <option value=""></option>
            <option value="Tug">Tug</option>
            <option value="Cargo">Cargo</option>
            <option value="Barge">Barge</option>
        </select>
        <Input type="number" label="Weight" text={weight} handleChange={setWeight}/>
        <Input type="text" label="Home Port"  text={homePort} handleChange={setHomePort}/>
        <button type="submit">Search</button>
      </form>
    );
  }

function Input({ label, text, handleChange, type }) {
    return (
        <label>
        {label}
        {' '}
        <input
            type={type}
            value={text}
            onChange={e => handleChange(e.target.value)}
        />
        </label>
    );
}