/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pos_pay_info', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		pay_channel: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		price: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		purchase_number: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		merchant_no: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		terminal_no: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ''
		},
		issuer: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		card_no: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		batch_no: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		voucher_no: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		auth_no: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		refer_no: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		trade_time: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		return_code: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: '00'
		},
		pos_no: {
			type: DataTypes.STRING(30),
			allowNull: true,
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
		}
	}, {
		tableName: 'pos_pay_info',
		timestamps: false
	});
};
