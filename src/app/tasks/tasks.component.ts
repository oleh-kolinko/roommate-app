import { Component, OnInit } from '@angular/core';

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
  }

}
