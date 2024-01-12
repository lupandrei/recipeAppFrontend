import { FilterOptions } from "./filter";

export interface FullFilterOptions extends FilterOptions{
    search:string|null;
}