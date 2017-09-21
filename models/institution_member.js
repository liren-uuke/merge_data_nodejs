/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('institution_member', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		institution_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		revenue_proportion: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		is_del: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'institution_member',
		timestamps: false
	});
};
