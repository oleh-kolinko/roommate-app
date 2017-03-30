import { Component, OnInit } from '@angular/core';
import { GodService } from '../god.service'
import { ApiService }from '../api.service'
@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {
  loanInfo = {};
  roommates = [];
  constructor(
    private god: GodService,
    private api: ApiService
    ) { }

  ngOnInit() {

    this.api.getUser()
        .then( apiResult => {
          this.api.getRoommates(apiResult.house)
          .then( apiResult => {this.roommates = apiResult})
        })
        .catch( err => console.log(err))

  }

  create(){
    console.log('create')
  }
}
