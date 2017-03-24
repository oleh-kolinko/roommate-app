import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  categories = [
    {value: 'general', viewValue: 'General'},
    {value: 'chores', viewValue: 'Chores'},
    {value: 'fun', viewValue: 'Fun'}
  ];
  constructor() { }

  ngOnInit() {
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  }

}
