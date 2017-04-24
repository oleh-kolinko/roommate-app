import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GodService } from './god.service'

@Injectable()
export class ApiService {

  // BASE_URL: string = 'http://localhost:3000'
  BASE_URL: string = ''

  constructor(private http: Http, private god: GodService,) { }

  //VOTES
  getVotes(){//Get all votes
    return this.http.get(`${this.BASE_URL}/api/votes`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postVotes(obj){//create new Vote
    return this.http.post(`${this.BASE_URL}/api/votes`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postVoteOption(id, i, userId){//Make a vote

    const obj={//make obj from params
      id: id,
      i: i,
      userId: userId
    }


    return this.http.put(`${this.BASE_URL}/api/votes`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }

  //ROOMMATES
  getRoommates(houseid){//get all roommates
    const obj={
      id:houseid
    }
    return this.http.patch(`${this.BASE_URL}/api/roommates`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }

  //TASKS
  getTasks(){//get all tasks
    return this.http.get(`${this.BASE_URL}/api/tasks`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postTasks(obj){//create new task
    return this.http.post(`${this.BASE_URL}/api/tasks`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  deleteTask(id){//Delete individual task
    const obj={
      id:id
    }
    return this.http.patch(`${this.BASE_URL}/api/tasks`,obj)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }

  //LOANS
  getLoans(){//get all loans
    return this.http.get(`${this.BASE_URL}/api/loans`)
    .toPromise()
    .then( apiResponse => apiResponse.json() )
  }
  postLoans(obj){//Create new Loan
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
