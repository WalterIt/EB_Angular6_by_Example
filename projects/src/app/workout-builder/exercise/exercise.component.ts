import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Exercise } from '../../core/model';
// Integrating a custom validator into our forms : AlphaNumericValidator
import { AlphaNumericValidator } from '../alphanumeric-validator';
import { ExerciseBuilderService } from '../builder-services/exercise-builder.service';


@Component({  selector: 'abe-exercise',
  templateUrl: './exercise.component.html',
  styles: []
})
export class ExerciseComponent implements OnInit, OnDestroy {
  public exercise: Exercise;
  public submitted = false;
  public exerciseForm: FormGroup;
  public model: any;
  public video: any;
  public sub: any;
  public videoArray: FormArray = new FormArray([]);

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public exerciseBuilderService: ExerciseBuilderService,
      /**
       * Using the FormBuilder API
       *
       * The FormBuilder API is the foundation for reactive forms. You can think of it as a factory
       *  for turning out the forms we are constructing in our code. Go ahead and add the ngOnInit life
       *  cycle hook to your class, as follows:
       */
      public formBuilder: FormBuilder
  ) {}

  /**
   * When ngOnInit fires, it will extract the data for an existing or new exercise from the route data that
   *  has been retrieved and returned by ExerciseResolver. This is the same pattern we followed with initializing
   *  the Workout component.
   */
  ngOnInit() {
    this.sub = this.route.data
        .subscribe(
          (data: { exercise: Exercise }) => {
            this.exercise = data.exercise;
          }
        );

      this.buildExerciseForm();
  }

  buildExerciseForm() {
      /**
       * Let's examine this code. To start with, we are using the injected instance of FormBuilder to
       *  construct the form and assign it to a local variable, exerciseForm. Using formBuilder.group,
       *  we add several form controls to our form. We add each of them by a simple key/value mapping:
       *          'name': [this.exercise.name, Validators.required],
       *
       * The left side of the mapping is the name of the FormControl, and the right is an array containing
       *  as its first element the value of the control (in our case, the corresponding element on our exercise
       *  model) and the second a validator (in this case, the out-of-the-box required validator). Nice and neat!
       *  It's definitely easier to see and reason about our form controls by setting them up outside the template.
       *
       * We can not only build up FormControls in our form this way, but also add FormControlGroups and
       *  FormControlArray, which contain FormControls within them. This means we can create complex forms that
       *  contain nested input controls.
       */
      this.exerciseForm = this.formBuilder.group({
          'name': [
            this.exercise.name,
            {
              /**   Configuration options for running validation:  on Blur
               * Before we move on from validation, there is one more topic to cover and that is configuration options
               *  for running the validations. So far, we have been using the default option, which runs validation checks
               *  on every input event. However, you have the choice of configuring them to run either on "blur"(that is when
               *  the user leaves an input control) or when the form is submitted. You can set this configuration at the form
               *  level or on a control-by-control basis.
               *
               * For example, we might decide that to avoid the complexity of handling missing exercises in the workout form,
               *  we will set that form to validate only upon submit. We can set this by adding the following highlighted
               *  assignment of NgFormOptions to the form tag:
               *
        <form #f="ngForm" name="formWorkout" (ngSubmit)="save(f.form)" [ngFormOptions]="{updateOn: 'submit'}" class="row">
               */
              updateOn: 'blur',
              /**
               * add the validator to the name control: - Integrating a custom validator into our forms - AlphaNumericValidator
               *
               * Since the name control already has a required validator, we add AlphaNumericValidator as a second
               *  validator using an array that contains both validators. The array can be used to add any number of
               *  validators to a control.
               */
              validators: [Validators.required, AlphaNumericValidator.invalidAlphaNumeric]
            }
          ],
          'title': [this.exercise.title, Validators.required],
          'description': [this.exercise.description, Validators.required],
          'image': [this.exercise.image, Validators.required],
          'nameSound': [this.exercise.nameSound],
          'procedure': [this.exercise.procedure],
          /**
           *  In our case, as we have mentioned, we are going to need to accommodate the possibility
           *  of our users adding multiple videos to an exercise. We can do this by adding the following code:
           */
          'videos': this.addVideoArray()
      });
  }

  /**
   * What we are doing here is assigning a FormArray to videos, which means we can assign multiple controls
   *  in this mapping. To construct this new FormArray, we add the following addVideoArray method to our class:
   *
   * ...
   * This method constructs a FormControl for each video; each is then added each to a FormArray that is assigned
   *  to the videos control in our form.
    */
  addVideoArray(): FormArray {
      if (this.exercise.videos) {
          this.exercise.videos.forEach((video: any) => {
              this.videoArray.push(new FormControl(video, Validators.required));
          });
      }
      return this.videoArray;
  }

  /**
   * The final step in building out our reactive form is to handle saving the form. When we constructed the
   *  form tag earlier, we bound the ngSubmit event to the following onSubmit method in our code:
   */
  onSubmit(formExercise: FormGroup) {
      /**
       * This method sets submitted to true, which will trigger the display of any validation messages that might
       *  have been previously hidden because the form had not been touched.
       */
      this.submitted = true;
      // It also returns without saving in the event that there are any validation errors on the form.
      if (!formExercise.valid) { return; }
      /**
       * If there are no erros, then it calls the following mapFormValues method, which assigns the values
       *  from our form to the exercise that will be saved:
       */
      this.mapFormValues(formExercise);
      /**
       * It then calls the save method in ExerciseBuilderService and routes the user back to the exercise
       *  list screen (remember that any new exercise will not display in that list because we have not yet
       *  implemented data persistence in our application).
       */
      this.exerciseBuilderService.save();
      this.router.navigate(['/builder/exercises']);
  }

  delete() {
      this.exerciseBuilderService.delete();
      this.router.navigate( ['/builder/exercises'] );
  }

  addVideo() {
      this.exerciseBuilderService.addVideo();
      const vidArray = <FormArray>this.exerciseForm.controls['videos'];
      vidArray.push(new FormControl('', Validators.required));
  }

  canDeleteExercise() {
      this.exerciseBuilderService.canDeleteExercise();
  }

  deleteVideo(index: number) {
      this.exerciseBuilderService.deleteVideo(index);
      const vidArray = <FormArray>this.exerciseForm.controls['videos'];
      vidArray.removeAt(index);
  }

  mapFormValues(form: FormGroup) {
      this.exercise.name = form.controls['name'].value;
      this.exercise.title = form.controls['title'].value;
      this.exercise.description = form.controls['description'].value;
      this.exercise.image = form.controls['image'].value;
      this.exercise.nameSound = form.controls['nameSound'].value;
      this.exercise.procedure = form.controls['procedure'].value;
      this.exercise.videos = form.controls['videos'].value;
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
