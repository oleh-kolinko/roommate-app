import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isSidenavOpen: boolean = false;

  toggleIcon(){
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
