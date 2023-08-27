import Bearing from './Bearing';

const BearingTable = ({ addField, bearings, setBearings }) => {
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
            <Bearing bearings={bearings} setBearings={setBearings} bearing={bearing} key={bearing.point} />
          ))}
        </tbody>
      </table>

      <button id="add-field" onClick={addField}>Add Field</button>
    </div>
  );
}

export default BearingTable;
