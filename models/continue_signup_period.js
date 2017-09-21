/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('continue_signup_period', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		year: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		period: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		season: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false
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
		is_work: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		is_del: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'continue_signup_period',
		timestamps: false
	});
};
