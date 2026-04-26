const { param, query, body } = require("express-validator");

exports.UserById = [
  param("id").isInt().withMessage("Invalid ID")
];

exports.createUserdata = [
  param("id").isInt().withMessage("Invalid ID"),
  body("firstname").notEmpty().withMessage("First Name required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("lastname").notEmpty().withMessage("Last Name required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("gender").notEmpty().withMessage("gender required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("age").notEmpty().withMessage("age required").isInt().withMessage("Age must be a number"),
  body("location").notEmpty().withMessage("location required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed")
];
exports.PutUserdata = [
  param("id").isInt().withMessage("Invalid ID"),
  body("firstname").notEmpty().withMessage("First Name required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("lastname").notEmpty().withMessage("Last Name required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("gender").notEmpty().withMessage("gender required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("age").notEmpty().withMessage("age required").isInt().withMessage("Age must be a number"),
  body("location").notEmpty().withMessage("location required").matches(/^[A-Za-z]+$/).withMessage("No special characters allowed")
];
exports.PatchUserdata = [
  param("id").isInt().withMessage("Invalid ID"),
  body("firstname").optional().matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("lastname").optional().matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("gender").optional().matches(/^[A-Za-z]+$/).withMessage("No special characters allowed"),
  body("age").optional().isInt().withMessage("Age must be a number"),
  body("location").optional().matches(/^[A-Za-z]+$/).withMessage("No special characters allowed")
];



