import { Component, Input } from '@angular/core';
import { StepDto } from 'src/app/entity/step/step-dto';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {
  @Input()
  step!:StepDto;
}
