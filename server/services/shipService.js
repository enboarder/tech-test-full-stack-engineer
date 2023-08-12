const shipModels = require('../models/shipModel');
const spaceX = require('./integrationService');
const { isEmpty } = require('ramda')

class Ship {
    async initialLoadData() {
        const existingData = await this.searchAll();
        console.log('--existingData', existingData.length)
        if (!existingData.length) {
            const externalData = await spaceX.getAll();
            await Promise.all(externalData.map((data) => {
                console.log('looop', data);
                const { ship_id, ship_name, ship_type, weight_kg, home_port } = data;
                return this.createShip({
                    shipId: ship_id,
                    shipType:ship_type,
                    weight: weight_kg,
                    homePort: home_port,
                    shipName: ship_name,
                    class: weight_kg && weight_kg > 400000 ? 'heavy' : 'light'
                })
            }));
        }
       
    }
    async createShip(params) {
        await shipModels.create(
            params,
            { fields: ['shipId', 'shipType', 'weight', 'homePort', 'shipName', 'class', 'icon'] }
        );
    }

    async searchAll(params = {}) {
        const { limit, offset, ...others } = params
        let inputParam = {
            limit: parseInt(limit) || 10,
            offset: parseInt(offset) || 0
        };
        console.log('others', others)
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
}

module.exports = new Ship();