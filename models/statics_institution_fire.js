/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('statics_institution_fire', {
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
		institution_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		institution_name: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		money: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		lesson_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		minutes: {
			type: DataTypes.INTEGER(10),
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
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		month_cost: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		payup_count: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'statics_institution_fire',
		timestamps: false
	});
};
