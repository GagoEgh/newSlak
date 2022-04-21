import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import membersJson from '../../../assets/members.json';
@Pipe({
  name: 'member'
})
export class MemberPipe implements PipeTransform {
  constructor(private authService: AuthService) { }

  id = this.authService.getId();

  transform(value: unknown, id: number): unknown {

    if(this.id === id ){
     return `${value} @Me`
    }

    return value

  }

}
