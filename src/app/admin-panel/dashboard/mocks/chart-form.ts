import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AsyncStreamValidator} from '../validators/async-stream.validator';

export const chartForm = classService => new FormGroup({
  classes: new FormControl('', [
    Validators.required,
  ], AsyncStreamValidator(classService)),
  graphType: new FormControl('bar', [
    Validators.required
  ])
});
