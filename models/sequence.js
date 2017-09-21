/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sequence', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		value: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		gmt_modified: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'sequence',
		timestamps: false
	});
};
