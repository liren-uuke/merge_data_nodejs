/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teacher_extention', {
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
		department: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		sex: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '-1'
		},
		age: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '-1'
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: true
		},
		nation: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		politics: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		marital_status: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '-1'
		},
		ancestral_home: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: ''
		},
		domicile_place: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: ''
		},
		id_card: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		bank_card: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		bank: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		provident: {
			type: DataTypes.STRING(100),
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
		tableName: 'teacher_extention',
		timestamps: false
	});
};
