//Resume Model
module.exports = function (sequelize, DataTypes) {
    var Resume = sequelize.define('Resume', {
        ResumeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('ResumeID');
            }
        },
        Description: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('Description');
            },
            set: function (val) {
                this.setDataValue('Description', val);
            }
        },
        MD5Code: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('MD5Code');
            },
            set: function (val) {
                this.setDataValue('MD5Code', val);
            }
        },
        PathName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('PathName');
            },
            set: function (val) {
                this.setDataValue('PathName', val);
            }
        },
        FileName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('FileName');
            },
            set: function (val) {
                this.setDataValue('FileName', val);
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
            set: function () {
                this.setDataValue('LastUpdated', new Date().toISOString().slice(0, 19));
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'resume',
            classMethods: {
                associate: function (models) {
                    Resume.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    Resume.hasOne(models.Application, { foreignKey: 'ResumeID', onDelete: 'CASCADE' });
                }
            }
        });
    return Resume;
};
