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
            }
        },
        JobFunctionName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobFunctionName');
            },
            set: function (val) {
                this.setDataValue('JobFunctionName', val);
            }
        },
        RecordStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A',
            get: function () {
                return this.getDataValue('RecordStatus');
            },
            set: function (val) {
                this.setDataValue('RecordStatus', val);
            }
        },
        LastUpdated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('LastUpdated');
            },
            set: function (val) {
                this.setDataValue('LastUpdated', val);
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'jobfunction',
            classMethods: {
                associate: function (models) {
                    JobFunction.belongsToMany(models.Job, { through: 'jobfunctionjob', foreignKey: 'JobFunctionID', onDelete: 'CASCADE', timestamps: false });
                }
            }
        });
    return JobFunction;
};

