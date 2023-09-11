import AreaField from "./AreaField";

const AreaTable = ({ bearings, area, quotientSum }) => {
  return (
    <table id="area-table">
      <caption>Area</caption>

      <thead>
        <tr>
          <th>Point</th>
          <th>Latitude</th>
          <th>DMD</th>
          <th>Quotient</th>
        </tr>
      </thead>

      <tbody>
        {bearings.map(bearing => (
          bearing.point !== 0 ?
            <AreaField bearing={bearing} key={'area' + bearing.point} /> : ''
        ))}

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{quotientSum}</td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>{area}</strong></td>
        </tr>
        
      </tbody>
    </table>
  );
}

export default AreaTable;
