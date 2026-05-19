import { SortDirection } from "../../core/types/pagination";

export type PostSortBy = "createdAt";

export type PostQueryParams = {
  sortBy: PostSortBy;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};
