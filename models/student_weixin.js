/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_weixin', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		mobile: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: '0'
		},
		open_id: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: '',
			unique: true
		},
		union_id: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
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
		}
	}, {
		tableName: 'student_weixin',
		timestamps: false
	});
};
