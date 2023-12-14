import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   baseUrl = 'http://localhost:3000/posts/'
  constructor(private httpSrv:HttpClient) { }

  postUserApi(data:any){
    return this.httpSrv.post<any>(this.baseUrl, data).pipe(map((response:any) =>{
      return response;
    }))
  }

  getUserApi(){
    return this.httpSrv.get(this.baseUrl).pipe(map((response:any) => {
      return response;
    }))
  }
  deleteUserApi(id:any){
    return this.httpSrv.delete<any>(this.baseUrl+id).pipe(map((response:any) =>{
      return response;
    }))
  }
  updateUserApi(id:any,body:any){
    return this.httpSrv.put<any>(this.baseUrl+id,body).pipe(map((response:any) =>{
      return response
    }))
  }

}
