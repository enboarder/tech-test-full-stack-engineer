const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Ship = sequelize.define('ship', {
		id: {
			type: DataTypes.UUID,
  			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		shipId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		shipType: DataTypes.STRING,
		weight: DataTypes.INTEGER,
		homePort: DataTypes.STRING,
		shipName: DataTypes.STRING,
        class: DataTypes.STRING,
        icon: DataTypes.STRING,
		ttl: DataTypes.INTEGER
  	},
	{
		indexes: [
			// Create a unique index on id
			{
				unique: true,
				fields: ['shipId']
			}],
	});

Ship.sync({
	// alter: true
});

module.exports = Ship;