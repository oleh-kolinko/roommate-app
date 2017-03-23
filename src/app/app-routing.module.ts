import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { VoteComponent } from './vote/vote.component';
import { TasksComponent } from './tasks/tasks.component';
import { MoneyComponent } from './money/money.component';

const routes: Routes = [
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'vote',
    component: VoteComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'money',
    component: MoneyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
