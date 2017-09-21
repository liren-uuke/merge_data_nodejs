/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('statics_lesson_fire', {
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
		class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		lesson_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		start_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		end_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		room_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		number: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		room_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		minutes: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		money: {
			type: DataTypes.BIGINT,
			allowNull: false
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
		study_rate: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		platform_rate: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		institution_rate: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'statics_lesson_fire',
		timestamps: false
	});
};
