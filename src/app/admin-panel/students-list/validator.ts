import { Validators } from '@angular/forms';

export const validText = [
  Validators.required,
  Validators.minLength(3),
  Validators.pattern(
    /[А-Я+І][абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ']*$/
  )
];
export const validPhone = [
  Validators.pattern(/^-?\d+$/),
  Validators.minLength(3)
];


export const validLogin = [
  Validators.minLength(3)
];



