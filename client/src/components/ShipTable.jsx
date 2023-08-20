import React from 'react';
import './ShipTable.css';

function ShipTable({ ships, onUploadIcon }) {
  return (
    <div className="table-container">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Ship Type</th>
              <th>Weight</th>
              <th>Home Port</th>
              <th>Ship Name</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship) => (
              <tr key={ship.id}>
                <td>{ship.shipType}</td>
                <td>{ship.weight | 0} kg</td>
                <td>{ship.homePort}</td>
                <td>{ship.shipName}</td>
                <td>{ship.class ? ship.class : 'Not applicable'}</td>
                <td>
                  <label className="file-upload-label">
                    <input
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => onUploadIcon(ship.id, e.target.files[0])}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShipTable;
