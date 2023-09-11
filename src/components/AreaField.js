import React from "react";

const AreaField = ({ bearing }) => {
  return (
    <tr>
      <td>
        <p className="point-name">{bearing.point}</p>
      </td>

      <td>{bearing.latitude}</td>
      <td>{bearing.dmd}</td>
      <td>{bearing.areaQuotient}</td>
    </tr>
  );
}

export default AreaField;
