import { Injectable } from '@angular/core';
import membersJson from '../../assets/members.json'
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getId() {
    return +localStorage.getItem('authToken')!;
  }

  getUser() {
    let id = this.getId()
    return membersJson.find((item) => item.id === +id)
  }

  getMember(userForm: any) {
    return membersJson.find((member) => {
      return member.firstName === userForm.firstName && member.lastName === userForm.lastName
    })
  }

}
