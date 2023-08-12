const shipModels = require('../models/shipModel');
const spaceX = require('./integrationService');
const { isEmpty } = require('ramda')
const { Op } = require("sequelize");

class Ship {
    async initialLoadData() {
        const existingData = await this.searchAll();

        if (!existingData.length) {
            const externalData = await spaceX.getAll();
            await Promise.all(externalData.map((data) => {

                const { ship_id, ship_name, ship_type, weight_kg, home_port } = data;
                const ttl = Math.ceil(Date.now() / 1000) + 24 * 3600;
                return this.createShip({
                    shipId: ship_id,
                    shipType:ship_type,
                    weight: weight_kg,
                    homePort: home_port,
                    shipName: ship_name,
                    class: weight_kg && weight_kg > 400000 ? 'heavy' : 'light',
                    ttl
                })
            }));
        }
       
    }
    async createShip(params) {
        await shipModels.create(
            params,
            { fields: ['shipId', 'shipType', 'weight', 'homePort', 'shipName', 'class', 'icon', 'ttl'] }
        );
    }

    async searchAll(params = {}) {
        const { limit, offset, ...others } = params
        let inputParam = {
            limit: parseInt(limit) || 10,
            offset: parseInt(offset) || 0
        };

        if (!isEmpty(others)) {
            inputParam = {
                ...inputParam,
                where: {
                    ...others
                }
            };
        }

        console.log('inputParam', inputParam)
        const data = await shipModels.findAll(inputParam);
        return data
    }

    async update(id, param) {
        const data = await shipModels.update(param, {
            where: {
                id
            }
        });
        console.log("update:", data);
    }

    async cleanUp() {
        const currentTimestamp = Math.ceil(Date.now() / 1000);
        await shipModels.destroy({
            where: {
                ttl: {
                    [Op.lte]: currentTimestamp,    
                } 
            }
        })
    }
}

module.exports = new Ship();