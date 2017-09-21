/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lesson_date_rule', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		branch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		digest: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: ''
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		comment: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		status: {
			type: DataTypes.INTEGER(4),
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
		tableName: 'lesson_date_rule',
		timestamps: false
	});
};
