import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personnel} from "../models/personnel";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = `${environment.backendHost}/api/personnel`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les personnels
  public getPersonnels(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un personnel par ID
  public getPersonnelById(id: number): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau personnel
  public addPersonnel(personnel: Personnel): Observable<Personnel> {
    return this.http.post<Personnel>(`${this.apiUrl}/add`, personnel);
  }

  // Mettre à jour un personnel existant
  public updatePersonnel(personnel: Personnel): Observable<Personnel> {
    return this.http.put<Personnel>(`${this.apiUrl}/update/${personnel.id}`, personnel);
  }

  // Supprimer un personnel par ID
  public deletePersonnel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
