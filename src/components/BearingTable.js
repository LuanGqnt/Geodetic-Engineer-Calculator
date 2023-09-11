import BearingField from './BearingField';

const BearingTable = ({ bearings, setBearings, resetField, removeField }) => {
  return(
    <table id="bearing-table">
      <caption>Main Table</caption>
      <thead>
        <tr>
          <th>Point</th>
          <th>Bearing</th>
          <th>Distance</th>
          <th>Latitude</th>
          <th>DMD</th>
          <th>Departure</th>
        </tr>
      </thead>

      <tbody>
        {bearings.map((bearing) => (
          <BearingField bearings={bearings} setBearings={setBearings} bearing={bearing} key={bearing.point} resetField={resetField} removeField={removeField} />
        ))}
      </tbody>
    </table>
  );
}

export default BearingTable;
