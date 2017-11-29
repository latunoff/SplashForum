import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId = null;
  user = null;

  existingUser = {
    id: 0,
    email: '',
    password: ''
  };

  newUser = {
    id: 0,
    email: '',
    password1: '',
    password2: ''
  };

  invalidUser = {
    toggle: false,
    warning: 'Username and/or password is incorrect.'
  };

  invalidName = {
    toggle: false,
    warning: 'Username already exists.'
  };

  invalidPassword = {
    toggle: false,
    warning: 'Passwords do not match.'
  };

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('loggedUser');
    const storedUserId = localStorage.getItem('loggedUserId');
    if (storedUser != null) {
      this.userId = storedUserId;
      this.user = storedUser;
    }
  }

  loginExisting() {
    this.clearWarnings();
    // Make the HTTP request:
    this.http.post('/api/existinguser', this.existingUser).subscribe(data => {
      // Read the result field from the JSON response.
      let result = JSON.parse(data['_body']);
      // this.existingUser.id = data[0].id;
      console.log(data);
      if (result > 0) {
        this.existingUser.id = result;
        console.log(this.existingUser);
        this.loggedIn(this.existingUser);
      } else {
        this.invalidUser.toggle = true;
      }
    });
  }

  loginNew() {
    this.clearWarnings();
    if (this.newUser.password1 !== this.newUser.password2) {
      this.invalidPassword.toggle = true;
    } else {
      // Make the HTTP request:
      this.http.post('/api/newuser', this.newUser).subscribe(data => {
      // Read the result field from the JSON response.
      let result = JSON.parse(data['_body']);
      if (result === 'success') {
        this.loggedIn(this.newUser);
      } else {
        this.invalidName.toggle = true;
      }
      });
    }
  }

  loggedIn(user) {
    localStorage.setItem('loggedUserId', user.id);
    localStorage.setItem('loggedUser', user.email);

    this.existingUser = {
      id: 0,
      email: '',
      password: '',
    };

    this.newUser = {
      id: 0,
      email: '',
      password1: '',
      password2: ''
    };
    window.location.replace('/');
  }

  loginGuest() {
    this.loggedIn({ id: 0, 'email': 'Guest' });
  }

  clearWarnings() {
    this.invalidUser.toggle = false;
    this.invalidName.toggle = false;
    this.invalidPassword.toggle = false;
  }

}
