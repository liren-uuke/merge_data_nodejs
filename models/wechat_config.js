/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wechat_config', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		wechat_key: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		app_id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		app_secret: {
			type: DataTypes.STRING(100),
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
		tableName: 'wechat_config',
		timestamps: false
	});
};
