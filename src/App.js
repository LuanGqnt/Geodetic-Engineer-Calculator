import React, { useState } from 'react';
import BearingTable from './components/BearingTable';
import { latAndDep, calculateDMD, calculateArea } from './utils/calculator'

import './css/styles.css';

const NEWFIELD = {
  'point': 0,
  'directionA': 'n',
  'degrees': 0,
  'minutes': 0,
  'seconds': 0,
  'directionB': 'e',
  'distance': 0,
  'latitude': 0,
  'departure': 0
};

const App = () => {
  const [bearings, setBearings] = useState([Object.assign({}, NEWFIELD)]);
  const [point, setPoint] = useState(1);

  const addField = () => {    
    const newField = Object.assign({}, NEWFIELD);

    newField.point = point;
    setPoint(point + 1);
    setBearings([...bearings, newField]);
  }

  const calculate = () => {    
    setBearings(bearings.map(bearing => {
        const latAndDep_ = latAndDep(bearing);
        
        return {...bearing, latitude: latAndDep_[0], departure: latAndDep_[1]}
    }));
  }

  return (
    <>
      <h1>Geodetic Calculator</h1>

      <BearingTable addField={addField} bearings={bearings} setBearings={setBearings} />

      <button onClick={calculate}>Calculate</button>
    </>
  );
}

export default App;
