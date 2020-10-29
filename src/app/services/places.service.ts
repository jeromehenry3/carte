import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  setPlace(place: {latitude: string, longitude: string, type: string}): Observable<any> {
    return this.http.post(`${environment.backendUrl}/places/add`, place);
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/places/get_all`);
  }
}
