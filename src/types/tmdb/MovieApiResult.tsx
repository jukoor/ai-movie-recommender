import { Movie } from "./Movie";

export type MovieApiResult = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
