/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teacher', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		open_code: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0',
			unique: true
		},
		nick_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		mail: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		open_id: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		avatar: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		video: {
			type: DataTypes.STRING(250),
			allowNull: false,
			defaultValue: ''
		},
		contacts: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		contacts_mobile: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		type: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		subject_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		lecturer_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		level: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		class_size_factor: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		is_del: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		wechat_key: {
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
		},
		branch_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'teacher',
		timestamps: false
	});
};
