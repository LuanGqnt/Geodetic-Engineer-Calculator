import React from "react";

const Bearing = ({ bearings, setBearings, bearing }) => {
  return (
    <tr>
        <td>
          <p className="point-name">{bearing.point}</p>
        </td>

        <td>
          <select name="directionA" value={bearing.directionA} onChange={e => setBearings(bearings.map(bearing_ => {
              if(bearing_.point === bearing.point)
                return {...bearing, directionA: e.target.value};
              else
                return bearing_;
            }))}>
            <option value="n">N</option>
            <option value="s">S</option>
          </select>

          <label htmlFor="degrees">
            <input type="number" name="degrees" value={bearing.degrees} onChange={e => setBearings(bearings.map(bearing_ => {
              if(bearing_.point === bearing.point)
                return {...bearing, degrees: e.target.value};
              else
                return bearing_;
            }))} />
            &#0176;
          </label>

          <label htmlFor="minutes">
            <input type="number" name="minutes" value={bearing.minutes} onChange={e => setBearings(bearings.map(bearing_ => {
              if(bearing_.point === bearing.point)
                return {...bearing, minutes: e.target.value};
              else
                return bearing_;
            }))} />
            '
          </label>

          <label htmlFor="seconds">
            <input type="number" name="seconds" value={bearing.seconds} onChange={e => setBearings(bearings.map(bearing_ => {
              if(bearing_.point === bearing.point)
                return {...bearing, seconds: e.target.value};
              else
                return bearing_;
            }))} />
            "
          </label>

          <select name="directionB" value={bearing.directionB} onChange={e => setBearings(bearings.map(bearing_ => {
              if(bearing_.point === bearing.point)
                return {...bearing, directionB: e.target.value};
              else
                return bearing_;
            }))}>
            <option value="e">E</option>
            <option value="w">W</option>
          </select>
        </td>
    </tr>
  );
}

export default Bearing;