// Assuming you are using Jest for testing

const shipService = require('../../src/services/shipService');
const shipController = require('../../src/controllers/shipController');
const dbPool = require('../../src/db');
const axios = require('axios');
const cacheMiddleware = require('../../src/middleware/cacheMiddleware');

jest.mock('../../src/db');

jest.mock('axios');
jest.mock('../../src/middleware/cacheMiddleware');

describe('shipService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchShipsFromSpaceXAPI should return ships from SpaceX API', async () => {
    const mockedSpaceXResponse = {
      data: [
        { ship_id: 'ship1', ship_type: 'cargo' },
        { ship_id: 'ship2', ship_type: 'passenger' },
      ],
    };

    axios.get.mockResolvedValue(mockedSpaceXResponse);

    const ships = await shipService.fetchShipsFromSpaceXAPI();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.spacexdata.com/v3/ships'
    );
    expect(ships).toEqual(mockedSpaceXResponse.data);
  });

  it('getShipsFromCache should return cached ships', async () => {
    const mockedCachedShips = [
      { ship_id: 'cached_ship1', ship_type: 'cargo' },
      { ship_id: 'cached_ship2', ship_type: 'passenger' },
    ];

    cacheMiddleware.getFromCache.mockResolvedValue(mockedCachedShips);

    const ships = await shipService.getShipsFromCache('ships');

    expect(cacheMiddleware.getFromCache).toHaveBeenCalledWith('ships');
    expect(ships).toEqual(mockedCachedShips);
  });

  it('getShipsFromDatabase should return ships from the database based on filters', async () => {
    dbPool.query.mockResolvedValue([
      { ship_id: 'cached_ship1', ship_type: 'cargo' },
      { ship_id: 'cached_ship2', ship_type: 'passenger' },
    ]);

    const shipType = 'cargo';
    const weight = 100;
    const homePort = 'Port A';

    const ships = await shipService.getShipsFromDatabase(
      shipType,
      weight,
      homePort
    );

    expect(dbPool.query).toHaveBeenCalledTimes(1);
    expect(ships).toEqual([
      { ship_id: 'cached_ship1', ship_type: 'cargo' },
      { ship_id: 'cached_ship2', ship_type: 'passenger' },
    ]);
  });
});
