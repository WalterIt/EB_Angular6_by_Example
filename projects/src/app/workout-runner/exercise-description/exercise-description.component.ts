import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'abe-exercise-description',
  templateUrl: './exercise-description.component.html',
  styles: []
})
export class ExerciseDescriptionComponent implements OnInit {
  @Input() description: string;  // The @Input decorator signifies that the component property is available for data binding.
  @Input() steps: string;

  constructor() { }

  ngOnInit() {
  }
}
