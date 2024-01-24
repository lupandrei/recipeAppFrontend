import { Component, Input } from '@angular/core';
import { MetResultDto } from 'src/app/entity/macro/met-result-dto';

@Component({
  selector: 'app-time-to-burn',
  templateUrl: './time-to-burn.component.html',
  styleUrls: ['./time-to-burn.component.scss']
})
export class TimeToBurnComponent {
  @Input()
  durations!:MetResultDto;
  @Input()
  calories!:number
}
