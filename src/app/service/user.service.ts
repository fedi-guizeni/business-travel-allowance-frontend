import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomhttpResponse } from '../model/custom-http-response';


@Injectable({ providedIn: 'root'})
export class UserService {
  public host = environment.apiUrl;

  constructor(private http:HttpClient) { }

  public getUsers(): Observable<User[] >{
    return this.http.get<User[]>(`${this.host}/user/list`)
  }

  public addUser(formData:FormData): Observable<User>{
    return this.http.post<User>(`${this.host}/user/add`,formData);
  }

  public UpdateUsers(formData:FormData): Observable<User>{
    return this.http.post<User>(`${this.host}/user/update`,formData)
  }

  public resetPassword(email:string): Observable<CustomhttpResponse>{
    return this.http.get<CustomhttpResponse>(`${this.host}/user/resetpassword/${email}`)
  }

  public deleteUser(userID:number): Observable<CustomhttpResponse>{
    return this.http.delete<CustomhttpResponse>(`${this.host}/user/delete/${userID}`)
  }

  public addUsersToLocalCache(users:User[]):void{
   localStorage.setItem('users',JSON.stringify(users))
  }

  public getUsersFromLocalCache():User[]{
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users')) ;
    }
    return null;
   
   }

   public createUserFromDate(loggedInUsername:string , user :User):FormData{
    const formData = new FormData();
    formData.append('currentUsername',loggedInUsername);
    formData.append('firstname',user.firstName);
    formData.append('lastname', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
   }
}

