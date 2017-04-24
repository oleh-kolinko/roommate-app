import { Component, OnInit } from '@angular/core';
import { GodService } from '../god.service'
import { ApiService }from '../api.service'
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {
  loanInfo = { //object to send to backend
    payers: [],
  };
  roommates = []; //all roommates

  constructor(
    private god: GodService,
    private api: ApiService,
    public snackBar: MdSnackBar,
    private navigator: Router
    ) { }

  ngOnInit() {
    //geting user
    this.api.getUser()
        .then( apiResult => {
          this.api.getRoommates(apiResult.house)
          .then( apiResult => {
            this.roommates = apiResult
            this.roommates.forEach(roommate=>{
              roommate.toggleValue = true;
            })
          })
        })
        .catch( err => console.log(err))

  }
  //for pop up messages
  toast(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

  //click on create button
  create(){
    //console.log(this.loanInfo)
    this.loanInfo.payers = [];//init of payers array
    this.roommates.forEach(roommate =>{
      if (roommate.toggleValue)
        this.loanInfo.payers.push(roommate)
    })
    this.api.postLoans(this.loanInfo)
        .then( apiResult => {
          if(apiResult.errors)
            {this.toast(apiResult.errors.name.message)}
          else
            {
              this.toast('Expense created')
              this.navigator.navigate(['feed'])
            }
        })
        .catch( err => this.toast(err))
  }
}
