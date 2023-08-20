function applyFilters(ships, shipType, weight, homePort) {
  let filteredShips = ships;

  if (shipType) {
    filteredShips = filteredShips.filter((ship) => ship.shipType === shipType);
  }

  if (weight) {
    filteredShips = filteredShips.filter((ship) => ship.weight === weight);
  }

  if (homePort) {
    filteredShips = filteredShips.filter((ship) => ship.homePort === homePort);
  }

  return filteredShips;
}

function calculatePaginationLimits(pageParam, pageSizeParam) {
  const page = parseInt(pageParam) || 1; //default to 1
  const pageSize = parseInt(pageSizeParam) || 10; // default to 10
  const startPaginationIndex = (page - 1) * pageSize;
  const endPaginationIndex = startPaginationIndex + pageSize;
  return { startPaginationIndex, endPaginationIndex };
}

function validateQueryParameters(queryParams) {
  const { shipType, weight, homePort } = queryParams;

  // Validate shipType
  if (shipType && typeof shipType !== 'string') {
    throw new Error('Invalid shipType parameter');
  }

  // Validate weight
  if (weight && isNaN(weight)) {
    throw new Error('Invalid weight parameter');
  }

  // Validate homePort
  if (homePort && typeof homePort !== 'string') {
    throw new Error('Invalid homePort parameter');
  }

  return { shipType, weight, homePort };
}

module.exports = {
  applyFilters: applyFilters,
  calculatePaginationLimits: calculatePaginationLimits,
  validateQueryParameters: validateQueryParameters,
};
