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
  errorMessage = ''
  voteSelect= [];
  user = {
    username: '',
    house: '',
    img: '',
    _id: '',
  };
  constructor(private api: ApiService, private god: ApiService) { }

  ngOnInit() {
    this.api.getUser()
        .then( apiResult => this.user = apiResult)
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
  }
}
