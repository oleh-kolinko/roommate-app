import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  votes = [];
  tasks = [];
  errorMessage = ''

  constructor(private api: ApiService) { }

  ngOnInit() {
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
