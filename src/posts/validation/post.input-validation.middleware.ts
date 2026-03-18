import { body } from "express-validator";

const titleValidation = body("title")
  .isString()
  .withMessage("title should be string")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Length of name is not correct");
const descriptionValidation = body("shortDescription")
  .isString()
  .withMessage("description should be string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Length of description is not correct");
const contentValidation = body("content")
  .isString()
  .withMessage("content should be string")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("length of content is not correct");
const blogIdValidation = body("blogId")
  .isString()
  .withMessage("blogId should be string");
export const postInputDtoValidation = [
  titleValidation,
  descriptionValidation,
  contentValidation,
  blogIdValidation,
];
