/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('operat_type', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: '',
			unique: true
		},
		comment: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: ''
		},
		permission: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'operat_type',
		timestamps: false
	});
};
