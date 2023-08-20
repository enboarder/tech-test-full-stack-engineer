const shipService = require('../services/shipService');
const multer = require('multer');
const {
  validateQueryParameters,
  applyFilters,
  calculatePaginationLimits,
} = require('../utilities');
const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage: storage });

const uuid = require('uuid');

const shipsController = {
  getShips: async (req, res) => {
    try {
      let ships = [];
      let areShipsFromDb = false;

      const { shipType, weight, homePort } = validateQueryParameters(req.query);
      const { startPaginationIndex, endPaginationIndex } =
        calculatePaginationLimits(req.query.page, req.query.pageSize);

      const cachedShips = await shipService.getShipsFromCache('ships');

      if (cachedShips?.length > 0) {
        console.log('Retrieved from cache');
        ships = cachedShips;
      } else {
        const databaseShips = await shipService.getShipsFromDatabase(
          shipType,
          weight,
          homePort
        );

        if (databaseShips?.length > 0) {
          console.log('Retrieved from database');
          areShipsFromDb = true;
          ships = databaseShips;
        } else {
          const spaceXShips = await shipService.fetchShipsFromSpaceXAPI();
          console.log('Retrieved from SpaceXAPI');

          ships = spaceXShips?.map((ship) => ({
            id: uuid.v4(),
            shipId: ship.ship_id,
            shipType: ship.ship_type,
            weight: ship.weight_kg,
            homePort: ship.home_port,
            shipName: ship.ship_name,
            class: ship.ship_class ? ship.shipClass : null,
            shipImage: null,
          }));
          await shipService.insertRecordsInDatabaseAndCache(ships);
        }
      }

      // database ships are filtered from query
      // below code is for applying filter to ships from api & cache
      if (shipType || homePort || (weight && !areShipsFromDb)) {
        ships = applyFilters(ships, shipType, weight, homePort);
      }

      const paginatedShips = ships?.slice(
        startPaginationIndex,
        endPaginationIndex
      );

      res.status(200).json({ ships: paginatedShips });
    } catch (error) {
      console.error('Error fetching ship data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  uploadShipImage: [
    upload.single('image'),
    async (req, res) => {
      try {
        const shipId = req.params.shipId;
        const imageBuffer = req.file.buffer;
        const updated = await shipService.updateShipImage(shipId, imageBuffer);

        if (updated) {
          res.status(200).json({ message: 'Image uploaded successfully' });
        } else {
          res.status(500).json({ error: 'Failed to update ship image' });
        }
      } catch (error) {
        console.error('Error uploading ship image:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  ],
};

module.exports = shipsController;
