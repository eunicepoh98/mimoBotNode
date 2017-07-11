//UserBookmark Model
module.exports = function (sequelize, DataTypes) {
    var Bookmark = sequelize.define('Bookmark', {
        BookmarkID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('BookmarkID');
            },
            set: function (val) {
                this.setDataValue('BookmarkID');
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
            tableName: 'bookmark',
            classMethods: {
                associate: function (models) {
                    Bookmark.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    Bookmark.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
                }
            },
        });
    return Bookmark;
};
