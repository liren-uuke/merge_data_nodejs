/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wechat_template_msg', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		template_id: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: ''
		},
		operator_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		class_ids: {
			type: DataTypes.STRING(2000),
			allowNull: false,
			defaultValue: ''
		},
		msg_type: {
			type: DataTypes.INTEGER(100),
			allowNull: false,
			defaultValue: '0'
		},
		subject: {
			type: DataTypes.STRING(500),
			allowNull: false,
			defaultValue: ''
		},
		content: {
			type: DataTypes.STRING(5000),
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
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		success: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		failed: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		failed_ids: {
			type: DataTypes.STRING(5000),
			allowNull: false,
			defaultValue: ''
		},
		student_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		bind_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wechat_template_msg',
		timestamps: false
	});
};
