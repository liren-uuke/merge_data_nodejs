/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_extention', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		student_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0',
			unique: true
		},
		sex: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		school: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		grade: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		qq: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		address: {
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
		tableName: 'student_extention',
		timestamps: false
	});
};
