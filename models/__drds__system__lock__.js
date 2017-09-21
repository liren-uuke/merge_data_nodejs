/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('__drds__system__lock__', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		gmt_create: {
			type: DataTypes.DATE,
			allowNull: false
		},
		gmt_modified: {
			type: DataTypes.DATE,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		token: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		identity: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		operator: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: '__drds__system__lock__',
		timestamps: false
	});
};
