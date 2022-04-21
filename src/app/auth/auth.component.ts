import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import members from '../../assets/members.json'
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isUser = true;
  form: FormGroup = this.fromBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  })

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  checkUser() {
    const userForm = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value
    }

    const user = this.authService.getMember(userForm);

    if (this.form.valid && user) {

      localStorage.setItem('authToken', `${user.id}`);
      this.router.navigate(['/main']);
    }

    if (this.form.valid) {
      this.isUser = false;
    }
  }


}
