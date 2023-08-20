import React, { useState } from 'react';
import ShipTableComponent from '../components/ShipTable';
import './ShipPage.css';

const ShipPage = () => {
  const [ships, setShips] = useState([]);
  const [shipType, setShipType] = useState('');
  const [homePort, setHomePort] = useState('');
  const [weight, setWeight] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (page = 1) => {
    try {
      // Construct the query parameters based on user input
      const queryParams = {};

      queryParams.page = page; // Add the page parameter

      // Ship Type: Should contain only letters and spaces
      if (shipType && /^[A-Za-z\s]+$/.test(shipType)) {
        queryParams.shipType = shipType;
      }

      // Home Port: Should contain only letters, spaces, and dashes
      if (homePort && /^[A-Za-z\s\-]+$/.test(homePort)) {
        queryParams.homePort = homePort;
      }

      // Weight: Should be a valid number
      if (weight && /^\d+$/.test(weight)) {
        queryParams.weight = weight;
      }

      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join('&');

      const response = await fetch(
        `http://localhost:4000/ships?${queryString}`
      );
      const data = await response.json();

      if (data.ships) {
        setShips(data.ships);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching ships:', error);
    }
  };

  const handleUploadIcon = async (shipId, file) => {
    try {
      if (file.size <= 100 * 1024) {
        // Maximum size of 100KB (100 * 1024 bytes)
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(
          `http://localhost:4000/ships/upload/${shipId}`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          alert('File upload success'); // Convert the response to a Blob
        } else {
          console.error('Error uploading icon. Status:', response.status);
        }
      } else {
        alert('Please select a file that is 100KB or smaller.');
      }
    } catch (error) {
      console.error('Error uploading icon:', error);
    }
  };

  return (
    <div>
      <div className="margins">
        <label>Ship Type</label>
        <input
          type="text"
          value={shipType}
          style={{ marginLeft: '28px' }}
          onChange={(e) => setShipType(e.target.value)}
        />
      </div>
      <div className="margins">
        <label>Home Port</label>
        <input
          type="text"
          value={homePort}
          style={{ marginLeft: '22px' }}
          onChange={(e) => setHomePort(e.target.value)}
        />
      </div>
      <div className="margins">
        <label>Weight</label>
        <input
          type="text"
          value={weight}
          style={{ marginLeft: '48px' }}
          onChange={(e) => setWeight(e.target.value)}
        />
        <div className="buttons">
          <button onClick={() => handleSearch(1)}>Search</button>
        </div>
      </div>
      <h2 style={{ marginLeft: '48px' }}>Ship List</h2>
      <ShipTableComponent ships={ships} onUploadIcon={handleUploadIcon} />
      {ships.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handleSearch(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handleSearch(currentPage + 1)}
            disabled={ships.length - 9 < 1} // Disable if no more results for next page
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShipPage;
