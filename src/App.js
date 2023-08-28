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
  const [warning, setWarning] = useState('');

  const addField = () => {    
    const newField = Object.assign({}, NEWFIELD);

    newField.point = point;
    setPoint(point + 1);
    setBearings([...bearings, newField]);
    setWarning('');
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
    setWarning('');
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
    setWarning('');
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
    setWarning('');
  }

  const removeAllFields = () => {
    setPoint(1);
    setBearings([Object.assign({}, NEWFIELD)]);
    setWarning('');
  }

  const calculate = () => {    
    const latitudes = [];
    const departures = [];

    setBearings(bearings.map(bearing => {
        const latAndDep_ = latAndDep(bearing);

        if(bearing.point !== 0) {
          latitudes.push(latAndDep_[0]);
          departures.push(latAndDep_[1]);
        }

        return {...bearing, latitude: latAndDep_[0], departure: latAndDep_[1]}
      }));

      // Validates if the sum of the latitudes and departure equates to 0. If not, show a warning
      let latitudeSum = 0;
      let departureSum = 0;

      latitudes.map(x => latitudeSum += x);
      departures.map(x => departureSum += x);

      // if(latitudeSum === 0 && departureSum === 0)
      //   setShowWarning(false);
      // else
      //   setShowWarning(true);
      if(latitudeSum !== 0)
        setWarning('Warning: Latitude does not equate to 0!');
      else if(departureSum !== 0)
        setWarning('Warning: Departure does not equate to 0!');
      else
        setWarning('');
  }

  return (
    <>
      <h1>Geodetic Calculator</h1>

      {warning.trim() !== '' ? <h3 id="warning">{warning}</h3> : '' }

      <BearingTable bearings={bearings} setBearings={setBearings} addField={addField} resetField={resetField} removeField={removeField} resetAllFields={resetAllFields} removeAllFields={removeAllFields} />

      <button id="calculate-button" onClick={calculate}>Calculate</button>
    </>
  );
}

export default App;
