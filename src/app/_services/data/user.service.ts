import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  checkExitUserByUsername(username: any){
    return this.http.get('http://localhost:8080/api/users/check/exist-username?username=' + username);
  }

  checkExitUserByEmail(email: any){
    return this.http.get('http://localhost:8080/api/users/check/exist-email?email=' + email);
  }


}
