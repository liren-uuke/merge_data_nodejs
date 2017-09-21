/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pay_account', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		mobile: {
			type: DataTypes.STRING(30),
			allowNull: false,
			defaultValue: '',
			unique: true
		},
		code: {
			type: DataTypes.STRING(80),
			allowNull: false,
			defaultValue: ''
		},
		secret: {
			type: DataTypes.STRING(80),
			allowNull: false,
			defaultValue: ''
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false,
			defaultValue: ''
		},
		source: {
			type: DataTypes.STRING(150),
			allowNull: false,
			defaultValue: ''
		},
		user_role: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '2'
		},
		remark: {
			type: DataTypes.STRING(500),
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
		}
	}, {
		tableName: 'pay_account',
		timestamps: false
	});
};
