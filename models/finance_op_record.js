/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('finance_op_record', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		order_number: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		operat_type: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		operator_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		content: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: ''
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'finance_op_record',
		timestamps: false
	});
};
