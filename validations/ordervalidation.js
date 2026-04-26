const { param, query, body } = require("express-validator");

exports.OrderById = [
  param("id").isInt().withMessage("Invalid ID")
];

exports.createOrderdata = [
  body("userID").isInt().withMessage("User ID Invalid "),
  body("productname").notEmpty().withMessage("Product Name required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("productSKU").notEmpty().withMessage("Product SKU required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed") 
];





