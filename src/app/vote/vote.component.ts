import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  //Cattegories for drop down menu
  categories = [
    {value: 'general', viewValue: 'General'},
    {value: 'chores', viewValue: 'Chores'},
    {value: 'fun', viewValue: 'Fun'}
  ];

  options = [];//options for displaying on DOM

  //data about new VOTE, connected to inputs
  voteInfo = {
    name: '',
    category: 'general',
    options: [],
  };

  constructor(
    private api: ApiService,
    public snackBar: MdSnackBar,
    private navigator: Router
  ) { }

  ngOnInit() {

  }

  //Clicked on 'ADD NEW OPTION' button
  addOption(){
    this.options.push({});
    this.voteInfo.options.push({});

    //Animation
    setTimeout(()=>{
      $(`#Option${this.options.length -1}`).parent().parent().slideDown(500);
    },100)

  }

  //Delete option
  delete(i){
    //Animation:
    $(`#Option${i}`).parent().parent().slideUp(500);
    const options = this.options

    //Delete from array after animation is done
    setTimeout(()=>{
      this.options.splice(i,1);
      this.voteInfo.options.splice(i,1);
    },500)
  }

  //Clicked on creating new VOTE -> send data to API
  create(){
    this.api.postVotes(this.voteInfo)
      .then( apiResult => {
        if(apiResult.errors)
          {this.toast(apiResult.errors.name.message)}
        else
          {
            this.toast('Vote created')
            this.navigator.navigate(['feed'])
          }
      })
      .catch( err => console.log(err))
  }

  //for pop up messages:
  toast(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }
}
