import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html'
})
export class RegistrationContainerComponent implements OnInit {

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  public addUser(form: User) {
    this.registrationService.addUser(form).subscribe((res) => {
      console.log(res);
    });
  }

}
