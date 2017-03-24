import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  BASE_URL: string = 'http://localhost:3000'

  constructor(private http: Http) { }

  getVotes(){
    return this.http.get(`${this.BASE_URL}/api/votes`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  getTasks(){
    return this.http.get(`${this.BASE_URL}/api/tasks`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
}
