const shipsController = require('../../src/controllers/shipController');
const shipService = require('../../src/services/shipService');
const cacheMiddleware = require('../../src/middleware/cacheMiddleware');
const {
  validateQueryParameters,
  calculatePaginationLimits,
} = require('../../src/utilities');
const uuid = require('uuid');

jest.mock('../../src/services/shipService');
jest.mock('../../src/middleware/cacheMiddleware');
jest.mock('../../src/utilities');

describe('shipsController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = {
    query: {
      shipType: 'cargo',
      weight: 100,
      homePort: 'Port A',
      page: 1,
      pageSize: 10,
    },
  };

  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  it('should fetch and cache ships from SpaceX API', async () => {
    const mockValidatedParams = {
      shipType: 'cargo',
      weight: 100,
      homePort: 'Port A',
    };

    const mockPaginationLimits = {
      startPaginationIndex: 0,
      endPaginationIndex: 10,
    };

    const insertedData = [
      {
        id: expect.any(String),
        shipId: 'cached_ship1',
        shipType: 'cargo',
        weight: undefined,
        homePort: undefined,
        shipName: undefined,
        class: null,
        shipImage: null,
      },
      {
        id: expect.any(String),
        shipId: 'cached_ship2',
        shipType: 'passenger',
        weight: undefined,
        homePort: undefined,
        shipName: undefined,
        class: null,
        shipImage: null,
      },
    ];

    validateQueryParameters.mockReturnValue(mockValidatedParams);
    calculatePaginationLimits.mockReturnValue(mockPaginationLimits);
    cacheMiddleware.getFromCache.mockResolvedValue([]);
    shipService.getShipsFromDatabase.mockResolvedValue([]);
    shipService.fetchShipsFromSpaceXAPI.mockResolvedValue([
      { ship_id: 'cached_ship1', ship_type: 'cargo' },
      { ship_id: 'cached_ship2', ship_type: 'passenger' },
    ]);

    await shipsController.getShips(mockRequest, mockResponse);

    expect(shipService.fetchShipsFromSpaceXAPI).toHaveBeenCalled();
    expect(shipService.insertRecordsInDatabaseAndCache).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should handle error and respond with status 500', async () => {
    const mockError = new Error('An error occurred');
    validateQueryParameters.mockImplementation(() => {
      throw mockError;
    });

    await shipsController.getShips(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
