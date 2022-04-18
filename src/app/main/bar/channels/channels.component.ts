import { Component, OnInit } from '@angular/core';
import channelsJson from '../../../../assets/channels.json';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels = channelsJson
  constructor() { }

  ngOnInit(): void {
    console.log(this.channels)
  }

}
