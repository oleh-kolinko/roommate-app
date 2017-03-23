import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  options = [{}];
  constructor() { }

  ngOnInit() {
  }

  addOption(){
    this.options.push({});
  }

  delete(i){
    this.options.splice(i,1);
  }

  create(){
    console.log('create')
  }
}
