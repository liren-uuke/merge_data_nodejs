/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		number: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		avatar: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		mobile: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		parent_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		parent_mobile: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		mail: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		qq: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		},
		sex: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '-1'
		},
		school: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		grade: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: true
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
		},
		grade_update_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '-1'
		},
		sign_agreement: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		sign_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		system: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'student',
		timestamps: false
	});
};
