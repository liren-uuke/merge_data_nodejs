/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('test_view', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'test_view',
		timestamps: false
	});
};
