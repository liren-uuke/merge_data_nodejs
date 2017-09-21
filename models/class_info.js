/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('class_info', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		open_code: {
			type: DataTypes.STRING(30),
			allowNull: false,
			defaultValue: ''
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		course_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		branch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		price: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		period: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		max_students: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		reserve_students: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		pay_cal_type: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1'
		},
		subject_level_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		class_type_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		is_del: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		status: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		classroom_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		teach_point_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		lesson_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		rule_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		lesson_time: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: ''
		},
		actual_students: {
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
		},
		lesson_date_rule_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		lesson_time_range_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		continue_to_class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		scale: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		additional_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		adjust_limit: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		signup_fee: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		book_fee: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		link: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		online_type: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		institution_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		live_channel_id: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		introduction: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		cover: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		valid_date: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		on_shelves_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		begin_date: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		live_password: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		research_revenue_proportion: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		platform_revenue_proportion: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		teacher_revenue_proportion: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		allow_withdraw: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '1'
		},
		grade_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		course_type_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		subject_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		year: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		season: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		trans_limit: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		continue_time_start: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		continue_time_end: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		trans_time_start: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		trans_time_end: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		all_time_start: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		all_time_end: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		}
	}, {
		tableName: 'class_info',
		timestamps: false
	});
};
