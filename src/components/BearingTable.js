import BearingField from './BearingField';

// This is the "-" field 
const FinalBearing = ({ bearing }) => {
  return (
    <tr>
      <td>{bearing.point}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{bearing.blm1}</td>
      <td></td>
      <td></td>
      <td>{bearing.blm2}</td>
    </tr>
  );
}

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
          <th>BLM 1</th>
          <th>DMD</th>
          <th>Departure</th>
          <th>BLM 2</th>
        </tr>
      </thead>

      <tbody>
          {bearings.map((bearing) => (
            bearing.point !== '-' ?  
            <BearingField bearings={bearings} setBearings={setBearings} bearing={bearing} key={bearing.point} resetField={resetField} removeField={removeField} />
            :
            <FinalBearing bearing={bearing} key="final" />
            ))}
      </tbody>
    </table>
  );
}

export default BearingTable;
