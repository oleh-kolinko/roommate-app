import { Injectable } from '@angular/core';

@Injectable()
export class GodService {

  user = {} ;

  constructor() {}

  setUser(obj){
    this.user = obj
    console.log(this.user)
  }
  getUser(){
    return this.user;
  }
}
