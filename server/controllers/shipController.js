const service = require('../services/shipService');
const cacheService = require('../services/cacheService');

const getAll = async (req, res) => {
	console.log('------- get data from db -----');
	const data = await service.searchAll(req.query);
	console.log(`cache data on ${req.originalUrl}`);
    await cacheService.storeCache(req.originalUrl, data)
	return res.json({
		success: true,
		data
	});
}

const update = async (req, res, id) => {
	console.log(req.params, req.body);
	await service.update(req.params.id, req.body);
	return res.json({
		success: true
	});
}

module.exports = {
	getAll,
	update
};