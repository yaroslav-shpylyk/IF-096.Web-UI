import { FormGroup } from '@angular/forms';

export function confirmPasswordValidator(form: FormGroup): { confirmPasswordError: boolean } | null {
  const password = form.controls.password;
  const confirmPassword = form.controls.confirmPassword;
  if (confirmPassword.value !== password.value) {
    confirmPassword.setErrors({ confirmPasswordError: true });
    return { confirmPasswordError: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
}
