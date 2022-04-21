import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import channelsJson from '../../../assets/channels.json';
import membersJson from '../../../assets/members.json';
import { Channel, ChannelUserModel } from './channel.model';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Message } from 'src/app/auth/messages.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [DatePipe]
})
export class MessagesComponent implements OnInit {
  id = this.authService.getId();
  isChannels = false;
  channels: Channel[] = [];
  channel: Channel | undefined = {} as Channel;

  user: any  //User | undefined = {} as User;

  myMsg: Message[] = [];
  responseId: number = 0;
  member: any;

  message = new FormControl('', [Validators.required]);
  constructor(
    private activatedRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private authService: AuthService
  ) {
    this.channels = channelsJson;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.showText();
  }

  private getLocalChannel(id: number, rout: string) {
    if (rout === 'channels') {
      this.isChannels = true;
      if (localStorage.getItem(`channel-${id}`)) {
        try {
          this.channel = JSON.parse(localStorage.getItem(`channel-${id}`)!);
        } catch { }
      } else {
        this.channel = this.channels.find((item: Channel) => item.id === id);
      }
    }
  }

  private getLocalMember(rout: string, id: number) {
    if (rout === 'members') {
      this.isChannels = false;
      if (localStorage.getItem(`chat-${id}`)) {
        try {
          this.member = membersJson.find((item) => item.id === id);
          this.user = JSON.parse(localStorage.getItem(`chat-${id}`)!);
          this.myMsg = this.user?.messages.filter((item: any) => item.goTo === id);
   
        } catch { }

      } else {
        this.myMsg = this.user?.messages.filter((item: any) => item.goTo === id);
        this.member = membersJson.find((item) => item.id === id);
      }
    }
  }

  showText() {
    this.activatedRoute.params
      .subscribe({
        next: (response) => {
          this.responseId = +response["id"];
          const rout = this.activatedRoute.routeConfig?.path?.split('/')[0];
          this.getLocalChannel(+response["id"], rout!);
          this.getLocalMember(rout!, +response["id"]);
        }
      })
  }

  private setLocalChannel(date: Date): void {
    if (this.isChannels && this.message.valid) {
      const channelUser: ChannelUserModel = {

        id: +this.id,
        fullName: `${this.user?.firstName} ${this.user?.lastName}`,
        date: this.datePipe.transform(date, 'EE, MMMM d'),
        img: "../../assets/imges/person.png",
        time: this.datePipe.transform(date, 'h:mm'),
        message: this.message.value
      }
      this.message.reset();
      this.channel?.users.push(channelUser);

      if (this.channel) {
        localStorage.setItem(`channel-${this.channel.id}`, JSON.stringify(this.channel));
      }
    }
  }

  private setLocalMessage(date: Date): void {
    if (!this.isChannels && this.message.valid) {
      const userMessage: Message = {
        goTo: this.responseId,
        date: this.datePipe.transform(date, 'EE, MMMM d')!,
        time: this.datePipe.transform(date, 'h:mm')!,
        messages: this.message.value
      }
      this.user?.messages.push(userMessage);
      this.myMsg.push(userMessage);
      this.message.reset();
      if (this.user) {
        localStorage.setItem(`chat-${this.responseId}`, JSON.stringify(this.user))
      }
    }
  }
  sendMessage() {
    const date = new Date();
    this.setLocalChannel(date);
    this.setLocalMessage(date);
  }
}



