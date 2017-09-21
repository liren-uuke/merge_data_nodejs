/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('classroom_device', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		classroom_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		device_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		is_del: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'classroom_device',
		timestamps: false
	});
};
