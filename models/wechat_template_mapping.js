/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wechat_template_mapping', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		wechat_key: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		},
		template_code: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		template_id: {
			type: DataTypes.STRING(50),
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
		tableName: 'wechat_template_mapping',
		timestamps: false
	});
};
