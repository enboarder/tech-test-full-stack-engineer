const axios = require('axios');
const dbPool = require('../db');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const cron = require('node-cron');
const uuid = require('uuid');

const shipService = {
  fetchShipsFromSpaceXAPI: async () => {
    const spaceXResponse = await axios.get(
      'https://api.spacexdata.com/v3/ships'
    );
    return spaceXResponse.data;
  },

  getShipsFromCache: async (key) => {
    return cacheMiddleware.getFromCache(key);
  },

  getShipsFromDatabase: async (shipType, weight, homePort) => {
    let query = 'SELECT * FROM spaceData';
    const queryParams = [];

    if (shipType) {
      queryParams.push(shipType);
      query += ' WHERE shipType = ?';
    }

    if (weight) {
      if (queryParams.length > 0) {
        query += ' AND';
      } else {
        query += ' WHERE';
      }
      queryParams.push(weight);
      query += ' weight = ?';
    }

    if (homePort) {
      if (queryParams.length > 0) {
        query += ' AND';
      } else {
        query += ' WHERE';
      }
      queryParams.push(homePort);
      query += ' homePort = ?';
    }

    const rows = await dbPool.query(query, queryParams);

    if (rows.length > 0) {
      return rows; // Return the fetched data
    }
    // If no data in the database, return an empty array
    return [];
  },

  insertRecordsInDatabaseAndCache: async (ships) => {
    const values = ships.map((ship) => [
      ship.id,
      ship.shipId,
      ship.shipType,
      ship.weight,
      ship.homePort,
      ship.shipName,
      ship.shipClass,
    ]);
    let connection;
    try {
      cacheMiddleware.cacheData('ship', ships);
      connection = await dbPool.beginTransactionAsync();
      const insertQuery =
        'INSERT INTO spaceData (id, shipId, shipType, weight, homePort, shipName, class) VALUES ?';
      connection.query(insertQuery, [values]);
      await connection.commit();
      console.log('data inserted successfully');
    } catch (e) {
      if (connection) {
        await connection.rollback();
      }
      console.error('Error inserting data:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  },

  refreshDatabaseAndCacheEvery24Hours: () => {
    // Schedule the function to run every 24 hours
    cron.schedule('0 0 * * *', async () => {
      try {
        console.log('Updating database from SpaceX API...');
        const spaceXShips = await shipService.fetchShipsFromSpaceXAPI();
        const ships = spaceXShips?.map((ship) => ({
          id: uuid.v4(),
          shipId: ship.ship_id,
          shipType: ship.ship_type,
          weight: ship.weight_kg,
          homePort: ship.home_port,
          shipName: ship.ship_name,
          class: ship.ship_class ? ship.shipClass : null,
          shipImage: null,
        }));
        shipService.deleteAndInsetRecordsInDatabaseAndCache(ships);
        console.log('Database and cache updated successfully.');
      } catch (error) {
        console.error('Error updating database:', error);
        throw error;
      }
    });
  },

  deleteAndInsetRecordsInDatabaseAndCache: async (ships) => {
    try {
      const deleteQuery = 'DELETE FROM spaceData';
      await dbPool.query(deleteQuery);
      await shipService.insertRecordsInDatabaseAndCache(ships);
    } catch (e) {
      console.error('Error refreshing data:', e);
      throw e;
    }
  },

  updateShipImage: async (shipId, imageData) => {
    const updateImageQuery = 'UPDATE spaceData SET shipImage = ? WHERE id = ?';
    const updateResult = await dbPool.query(updateImageQuery, [
      imageData,
      shipId,
    ]);
    return updateResult.affectedRows > 0;
  },
};

module.exports = shipService;
