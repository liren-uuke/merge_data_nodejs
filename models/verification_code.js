/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('verification_code', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		code: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
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
		mobile: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		}
	}, {
		tableName: 'verification_code',
		timestamps: false
	});
};
