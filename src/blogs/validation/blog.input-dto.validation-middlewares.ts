import { body } from "express-validator";
const httpsUrlPattern =
  /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
const nameValidation = body("name")
  .isString()
  .withMessage("name should be string")
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("Length of name is not correct");
const descriptionValidation = body("description")
  .isString()
  .withMessage("description should be string")
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage("Length of description is not correct");
const websiteValidation = body("websiteUrl")
  .isString()
  .withMessage("websiteUrl should be string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("length of websiteUrl is not correct")
  .matches(httpsUrlPattern)
  .withMessage("websiteUrl should be a valid URL");

export const blogInputDtoValidation = [
  nameValidation,
  descriptionValidation,
  websiteValidation,
];
