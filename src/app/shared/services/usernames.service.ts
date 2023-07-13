import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Username } from '../interfaces/username.interface';

@Injectable({
  providedIn: 'root'
})
export class UsernamesService {
  public url:string = environment.url + '/usernames';

  constructor(private http:HttpClient){  }


  public getUsernames(){
    return this.http.get<Username[]>(`${this.url}`)
  }

  public postUsername(username:string){
    return this.http.post<Username>(`${this.url}`, username)
  }

}
