import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import {MdSnackBar} from '@angular/material';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  //categories for drop down menu
  categories = [
    {value: 'general', viewValue: 'General'},
    {value: 'chores', viewValue: 'Chores'},
    {value: 'fun', viewValue: 'Fun'}
  ];

  //info about new TASK, connected to inputs
  taskInfo = {
    name: '',
    category: 'general',
    repeat: false,
    date: null
  };

  constructor(
    private api: ApiService,
    public snackBar: MdSnackBar,
    private navigator: Router
  ) { }

  //for pop up messages
  toast(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

  ngOnInit() {
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  }

  //Clicked on create button:
  create(){
    //get the date from date picker
    let year: string = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
    let day: string = $('.datepicker').pickadate('picker').get('highlight', 'dd');
    let month: string = $('.datepicker').pickadate('picker').get('highlight', 'mm');

    const date = new Date(+year, +month-1, +day); //Creating new DATE based on inputs
    this.taskInfo.date = date;

    //send to API
    this.api.postTasks(this.taskInfo)
        .then( apiResult => {
          if(apiResult.errors)
            {this.toast(apiResult.errors.name.message)}
          else
            {
              this.toast('Task created')
              this.navigator.navigate(['feed'])
            }
        })
        .catch( err => this.toast(err))
  }
}
