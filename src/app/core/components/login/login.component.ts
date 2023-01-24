import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public userData: Users[];
  public formSubmitted: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toasterService: ToastrService
  ) {
    this.loginForm = this.buildForm();
    this.formSubmitted = false;
  }

  ngOnInit(): void {
    this._authService.getUser().subscribe((data) => this.userData = data);
  }

  public buildForm() {
    return this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public get getControls() {
    return this.loginForm['controls'];
  }

  public onLogin() {
    this.formSubmitted = !this.loginForm.valid;
    if (!this.formSubmitted) {
      this._authService.validUser = this.userData.find((res: any) => this.loginForm.value.email === res.name && this.loginForm.value.password === res.pass);
      this._authService.validUser ? this._toasterService.success(``, 'Login Successfull') : this._toasterService.error(`Invalid Username or password`, 'UnRegistered User');
      console.log(this._authService.validUser);
    }
  }

}
