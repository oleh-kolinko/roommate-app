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
      .then( apiResult => this.votes = apiResult)
      .catch( err => this.errorMessage = 'There was an error. Try again later')

    this.api.getTasks()
        .then( apiResult => this.tasks = apiResult)
        .catch( err => this.errorMessage = 'There was an error. Try again later')
  }

}
