import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { JwtService } from 'src/app/services/config/jwt.service';
import { StompService } from 'src/app/services/config/stomp.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private userService:UserService,private router: Router,private stompService:StompService
    ,private jwtService:JwtService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
  }
  handleLogin() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        let email = this.jwtService.getCookieField(Constants.AUTH_COOKIE, 'email');
        this.stompService.connectToChat(email);
        this.router.navigate(['/home']);
      },
      (err) => {}
    );
  }

}
