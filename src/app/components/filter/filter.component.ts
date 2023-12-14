import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterOptions } from 'src/app/entity/filter/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filterOptionsEvent = new EventEmitter<FilterOptions>();
  filterOptions: FilterOptions = { rating: null, category: null };
  ratingOptions: number[] = [5, 4, 3, 2, 1];
  categoryOptions: string[] = ['Indian', 'Spanish', 'Chinese', 'Lunch', 'Breakfast'];
  href!:string;
  constructor(private filterService: FilterService) {}
  ngOnInit(): void {
    this.filterOptions = this.filterService.getFilterOptions();
  }

  handleOptionClick(optionType: string, event: any) {
    const clickedElement = event.target;
    let clickedValue = clickedElement.textContent.trim();
    if(clickedValue=='All'){
      clickedValue=''
    }
    if (optionType == 'rating') this.filterOptions.rating = clickedValue;
    else this.filterOptions.category = clickedValue;
    
  }

  sendFilterOptions() {
    this.filterService.setFilterOptions(this.filterOptions)
    this.filterOptionsEvent.emit(this.filterOptions);
    
  }
}
