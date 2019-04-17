import { FormGroup } from '@angular/forms';

export function DateValidator(form: FormGroup) {
  const values = form.value;
  if (values.periodStart !== null && values.periodEnd !== null) {
    if (values.periodStart.getTime() > values.periodEnd.getTime()) {
      return { periodError: true };
    }
  }
  return null;
}
