import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { PostInputDTO } from "../../dto/posts-input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsRepository } from "../../../blogs/repositories/blog.repository";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { mapToPostViewModel } from "../mappers/map-to-post";
import { PostDbModel } from "../../types/post-db-model";

export async function createPostHandler(
  req: Request<{}, {}, PostInputDTO>,
  res: Response,
) {
  try {
    const blogId = req.body.blogId;

    if (!ObjectId.isValid(blogId)) {
      return res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ message: "Blog not found", field: "blogId" }]),
        );
    }

    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      return res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ message: "Blog not found", field: "blogId" }]),
        );
    }

    const newPost: PostDbModel = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const createdPost = await postsRepository.create(newPost);
    const postViewModel = mapToPostViewModel(createdPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
