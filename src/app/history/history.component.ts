import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  results = [];

  constructor(private http: Http) {}

  ngOnInit(): void {
    // Make the HTTP request:
    console.log('threads');
    this.http.get('/api/threads').subscribe(data => {
      // Read the result field from the JSON response.
      // this.results = data['results'];
      console.log(data);
      this.results = JSON.parse(data['_body']);
    });
  }

}
