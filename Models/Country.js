//Country Model
module.exports = function (sequelize, DataTypes) {
    var Country = sequelize.define('Country', {
        CountryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('CountryID');
            }
        },
        CountryName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CountryName');
            },
            set: function (val) {
                this.setDataValue('CountryName', val);
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
            tableName: 'country',
            classMethods: {
                associate: function (models) {
                    Country.hasMany(models.Job, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                    Country.hasMany(models.User, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                }
            },
        });
    return Country;
};

