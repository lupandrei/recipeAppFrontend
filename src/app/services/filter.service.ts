import { Injectable } from '@angular/core';
import { FilterOptions } from '../entity/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterOptions: FilterOptions = { rating: null, category: null };
  constructor() { }
  getFilterOptions() {
    return this.filterOptions
  }
  setFilterOptions(filterOptions: FilterOptions) {
    this.filterOptions.category = filterOptions.category;
    this.filterOptions.rating = filterOptions.rating;
  }
}
