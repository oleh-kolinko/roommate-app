import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GodService } from './god.service'

@Injectable()
export class ApiService {

  BASE_URL: string = 'http://localhost:3000'
  // BASE_URL: string = ''

  constructor(private http: Http, private god: GodService,) { }

  //VOTES
  getVotes(){
    return this.http.get(`${this.BASE_URL}/api/votes`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postVotes(obj){

    return this.http.post(`${this.BASE_URL}/api/votes`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postVoteOption(id, i, userId){

    const obj={
      id: id,
      i: i,
      userId: userId
    }
    console.log(obj)

    return this.http.put(`${this.BASE_URL}/api/votes`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }

  //ROOMMATES
  getRoommates(houseid){
    const obj={
      id:houseid
    }
    return this.http.patch(`${this.BASE_URL}/api/roommates`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }

  //TASKS
  getTasks(){
    return this.http.get(`${this.BASE_URL}/api/tasks`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postTasks(obj){
    return this.http.post(`${this.BASE_URL}/api/tasks`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  deleteTask(id){
    const obj={
      id:id
    }
    return this.http.patch(`${this.BASE_URL}/api/tasks`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }

  //LOANS
  getLoans(){
    return this.http.get(`${this.BASE_URL}/api/loans`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postLoans(obj){
    return this.http.post(`${this.BASE_URL}/api/loans`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }


  //USER
  getUser(){
    const options = { withCredentials: true };
    return this.http.get(`${this.BASE_URL}/loggedin`, options)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  logout(){
    return this.http.get(`${this.BASE_URL}/logout`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
}
