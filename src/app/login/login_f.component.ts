import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  user = null;

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      'email': [' ', Validators.required ],
      'password': [' ', Validators.required ]
    });
  }

  submitForm() {
    const credentials = this.loginForm.value;
    console.log(credentials);
  }
}
