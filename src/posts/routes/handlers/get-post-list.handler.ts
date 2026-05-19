import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModel } from "../mappers/map-to-post";
import {
  PaginatedViewModel,
  SortDirection,
} from "../../../core/types/pagination";
import { PostQueryParams } from "../../types/post-query";
import { PostViewModel } from "../../types/postViewModel";

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const query = getPostQueryParams(req.query);
    const { items, totalCount } = await postsRepository.findWithPagination(
      query,
    );

    const response: PaginatedViewModel<PostViewModel> = {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: items.map(mapToPostViewModel),
    };

    res.status(HttpStatus.Ok).send(response);
  } catch (error) {
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
