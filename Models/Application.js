//Application Model
module.exports = function (sequelize, DataTypes) {
    var Application = sequelize.define('Application', {
        ApplicationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('ApplicationID');
            }
        },
        DateApplied: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('DateApplied');
            }
        },
        ApplicationStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending',
            get: function () {
                return this.getDataValue('ApplicationStatus');
            },
            set: function (val) {
                this.setDataValue('ApplicationStatus', val);
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
            tableName: 'application',
            classMethods: {
                associate: function (models) {
                    Application.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    Application.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
                    Application.belongsTo(models.Resume, { foreignKey: 'ResumeID', onDelete: 'CASCADE' });
                }
            }
        });
    return Application;
};

