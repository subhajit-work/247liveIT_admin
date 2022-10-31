import { AbstractControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MatchPassword(AC: AbstractControl) {
  const password = AC.get('password').value; // to get value in input tag
  const confirmPassword = AC.get('confPassword').value; // to get value in input tag
  if (password !== confirmPassword) {
    AC.get('confPassword').setErrors( {MatchPassword: true} );
  } else {
    return null;
  }
}
