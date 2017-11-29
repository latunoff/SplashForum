import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {
    userId: '',
    name: '',
    email: '',
  };
  http_result = '';

  constructor(private router: Router, private http: Http) {}

  ngOnInit() {
    this.user.userId = localStorage.getItem('loggedUserId');
    this.http.get('/api/userget/' + this.user.userId).subscribe( data => {
      const result = JSON.parse(data['_body']);
      // console.log(result);
      this.user.name = result[0].name;
      this.user.email = result[0].email;
      // this.router.navigate(['/user']);
    });
  }

  submitSettings() {
    this.http.post('/api/user_save', this.user).subscribe( data => {
      this.http_result = JSON.parse(data['_body']);
    });
  }

}
