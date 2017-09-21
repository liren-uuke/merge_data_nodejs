/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teacher_qualification', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0',
			unique: true
		},
		subject: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		grade: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		feature: {
			type: DataTypes.STRING(5000),
			allowNull: false,
			defaultValue: ''
		},
		harvest: {
			type: DataTypes.STRING(5000),
			allowNull: false,
			defaultValue: ''
		},
		teach_age: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		school: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		profession: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		degree: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		description: {
			type: DataTypes.STRING(5000),
			allowNull: false,
			defaultValue: ''
		},
		is_del: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
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
		tableName: 'teacher_qualification',
		timestamps: false
	});
};
