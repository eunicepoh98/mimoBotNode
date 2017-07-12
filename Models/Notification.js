//Notification model
module.exports = function (sequelize, DataTypes) {
    var Notification = sequelize.define('Notification', {
        NotificationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('NotificationID');
            },
            set: function (val) {
                this.setDataValue('NotificationID');
            },
        },
        Title: {
            type: DataTypes.STRING(),
            allowNull: false,
            get: function () {
                return this.getDataValue('Title');
            },
            set: function (val) {
                this.setDataValue('Title', val);
            }
        },
        Description: {
            type: DataTypes.STRING(),
            allowNull: false,
            get: function () {
                return this.getDataValue('Description');
            },
            set: function (val) {
                this.setDataValue('Description', val);
            }
        },
        DateSent: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('DateSent');
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
            tableName: 'notification',
            classMethods: {
                associate: function (models) {
                    Notification.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                }
            }
        });
    return Notification;
};