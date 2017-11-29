import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  id: number;
  results = [];
  replies = [];

  newReply = {
    user: '',
    userId: '',
    reply: '',
    parentId: 0,
    id: null
  };

  constructor(private route: ActivatedRoute, private http: Http) {}

  ngOnInit() {
    this.newReply.userId = localStorage.getItem('loggedUserId');
    this.newReply.user = localStorage.getItem('loggedUser');
    this.getThread();
    this.loggedIn();
  }

  getThread() {
    this.route.params.subscribe(params => {
      this.id = params['number?'];
      this.newReply.id = params['number?'];
      this.http.get('/api/thread/' + this.id).subscribe(data => {
        this.results = JSON.parse(data['_body']);
          this.http.get('api/reply/' + this.id).subscribe(reply => {
            this.replies = JSON.parse(reply['_body']);
          });
      });
    });
  }

  submitReply() {
    this.http.post('/api/newreply', this.newReply).subscribe( data => {
      this.getThread();
    });
  }

  loggedIn() {
    if (this.newReply.userId !== ''
        && this.newReply.userId !== 'null'
        && this.newReply.userId != null
        && this.newReply.userId !== undefined) {
      return true;
    }
  }

}
