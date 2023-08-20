import React, { useState, useRef } from 'react';
import Pagination from '../components/Pagination';
import { isValidStringType, isValidNumType } from '../utils/inputValidation';
import ShipTableComponent from '../components/ShipTable';
import { handleSearch, handleUploadIcon } from '../apis/shipService';
import './ShipPage.css';
import { SHIP_LIMIT } from '../constants/pagination';

const ShipPage = () => {
  const [ships, setShips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const shipTypeRef = useRef('');
  const homePortRef = useRef('');
  const weightRef = useRef('');

  const constructQueryParams = () => {
    const queryParams = {
      page: 1,
    };

    const shipType = shipTypeRef?.current?.value;
    if (shipType && isValidStringType(shipType)) {
      queryParams.shipType = shipType;
    }

    const homePort = homePortRef?.current?.value;
    if (homePort && isValidStringType(homePort)) {
      queryParams.homePort = homePort;
    }

    const weight = weightRef?.current?.value;
    if (weight && isValidNumType(weight)) {
      queryParams.weight = weight;
    }

    return queryParams;
  };

  const handleSearchClick = async () => {
    const queryParams = constructQueryParams();
    const newShips = await handleSearch(queryParams);
    setShips(newShips);
    setCurrentPage(1);
  };

  const handleIconUpload = async (shipId, file) => {
    await handleUploadIcon(shipId, file);
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
      const queryParams = constructQueryParams();
      queryParams.page = newPage;
      const newShips = await handleSearch(queryParams);
      setShips(newShips);
    }
  };

  return (
    <div style={{ paddingTop: '48px' }}>
      <div className="margins">
        <label>Ship Type</label>
        <input type="text" ref={shipTypeRef} style={{ marginLeft: '28px' }} />
      </div>
      <div className="margins">
        <label>Home Port</label>
        <input type="text" ref={homePortRef} style={{ marginLeft: '22px' }} />
      </div>
      <div className="margins">
        <label>Weight</label>
        <input type="number" ref={weightRef} style={{ marginLeft: '48px' }} />
        <div className="buttons">
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      <ShipTableComponent ships={ships} onUploadIcon={handleIconUpload} />
      {ships.length > 0 && (
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          hasNextPage={ships.length > SHIP_LIMIT}
          hasPreviousPage={currentPage > 1}
        />
      )}
    </div>
  );
};

export default ShipPage;