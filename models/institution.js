/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('institution', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		open_code: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ''
		},
		member_count: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		research_revenue_proportion: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		platform_revenue_proportion: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		institution_revenue_proportion: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		course_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		class_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		share_image: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		share_description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		share_title: {
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
		banner: {
			type: DataTypes.STRING(128),
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
		month_cost: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		pid: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		administrator_mobile: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		seq: {
			type: DataTypes.STRING(100),
			allowNull: true
		}
	}, {
		tableName: 'institution',
		timestamps: false
	});
};
