import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/http-statuses";
import {
  PaginatedViewModel,
  SortDirection,
} from "../../../core/types/pagination";
import { postsRepository } from "../../../posts/repositories/posts.repository";
import { mapToPostViewModel } from "../../../posts/routes/mappers/map-to-post";
import { PostQueryParams } from "../../../posts/types/post-query";
import { PostViewModel } from "../../../posts/types/postViewModel";
import { blogsRepository } from "../../repositories/blog.repository";

export async function getBlogPostsListHandler(
  req: Request<{ blogId: string }>,
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

    const query = getPostQueryParams(req.query);
    const { items, totalCount } =
      await postsRepository.findByBlogIdWithPagination(blogId, query);

    const response: PaginatedViewModel<PostViewModel> = {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: items.map(mapToPostViewModel),
    };

    res.status(HttpStatus.Ok).send(response);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

function getPostQueryParams(query: Request["query"]): PostQueryParams {
  return {
    sortBy: parsePostSortBy(query.sortBy),
    sortDirection: parseSortDirection(query.sortDirection),
    pageNumber: parsePositiveInteger(query.pageNumber, 1),
    pageSize: parsePositiveInteger(query.pageSize, 10),
  };
}

function parsePostSortBy(value: unknown): string {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : "createdAt";
}

function parseSortDirection(value: unknown): SortDirection {
  return value === "asc" || value === "desc" ? value : "desc";
}

function parsePositiveInteger(value: unknown, defaultValue: number): number {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : defaultValue;
}
