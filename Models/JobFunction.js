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
                this.setDataValue('JobFunctionID', val);
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
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'jobfunction',
            classMethods: {
                associate: function (models) {
                    JobFunction.belongsToMany(models.Job, { through: 'jobfunctionjob', foreignKey: 'JobFunctionID', onDelete: 'CASCADE', timestamps: false });
                    //JobFunction.belongsTo(models.Userexperience, { foreignKey: 'UserExpID', onDelete: 'CASCADE' });
                    //JobFunction.hasMany(models.UserSearch, { foreignKey: 'JobFunctionID', onDelete: 'CASCADE' });
                }
            }
        });
    return JobFunction;
};

