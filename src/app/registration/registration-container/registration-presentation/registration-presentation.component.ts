import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { RegistrationPresenterService } from '../registration-presenter/registration-presenter.service';

@Component({
  selector: 'app-registration-presentation',
  templateUrl: './registration-presentation.component.html'
})
export class RegistrationPresentationComponent implements OnInit {

  @Output() add: EventEmitter<User>;
  public registrationForm: FormGroup;
  public formSubmitted: boolean;
  public passwordFieldsVisibility = {
    password: 'close',
    confirmPassword: 'close',
  };

  constructor(private registrationPresenter: RegistrationPresenterService) {
    this.registrationForm = this.registrationPresenter.buildForm();
    this.formSubmitted = false;
    this.add = new EventEmitter();
  }

  ngOnInit(): void {
    this.registrationPresenter.userData$.subscribe((res) => {
      this.add.emit(res);
    });
  }

  public get getControls() {
    return this.registrationForm['controls'];
  }

  public onSignUp() {
    this.formSubmitted = !this.registrationForm.valid;
    if (!this.formSubmitted) {
      this.registrationPresenter.submitForm(this.registrationForm);
      this.registrationForm.reset();
    }
  }

  public setPasswordVisibility(passwordField: string, value: string) {
    let key = passwordField as keyof typeof this.passwordFieldsVisibility;
    this.passwordFieldsVisibility[key] = value;
  }

}
