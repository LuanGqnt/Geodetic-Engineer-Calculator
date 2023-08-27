import React, { useState } from 'react';
import Bearing from './components/Bearing';

import './css/styles.css';

const NEWFIELD = {
  'point': 'start',
  'directionA': 'n',
  'degrees': 0,
  'minutes': 0,
  'seconds': 0,
  'directionB': 'e',
  'distance': 0
};

const App = () => {
  const [bearings, setBearings] = useState([NEWFIELD]);
  const [point, setPoint] = useState(1);

  const addField = () => {    
    const newField = Object.assign({}, NEWFIELD);

    newField.point = point;
    setPoint(point + 1);
    setBearings([...bearings, newField]);
  }

  return (
    <>
      <h1>Geodetic Calculator</h1>

      <main>
        <table id="bearings-table">
          <thead>
            <tr>
              <th>Point</th>
              <th>Bearing</th>
              <th>Distance</th>
            </tr>
          </thead>

          <tbody>
            {bearings.map((bearing) => (
              <Bearing bearings={bearings} setBearings={setBearings} bearing={bearing} key={bearing.point} />
            ))}
          </tbody>
        </table>

        <button id="add-field" onClick={addField}>Add Field</button>
      </main>
    </>
  );
}

export default App;
