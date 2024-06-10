import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Examen} from "../models/examen";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = `${environment.backendHost}/api/examens`;

  constructor(private http: HttpClient) { }

  getAllExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.apiUrl}/all`);
  }

  getExamenById(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${this.apiUrl}/${id}`);
  }

  createExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(`${this.apiUrl}/add`, examen);
  }

  updateExamen(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/update/${id}`, examen);
  }

  deleteExamen(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  assignSurveillants(id: number, assignRequest: { mode: string, surveillantsPerSalle: number }): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/assign-surveillants/${id}`, assignRequest);
  }
}
