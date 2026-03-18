import { Request, Response } from "express";
import { PostInputDTO } from "../../dto/posts-input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { Post } from "../../types/post";
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
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      return res.sendStatus(HttpStatus.BadRequest);
    }

    const newPost: PostDbModel = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
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
