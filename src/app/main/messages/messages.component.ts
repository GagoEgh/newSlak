import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import channelsJson from '../../../assets/channels.json';
import membersJson from '../../../assets/members.json';
import { Channel, ChannelUserModel } from './channel.model';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Message } from 'src/app/auth/messages.model';
import roomJson from '../../../assets/room.json'
import { MemeberModel } from 'src/app/auth/member.model';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [DatePipe]
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;

  id = this.authService.getId();
  isChannels = false;
  channels: Channel[] = [];
  channel: Channel | undefined = {} as Channel;

  user: any

  myMsg: Message[] = [];
  responseId: number = 0;
  member: any;

  rooms: any[] = roomJson;
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
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.myScrollContainer)
      try { 
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
  }
  getMyMessages(rout: string) {
    if (rout === 'members') {

      this.isChannels = false;
      if (localStorage.getItem('chat')) {
        try {
          this.rooms = JSON.parse(localStorage.getItem(`chat`)!);
          this.member = membersJson.find((member) => member.id === this.responseId);
          const chat = this.rooms.filter((item) => item.fromId === this.user.id || item.goTo === this.user.id);

          if (this.user.id !== this.responseId) {
            this.myMsg = chat.filter((item) => item.fromId === this.responseId || item.goTo === this.responseId)
            this.myMsg = this.myMsg.map((item) => {
              const member = membersJson.find((member: MemeberModel) => member.id === item.fromId);
              return {
                ...item,
                user: member
              }
            });
            this.scrollToBottom();
          }


        } catch {

        }
        localStorage.setItem('chat', JSON.stringify(this.rooms)!)
      }
    }
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

  showText() {
    this.activatedRoute.params
      .subscribe({
        next: (response) => {
          this.responseId = +response["id"];
          const rout = this.activatedRoute.routeConfig?.path?.split('/')[0];
          this.getLocalChannel(+response["id"], rout!);
          this.getMyMessages(rout!)
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

  goMessage(date: Date) {
    if (!this.isChannels && this.message.valid) {

      let userMessage: Message = {
        goTo: this.responseId,
        fromId: this.user.id,
        date: this.datePipe.transform(date, 'EE, MMMM d')!,
        time: this.datePipe.transform(date, 'h:mm')!,
        messages: this.message.value
      }
      const member = membersJson.find((member: MemeberModel) => member.id === userMessage.fromId);
      userMessage = Object.assign({}, userMessage, { user: member })
      this.message.reset();
      this.myMsg.push(userMessage);
      this.rooms.push(userMessage);
      this.scrollToBottom();
      localStorage.setItem(`chat`, JSON.stringify(this.rooms))

    }

  }
  sendMessage() {
    const date = new Date();
    this.setLocalChannel(date);
    this.goMessage(date);
  }
}



