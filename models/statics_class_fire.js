/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('statics_class_fire', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		date_point: {
			type: DataTypes.DATE,
			allowNull: false
		},
		teacher_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		teacher_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		teacher_mobile: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		class_number: {
			type: DataTypes.STRING(50),
			allowNull: false
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
		forecast_money: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		lesson_time: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		rule_name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		period: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		student_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		unsign_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		sign_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		leave_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		absent_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		teach_point_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		teacher_income: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		platform_fee: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		study_fee: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		province: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		branch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		branch_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		teach_point_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'statics_class_fire',
		timestamps: false
	});
};
