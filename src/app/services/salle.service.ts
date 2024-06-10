import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Salle} from "../models/salle";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://localhost:8787/api/salles';

  constructor(private http: HttpClient) {}

  createSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }

  updateSalle(id: number, salle: Salle): Observable<Salle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Salle>(url, salle);
  }

  deleteSalle(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getSalleById(id: number): Observable<Salle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Salle>(url);
  }

  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl + '/all');
  }
}
