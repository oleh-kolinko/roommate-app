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

  votes = [];  //All votes  from API
  tasks = [];  //All tasks from API
  loadedLoans = [];//Loans from API serialized
  loans = []; //All loans deserialized
  roommates = []; //All tasks from API
  errorMessage = '' //To show errors
  voteSelect= []; //Array for choosing vote option
  user = { //Current user info
    username: '',
    house: '',
    img: '',
    _id: '',
  };

  constructor(private api: ApiService, private god: GodService) { }

  //do initial API requests and start running update func every second
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
            this.loadedLoans = apiResult
            this.updateLoanPeople()
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

  //Clicked on vote oprion -> send request to API
  voteClick(id){

    let val;
    val = $(`input[name="${id}"]:checked`).val();

    this.api.postVoteOption(id, val, this.user._id)
      .then( apiResult => {
          this.updateData()
      })
      .catch( err => console.log(err))
  }

  //Clicked on CheckMark on task to delete
  deleteTask(id){
    this.api.deleteTask(id)
      .then( apiResult => {
          this.updateData()
      })
      .catch( err => console.log(err))
  }

  //Deserialize roommates : Assign roommates to loans ( find by Id )
  updateLoanPeople(){
     this.loans = this.loadedLoans.slice()
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

  //Make API requests to get most recent data
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
          if(JSON.stringify(this.loadedLoans)!=JSON.stringify(apiResult))
            this.loadedLoans = apiResult
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
