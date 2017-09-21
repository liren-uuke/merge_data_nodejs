/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('continue_signup', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		year: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		season: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		teacher_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		branch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		teach_point_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		class_room_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		grade_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		class_type_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		period: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		lesson_time_range_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		lesson_date_rule_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		lesson_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		max_students: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		is_finish: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		is_del: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		generated_course_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		generated_class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		is_order_generated: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'continue_signup',
		timestamps: false
	});
};
