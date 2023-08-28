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
  'departure': 0,
  'dmd': 0
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
          'departure': 0,
          'dmd': 0
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
        'departure': 0,
        'dmd': 0
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

  const validate = (latitudes, departures) => {
    let latitudeSum = 0;
    let departureSum = 0;

    // [...variable] makes a copy of the array. So it doesn't actually effect the original variable
    const newLatitudes = [...latitudes].splice(1, latitudes.length);
    const newDepartures = [...departures].splice(1, departures.length);

    newLatitudes.map(x => latitudeSum += x);
    newDepartures.map(x => departureSum += x);

    if(latitudeSum !== 0) {
      setWarning('Warning: Latitude does not equate to 0!');
      return false;
    } else if(departureSum !== 0) {
      setWarning('Warning: Departure does not equate to 0!');
      return false;
    } else {
      setWarning('');
      return true;
    }
  }

  const calculate = () => {    
    const latitudes = [];
    const departures = [];
    
    bearings.forEach(bearing => {
      // latAndDep_[0] = latitude
      // latAndDep_[1] = departure
      const latAndDep_ = latAndDep(bearing);
      
      latitudes.push(latAndDep_[0]);
      departures.push(latAndDep_[1]);
    });

    const valid = validate(latitudes, departures);

    if(valid) {
      const dmd = calculateDMD(departures);
    
      setBearings(bearings.map(bearing => {
          if(bearing.point === 0)
            return {...bearing, latitude: latitudes[bearing.point], departure: departures[bearing.point]}
          
          return {...bearing, dmd: dmd[bearing.point - 1],  latitude: latitudes[bearing.point], departure: departures[bearing.point]}
        }));
    } else {
      // Not valid, displays the Latitude and Departure but does not display the DMD
      setBearings(bearings.map(bearing => {
        return {...bearing, dmd: 0, latitude: latitudes[bearing.point], departure: departures[bearing.point]}
      }));
    }
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
