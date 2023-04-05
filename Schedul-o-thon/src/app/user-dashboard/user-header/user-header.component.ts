import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  user = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    const options = {
      withCredentials: true,
    };

    this.http
      .get('http://localhost:3000/api/login', options)
      .subscribe((response) => {
        console.log(response);
        const myObject: { [key: string]: any } = response;
        const auth = myObject['username'];
        this.user = auth;
      });
  }
}
