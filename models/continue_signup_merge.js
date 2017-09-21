/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('continue_signup_merge', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		from_class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		to_class_id: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		season: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'continue_signup_merge',
		timestamps: false
	});
};
