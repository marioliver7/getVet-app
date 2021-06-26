import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Data } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    Data.setToken(email, password);

    return this.http.get(`${environment.endpoint}/users/me`);
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post(`${environment.endpoint}/users`, {
      name,
      email,
      password,
      password_confirmation
    });
  }

  sos(data: any) {
    return this.http.post(`${environment.endpoint}/sos`, data);
  }

  addVet(place_id: string) {
    return this.http.post(`${environment.endpoint}/vets`, { place_id });
  }

  getVets() {
    return this.http.get(`${environment.endpoint}/vets/favorites`);
  }

  places(latitude, longitude) {
    return this.http.get(`${environment.endpoint}/vets?latitude=${latitude}&longitude=${longitude}&meters=1000`);
  }

  getPets(): Observable<any> {
    return this.http.get(`${environment.endpoint}/pets`);
  }

  getUser(): Observable<any> {
    return this.http.get(`${environment.endpoint}/users/me`);
  }

  addPet(data: any): Observable<any> {
    return this.http.post(`${environment.endpoint}/pets`, data);
  }

  private log(message: string) {
    console.log(message);
  }
}