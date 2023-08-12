const fetch = require('node-fetch') ;
const env = require('dotenv');
env.config();

class SpaceX {
    async getAll() {
        try {
            const response = await fetch(process.env.EXTERNAL, {
              method: 'get',
            });

            if (response.status === 200 || response.status === 201) {
                const body = await response.json();
                return body;
            } else {
                throw new Error(`Error with status=${response.status}`);
            }
          } catch (err) {
            console.error(err);
            return [];
          }
    }
}

module.exports = new SpaceX();