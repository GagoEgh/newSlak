import { Component, OnInit } from '@angular/core';
import membersJson from '../../../../assets/members.json'
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = membersJson;
  id = localStorage.getItem('authToken')!;
  constructor() { }

  ngOnInit(): void {
  }

}
