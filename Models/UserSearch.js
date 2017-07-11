//UserSearch Model
module.exports = function (sequelize, DataTypes) {
    var UserSearch = sequelize.define('UserSearch', {
        UserSearchID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('UserSearchID');
            }
        },
        IndustryList: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('IndustryList');
            },
            set: function (val) {
                this.setDataValue('IndustryList', val);
            }
        },
        JobTypeList: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobTypeList');
            },
            set: function (val) {
                this.setDataValue('JobTypeList', val);
            }
        },
        JobFunctionList: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobFunctionList');
            },
            set: function (val) {
                this.setDataValue('JobFunctionList', val);
            }
        },
        DateSearch: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('DateSearch');
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
            tableName: 'usersearch',
            classMethods: {
                associate: function (models) {
                    UserSearch.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                }
            }
        });
    return UserSearch;
};
