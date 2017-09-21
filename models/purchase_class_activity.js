/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('purchase_class_activity', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		purchase_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		activity_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		preferential: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		discount: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '100'
		},
		activity_type: {
			type: DataTypes.INTEGER(4),
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
		}
	}, {
		tableName: 'purchase_class_activity',
		timestamps: false
	});
};
