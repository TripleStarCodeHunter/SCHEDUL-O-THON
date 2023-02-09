import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceTsService {
  rootURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  async updateUserData({
    uid,
    email,
    displayName,
    photoURL,
    emailVerified
  }: IUser,
    registrationName?: string
  ) {
    const data: IUser = {
      uid,
      email,
      displayName: (registrationName) ? registrationName : displayName,
      photoURL,
      emailVerified: emailVerified
    };
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return await this.http.post<IUser>(this.rootURL + '/user', { user: body }, { headers }).toPromise().then((result) => {
      return result;
    }).catch(error => { throw error });
  }
}