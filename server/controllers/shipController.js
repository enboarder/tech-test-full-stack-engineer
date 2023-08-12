const service = require('../services/shipService');

const getAll = async (req, res) => {
	console.log('getAll----', req.query)
	const data = await service.searchAll(req.query);
	return res.json({
		success: true,
		data
	});
}

const update = (req, res, id) => {
	console.log('update', req.params);
	console.log('update', req.body);
	return next();
	
}

module.exports = {
	getAll,
	update
};