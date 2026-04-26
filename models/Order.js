const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
id:
{
    type: DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey: true
},
userID:
{
    type: DataTypes.INTEGER,
    allowNull: false,  
    references: {
      model: 'User',   // table name
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE' 
},
productname:
{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {      
      is: {
        args: /^[A-Za-z]+$/,
        msg: "Product name must not contain special characters"
      }
    }
},
productSKU:
{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {      
      is: {
        args: /^[A-Za-z0-9]+$/,
        msg: "Product SKU not contain special characters"
      }
    }
}
});

module.exports = Order;