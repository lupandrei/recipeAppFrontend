import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  href: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }
}
