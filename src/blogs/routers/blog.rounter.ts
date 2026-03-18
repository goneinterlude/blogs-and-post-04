import { Router } from "express";
import { superAdminGuardMiddleware } from "../../auth/admin.guard-middleware";
import { getBlogsListHandler } from "./handlers/get-blog-list.handler";
import { idValidation } from "../../core/middlewares.validation/params-id.validation-middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares.validation/input-validation-result.middleware";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { blogInputDtoValidation } from "../validation/blog.input-dto.validation-middlewares";

export const blogsRouter = Router({});

blogsRouter
  .get("", getBlogsListHandler)

  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler)

  .post(
    "",
    superAdminGuardMiddleware,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  );
