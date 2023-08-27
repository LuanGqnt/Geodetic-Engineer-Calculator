import Bearing from './Bearing';

const BearingTable = ({ bearings, setBearings, addField, resetField, removeField, resetAllFields, removeAllFields }) => {
  return(
    <div id="bearing-table">
      <table>
        <thead>
          <tr>
            <th>Point</th>
            <th>Bearing</th>
            <th>Distance</th>
            <th>Latitude</th>
            <th>Departure</th>
          </tr>
        </thead>

        <tbody>
          {bearings.map((bearing) => (
            <Bearing bearings={bearings} setBearings={setBearings} bearing={bearing} key={bearing.point} resetField={resetField} removeField={removeField} />
          ))}
        </tbody>
      </table>

      <button id="add-field" onClick={addField}>Add Field</button>
      <button id="reset-all-fields" onClick={resetAllFields}>Reset Fields</button>
      <button id="remove-all-fields" onClick={removeAllFields}>Remove All</button>
    </div>
  );
}

export default BearingTable;
