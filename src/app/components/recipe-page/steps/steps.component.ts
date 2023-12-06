import { Component, Input } from '@angular/core';
import { StepDto } from 'src/app/entity/step/step-dto';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  @Input()
  steps!:StepDto[];
}
