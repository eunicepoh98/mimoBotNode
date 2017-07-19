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
            }
        },
        IndustryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            get: function () {
                return this.getDataValue('IndustryName');
            },
            set: function (val) {
                this.setDataValue('IndustryName', val);
            }
        },
        Synonyms: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('Synonyms');
            },
            set: function (val) {
                this.setDataValue('Synonyms', val);
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
            tableName: 'industry',
            classMethods: {
                associate: function (models) {
                    Industry.belongsToMany(models.Job, { through: 'jobindustry', foreignKey: 'IndustryID', onDelete: 'CASCADE', timestamps: false });
                }
            }
        });
    return Industry;
};

