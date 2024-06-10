import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Groupe} from "../models/groupe";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http: HttpClient) { }

  createGroupe(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(`${environment.backendHost}/api/groupes/add`, groupe);
  }

  updateGroupe(id: number, groupe: Groupe): Observable<Groupe> {
    return this.http.put<Groupe>(`${environment.backendHost}/api/groupes/update/${id}`, groupe);
  }

  deleteGroupe(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/api/groupes/delete/${id}`);
  }

  getGroupeById(id: number): Observable<Groupe> {
    return this.http.get<Groupe>(`${environment.backendHost}/api/groupes/${id}`);
  }

  getAllGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${environment.backendHost}/api/groupes/all`);
  }

  addMembersToGroupe(id: number, memberIds: number[]): Observable<Groupe> {
    return this.http.put<Groupe>(`${environment.backendHost}/api/groupes/add-members/${id}`, memberIds);
  }
}
