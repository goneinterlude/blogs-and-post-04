import { SortDirection } from "../../core/types/pagination";

export type PostQueryParams = {
  sortBy: string;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};
