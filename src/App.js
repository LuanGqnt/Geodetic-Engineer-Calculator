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

  const resetField = (pointToReset) => {    
    setBearings(bearings.map(bearing => {
      if(bearing.point === pointToReset)
        return {
          'point': bearing.point,
          'directionA': 'n',
          'degrees': 0,
          'minutes': 0,
          'seconds': 0,
          'directionB': 'e',
          'distance': 0,
          'latitude': 0,
          'departure': 0
        }
      else 
        return bearing;
    }));
  }

  const resetAllFields = () => {
    setBearings(bearings.map(bearing => {
      return {
        'point': bearing.point,
        'directionA': 'n',
        'degrees': 0,
        'minutes': 0,
        'seconds': 0,
        'directionB': 'e',
        'distance': 0,
        'latitude': 0,
        'departure': 0
      }
    }));
  }

  const removeField = (pointToRemove) => {
    if(pointToRemove === 0) {
      alert('You cannot remove that!');
      return;
    }

    const updatedBearings = bearings.filter(bearing => bearing.point !== pointToRemove).map(bearing => {
      if(bearing.point > pointToRemove)
        return {...bearing, point: bearing.point - 1}
      else
        return bearing;
    });

    setBearings(updatedBearings);
    setPoint(point - 1);

  }

  const removeAllFields = () => {
    setPoint(1);
    setBearings([Object.assign({}, NEWFIELD)]);
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

      <BearingTable bearings={bearings} setBearings={setBearings} addField={addField} resetField={resetField} removeField={removeField} resetAllFields={resetAllFields} removeAllFields={removeAllFields} />

      <button id="calculate-button" onClick={calculate}>Calculate</button>
    </>
  );
}

export default App;
