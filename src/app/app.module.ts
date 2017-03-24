import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { MaterializeModule } from 'angular2-materialize'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { VoteComponent } from './vote/vote.component';
import { TasksComponent } from './tasks/tasks.component';
import { MoneyComponent } from './money/money.component';
import { GodService } from './god.service'
import { ApiService } from './api.service'


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    VoteComponent,
    TasksComponent,
    MoneyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    MaterializeModule

  ],
  providers: [GodService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
