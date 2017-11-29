import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  thread = {
    userId: '',
    title: '',
    message: '',
  };

  constructor(private router: Router, private http: Http) {}

  ngOnInit() {
    this.thread.userId = localStorage.getItem('loggedUserId');
  }

  submitThread() {
    console.log(this.thread);
    // this.http.post('/api/newthread', this.thread).subscribe( data => {
    //   const result = JSON.parse(data['_body']);
    //   this.router.navigate(['/']);
    // });
  }

}
