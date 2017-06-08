//Industry Model
module.exports = function (sequelize, DataTypes) {
    var Industry = sequelize.define('Industry', {
        IndustryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('IndustryID');
            },
            set: function (val) {
                this.setDataValue('IndustryID');
            }
        },
        IndustryName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('IndustryName');
            },
            set: function (val) {
                this.setDataValue('IndustryName');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'industry'
        });

    return Industry;
};

