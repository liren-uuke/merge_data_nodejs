/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('op_record', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		function_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		type_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		op_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		op_info: {
			type: DataTypes.STRING(2048),
			allowNull: false,
			defaultValue: ''
		},
		op_params: {
			type: DataTypes.STRING(2048),
			allowNull: false,
			defaultValue: ''
		},
		op_result: {
			type: DataTypes.STRING(2048),
			allowNull: false,
			defaultValue: ''
		},
		user_agent: {
			type: DataTypes.STRING(1024),
			allowNull: false,
			defaultValue: ''
		},
		institution_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '-1'
		}
	}, {
		tableName: 'op_record',
		timestamps: false
	});
};
