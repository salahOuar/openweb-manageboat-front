import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boat } from 'src/app/models/boat/boat.model';
import { environment } from 'src/environments/environment';


const boatsUrl = `${environment.apiUrl}/boats`;

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Boat[]> {
    return this.http.get<Boat[]>(boatsUrl);
  }

  get(id: any): Observable<Boat> {
    return this.http.get<Boat>(`${boatsUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(boatsUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${boatsUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${boatsUrl}/${id}`);
  }
}