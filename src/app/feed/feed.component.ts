import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { GodService } from '../god.service'

declare var $:any;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  votes = [];
  tasks = [];
  loans = [];
  roommates = [];
  errorMessage = ''
  voteSelect= [];
  user = {
    username: '',
    house: '',
    img: '',
    _id: '',
  };

  constructor(private api: ApiService, private god: GodService) { }

  ngOnInit() {
    this.api.getUser()
        .then( apiResult => {
          this.user = apiResult
          this.api.getRoommates(apiResult.house)
          .then( apiResult => {this.roommates = apiResult})
        })
        .catch( err => console.log(err))


    this.api.getVotes()
      .then( apiResult => {
          this.votes = apiResult
      })
      .catch( err => console.log(err))

    this.api.getTasks()
        .then( apiResult => {
            this.tasks = apiResult
        })
        .catch( err => console.log(err))

    this.api.getLoans()
        .then( apiResult => {
            this.loans = apiResult
            this.loans.forEach( loan=>{
              loan.payer = $.grep(this.roommates, function(e){ return e._id == loan.payerId; })[0];
              loan.receiver = $.grep(this.roommates, function(e){ return e._id == loan.receiverId; })[0];
              if(loan.receiver === this.user._id)
                loan.currentUserIsReceiver = true
                else
                loan.currentUserIsReceiver = false
            })
        })
        .catch( err => console.log(err))

    this.api.getRoommates(this.user.house)
        .then( apiResult => {
            this.roommates = apiResult
        })
        .catch( err => console.log(err))
    this.updateData();
    setInterval(()=>{
      this.updateData();
    },1000);

  }

  voteClick(id){

    let val;
    val = $(`input[name="${id}"]:checked`).val();

    this.api.postVoteOption(id, val, this.user._id)
      .then( apiResult => {
          this.updateData()
      })
      .catch( err => console.log(err))
  }
  deleteTask(id){
    this.api.deleteTask(id)
      .then( apiResult => {
          this.updateData()
      })
      .catch( err => console.log(err))
  }

  updateLoanPeople(){
    this.loans.forEach( loan=>{
      loan.payer = $.grep(this.roommates, function(e){ return e._id == loan.payerId; })[0];
      loan.receiver = $.grep(this.roommates, function(e){ return e._id == loan.receiverId; })[0];
      if(loan.receiverId == this.user._id)
        loan.currentUserIsReceiver = true
        else
        loan.currentUserIsReceiver = false
    })
    // console.log(this.loans)
  }

  updateData(){
    this.api.getVotes()
      .then( apiResult => {
        if(JSON.stringify(this.votes)!=JSON.stringify(apiResult))
          this.votes = apiResult
      })
      .catch( err => console.log(err))

    this.api.getTasks()
        .then( apiResult => {
          if(JSON.stringify(this.tasks)!=JSON.stringify(apiResult))
            this.tasks = apiResult
        })
        .catch( err => console.log(err))

    this.api.getLoans()
        .then( apiResult => {
          if(JSON.stringify(this.tasks)!=JSON.stringify(apiResult))
            this.loans = apiResult
            this.updateLoanPeople();
        })
        .catch( err => console.log(err))

    this.api.getRoommates(this.user.house)
        .then( apiResult => {
          if(JSON.stringify(this.roommates)!=JSON.stringify(apiResult))
            this.roommates = apiResult
        })
        .catch( err => console.log(err))
  }
}
