import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  setPlace(place: {latitude: string, longitude: string, type: string}): Observable<any> {
    return this.http.post('http://localhost:8000/places/add', place);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8000/places/get_all');
  }
}
