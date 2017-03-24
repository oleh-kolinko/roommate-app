import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { VoteComponent } from './vote/vote.component';
import { TasksComponent } from './tasks/tasks.component';
import { MoneyComponent } from './money/money.component';
import { GodService } from './god.service';
import { LoginRegisterComponent } from './login-register/login-register.component'


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    VoteComponent,
    TasksComponent,
    MoneyComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,

  ],
  providers: [GodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
