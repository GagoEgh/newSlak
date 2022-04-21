import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [

  {
    path: 'main',
    component: MainComponent,
    children:[
      {
        path: 'channels/:id',
         component: MessagesComponent,
      },
      {
        path: 'members/:id',
         component: MessagesComponent,
      },
     
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
