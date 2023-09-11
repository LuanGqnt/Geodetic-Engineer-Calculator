import React, { useState } from 'react';
import BearingTable from './components/BearingTable';
import AreaTable from './components/AreaTable';
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
  'dmd': 0,
  'areaQuotient': 0
};

const App = () => {
  // const [bearings, setBearings] = useState([Object.assign({}, NEWFIELD)]);
  const [bearings, setBearings] = useState([{
    'point': 0,
    'directionA': 'n',
    'degrees': 81,
    'minutes': 2,
    'seconds': 0,
    'directionB': 'e',
    'distance': 301.71,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0,
  }, {
    'point': 1,
    'directionA': 'n',
    'degrees': 18,
    'minutes': 1,
    'seconds': 0,
    'directionB': 'e',
    'distance': 5,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0
  }, {
    'point': 2,
    'directionA': 's',
    'degrees': 75,
    'minutes': 7,
    'seconds': 0,
    'directionB': 'e',
    'distance': 10,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0
  }, {
    'point': 3,
    'directionA': 's',
    'degrees': 75,
    'minutes': 7,
    'seconds': 0,
    'directionB': 'e',
    'distance': 1.04,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0
  }, {
    'point': 4,
    'directionA': 's',
    'degrees': 18,
    'minutes': 1,
    'seconds': 0,
    'directionB': 'w',
    'distance': 5,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0
  }, {
    'point': 5,
    'directionA': 'n',
    'degrees': 75,
    'minutes': 7,
    'seconds': 0,
    'directionB': 'w',
    'distance': 1.04,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0
  }, {
    'point': 6,
    'directionA': 'n',
    'degrees': 75,
    'minutes': 7,
    'seconds': 0,
    'directionB': 'w',
    'distance': 10,
    'latitude': 0,
    'departure': 0,
    'dmd': 0,
    'areaQuotient': 0
  }]);
  const [area, setArea] = useState(0);
  const [quotientSum, setQuotientSum] = useState(0);
  const [point, setPoint] = useState(1);
  const [warning, setWarning] = useState('');

  const addField = () => {    
    const newField = Object.assign({}, NEWFIELD);

    newField.point = point;
    setPoint(point + 1);
    setBearings([...bearings, newField]);
    setWarning('');
    setArea(0);
    setQuotientSum(0);
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
          'dmd': 0,
          'areaQuotient': 0
        }
      else 
        return bearing;
    }));
    setWarning('');
    setArea(0);
    setQuotientSum(0);
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
        'dmd': 0,
        'areaQuotient': 0
      }
    }));
    setWarning('');
    setArea(0);
    setQuotientSum(0);
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
    setArea(0);
    setQuotientSum(0);
  }

  const removeAllFields = () => {
    setPoint(1);
    setBearings([Object.assign({}, NEWFIELD)]);
    setWarning('');
    setArea(0);
    setQuotientSum(0);
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
      const areaQuotients = [];

      setBearings(bearings.map(bearing => {
        if(bearing.point === 0)
          return {...bearing, latitude: latitudes[bearing.point], departure: departures[bearing.point]}
      
        const newAreaQuotient = Number((dmd[bearing.point - 1] * latitudes[bearing.point]).toFixed(2));

        areaQuotients.push(newAreaQuotient);
        return {...bearing, dmd: dmd[bearing.point - 1],  latitude: latitudes[bearing.point], departure: departures[bearing.point], areaQuotient: newAreaQuotient}
      }));

      setArea(calculateArea(latitudes, dmd));

      const sums = areaQuotients.reduce((a, b) => {
        return a + b;
      });
  
      setQuotientSum(sums);
    } else {
      // Not valid, displays the Latitude and Departure but does not display the DMD
      setBearings(bearings.map(bearing => {
        return {...bearing, dmd: 0, latitude: latitudes[bearing.point], departure: departures[bearing.point]}
      }));
      setArea(0);
    }
  }

  return (
    <>
      <h1>Geodetic Calculator</h1>

      {warning.trim() !== '' ? <h3 id="warning">{warning}</h3> : '' }

      <BearingTable bearings={bearings} setBearings={setBearings} resetField={resetField} removeField={removeField} />
      <AreaTable bearings={bearings} area={area} quotientSum={quotientSum} />

      <div className="field-buttons">
        <button id="add-field" onClick={addField}>Add Field</button>
        <button id="reset-all-fields" onClick={resetAllFields}>Reset Fields</button>
        <button id="remove-all-fields" onClick={removeAllFields}>Remove All</button>
      </div>
    
      <button id="calculate-button" onClick={calculate}>Calculate</button>
    </>
  );
}

export default App;
