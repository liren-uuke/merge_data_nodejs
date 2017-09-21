/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('compensation_record', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		effective_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		level_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		price: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'compensation_record',
		timestamps: false
	});
};
