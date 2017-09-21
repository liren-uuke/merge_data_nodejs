/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('statics_teacher_fire', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		date_point: {
			type: DataTypes.DATE,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		mobile: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		avatar: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		lecture_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		level: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		level_str: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		institution_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		institution_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		lesson_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		minutes: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		money: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		student_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		unsign_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		sign_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		leave_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		absent_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		teach_point_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		teacher_income: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		platform_fee: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		study_fee: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'statics_teacher_fire',
		timestamps: false
	});
};
