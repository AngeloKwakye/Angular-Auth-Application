import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/user';

  getAll() {
    return this.http.get(this.apiurl);
  }

  getbyid(id: any) {
    return this.http.get(`${this.apiurl}/${id}`);
  }

  registerSave(data: any) {
    return this.http.post(this.apiurl, data);
  }

  updateUser(data: any, id: any) {
    return this.http.put(`${this.apiurl}/${id}`, data);
  }
}
