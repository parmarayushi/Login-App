import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { RegistrationService } from '../../registration.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationPresenterService {

  private userData: Subject<User>;
  public userData$: Observable<User>;

  constructor(
    private _fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.userData = new Subject();
    this.userData$ = new Observable();

    this.userData$ = this.userData.asObservable();
  }

  public buildForm() {
    return this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL_PATTERN)]],
      password: this._fb.group({
        password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN), Validators.minLength(8), Validators.maxLength(12)]],
        confirmPassword: ['', Validators.required],
      }, { validator: this.registrationService.confirmPassword })
    });
  }

  public submitForm(userForm: FormGroup) {
    this.userData.next(userForm.value);
  }
}
