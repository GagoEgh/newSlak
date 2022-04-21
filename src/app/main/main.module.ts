import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BarComponent } from './bar/bar.component';
import { MessagesComponent } from './messages/messages.component';
import { MainRoutingModule } from './main-routing.module';
import { ChannelsComponent } from './bar/channels/channels.component';
import { MembersComponent } from './bar/members/members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberPipe } from './bar/member.pipe';






@NgModule({
  declarations: [
    MainComponent,
    BarComponent,
    MessagesComponent,
    ChannelsComponent,
    MembersComponent,
    MemberPipe,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
