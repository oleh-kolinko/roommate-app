import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'
import { GodService } from './god.service'
import {MdSnackBar} from '@angular/material';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user = {
    username: '',
    house: '',
    img: ''
  };
  constructor(
    private api: ApiService,
     private god: GodService,
     public snackBar: MdSnackBar,
     private navigator: Router
   ){}

  ngOnInit(){


    this.api.getUser()
        .then( apiResult => this.user = apiResult)
        .catch( err => console.log(err))

    $(document).ready(function(){
    $('.materialboxed').materialbox();
    });
  }
  isSidenavOpen: boolean = false;

  toggleIcon(){
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  logout(){
    this.api.logout()
        .then( apiResult => console.log(apiResult))
        .catch( err => console.log(err))
  }

  copyHouse(){
    this.copyToClipboard(this.user.house)
    this.toast('House token copied to clipboard')
  }

  copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
  }
  toast(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }
}
