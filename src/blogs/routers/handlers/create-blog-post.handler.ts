import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/http-statuses";
import { PostForBlogInputDTO } from "../../../posts/dto/posts-input.dto";
import { postsRepository } from "../../../posts/repositories/posts.repository";
import { mapToPostViewModel } from "../../../posts/routes/mappers/map-to-post";
import { PostDbModel } from "../../../posts/types/post-db-model";
import { blogsRepository } from "../../repositories/blog.repository";

export async function createBlogPostHandler(
  req: Request<{ blogId: string }, {}, PostForBlogInputDTO>,
  res: Response,
) {
  try {
    const blogId = req.params.blogId;

    if (!ObjectId.isValid(blogId)) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      return res.sendStatus(HttpStatus.NotFound);
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
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
