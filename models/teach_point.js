/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teach_point', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		open_code: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		short_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: 'SH'
		},
		lng: {
			type: "DOUBLE",
			allowNull: false,
			defaultValue: '0'
		},
		lat: {
			type: "DOUBLE",
			allowNull: false,
			defaultValue: '0'
		},
		address: {
			type: DataTypes.STRING(128),
			allowNull: false,
			defaultValue: ''
		},
		branch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
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
		},
		province: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		city: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		county: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		mobile: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		},
		finance_mobile: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		},
		function_value: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'teach_point',
		timestamps: false
	});
};
