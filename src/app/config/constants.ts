import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
    public static readonly API_ENDPOINT: string = 'http://localhost:8080';
    public static readonly AUTH_COOKIE: string = "auth-cookie";
} 