//JobFunction Model
module.exports = function (sequelize, DataTypes) {
    var JobFunction = sequelize.define('JobFunction', {
        JobFunctionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('JobFunctionID');
            },
            set: function (val) {
                this.setDataValue('JobFunctionID');
            }
        },
        JobFunctionName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobFunctionName');
            },
            set: function (val) {
                this.setDataValue('JobFunctionName');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'jobfunction'
        });

    return JobFunction;
};

