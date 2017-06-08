//Job Model
module.exports = function (sequelize, DataTypes) {
    var Job = sequelize.define('Job', {
        JobID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('JobID');
            },
            set: function (val) {
                this.setDataValue('JobID');
            }
        },
        JobTitle: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobTitle');
            },
            set: function (val) {
                this.setDataValue('JobTitle');
            }
        },
        JobDescription: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobDescription');
            },
            set: function (val) {
                this.setDataValue('JobDescription');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'job'
        });

    // // force: true will drop the table if it already exists
    // Job.sync({ force: true }).then(() => {
    //     // Table created
    //     return Job.create({
    //         JobTitle: 'Job1',
    //         JobDescription: 'This Job 1'
    //     },
    //         {
    //             JobTitle: 'Job2',
    //             JobDescription: 'This Job 2'
    //         });
    // });
    return Job;
};

// getterMethods: {
//     fullName() {
//       return this.firstname + ' ' + this.lastname
//     }
//   },

//   setterMethods: {
//     fullName(value) {
//       const names = value.split(' ');

//       this.setDataValue('firstname', names.slice(0, -1).join(' '));
//       this.setDataValue('lastname', names.slice(-1).join(' '));
//     },
//   }