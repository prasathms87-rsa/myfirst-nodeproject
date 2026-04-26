const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
id:
{
    type: DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey: true
},
firstname:
{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "First name required" },
      is: {
        args: /^[A-Za-z]+$/,
        msg: "First name must not contain special characters"
      }
    }
},
lastname:
{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Last name required" },
      is: {
        args: /^[A-Za-z]+$/,
        msg: "Last name must not contain special characters"
      }
    }
},
gender:
{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Gender required" },
      is: {
        args: /^[A-Za-z]+$/,
        msg: "Invalid gender value"
      }
    }
},
age:
{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Age required" },
      isInt: { msg: "Age must be a number" }
    }
},
location:
{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Location required" },
      is: {
        args: /^[A-Za-z\s]+$/,
        msg: "Location must not contain special characters"
      }
    }
}

});

module.exports = User;