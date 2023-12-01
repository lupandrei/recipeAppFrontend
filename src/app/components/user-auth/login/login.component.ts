import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDto } from 'src/app/entity/user/user-login-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private userService:UserService,private router: Router){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
  }
  handleLogin(){
    console.log(this.loginForm.value)
    this.userService.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/home']),
      err => {}
  )
}

}
