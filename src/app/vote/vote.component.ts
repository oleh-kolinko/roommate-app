import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  options = [];
  constructor() { }

  ngOnInit() {
  }

  addOption(){
    this.options.push({});
    console.log(this.options)
    setTimeout(()=>{
      $(`#Option${this.options.length -1}`).parent().parent().slideDown(500);
    },100)

  }

  delete(i){
    $(`#Option${i}`).parent().parent().slideUp(500);
    const options = this.options
    setTimeout(()=>{
      this.options.splice(i,1);
    },500)
  }

  create(){
    console.log('create')
  }
}
