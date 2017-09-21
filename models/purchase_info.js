/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('purchase_info', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		student_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		ip: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		purchase_number: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		purchase_type: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1'
		},
		total_price: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		balance: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		pay_type: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		pay_channel: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		pay_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		branch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		teach_point_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		remark: {
			type: DataTypes.STRING(2000),
			allowNull: false,
			defaultValue: ''
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
		},
		is_del: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		poundage: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		trade_no: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		from_student: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		finance_checked: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		student_status: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '-1'
		},
		operator_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		sign_type: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		institution_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '-1'
		}
	}, {
		tableName: 'purchase_info',
		timestamps: false
	});
};
