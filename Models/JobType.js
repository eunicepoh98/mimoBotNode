//JobType Model
module.exports = function (sequelize, DataTypes) {
    var JobType = sequelize.define('JobType', {
        JobTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('JobTypeID');
            },
            set: function (val) {
                this.setDataValue('JobTypeID', val);
            }
        },
        JobType: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobType');
            },
            set: function (val) {
                this.setDataValue('JobType', val);
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'jobtype',
            classMethods: {
                associate: function (models) {
                    JobType.hasMany(models.Job, { foreignKey: 'JobTypeID', onDelete: 'CASCADE' });
                    //JobType.hasMany(models.UserSearch, { foreignKey: 'JobTypeID', onDelete: 'CASCADE' });
                }
            },
        });
    return JobType;
};

