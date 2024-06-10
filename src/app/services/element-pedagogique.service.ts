import { Injectable } from '@angular/core';
import {ElementPedagogique} from "../models/elementPedagogique";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Personnel} from "../models/personnel";

@Injectable({
  providedIn: 'root'
})
export class ElementPedagogiqueService {

  constructor(private http: HttpClient) { }

  createElementPedagogique(elementPedagogique: ElementPedagogique): Observable<ElementPedagogique> {
    return this.http.post<ElementPedagogique>(`${environment.backendHost}/api/elements-pedagogiques/add`, elementPedagogique);
  }

  updateElementPedagogique(elementPedagogique: ElementPedagogique): Observable<ElementPedagogique> {
    return this.http.put<ElementPedagogique>(`${environment.backendHost}/api/elements-pedagogiques/update/${elementPedagogique.id}`, elementPedagogique);
  }

  deleteElementPedagogique(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/api/elements-pedagogiques/delete/${id}`);
  }

  getElementPedagogiqueById(id: number): Observable<ElementPedagogique> {
    return this.http.get<ElementPedagogique>(`${environment.backendHost}/api/elements-pedagogiques/${id}`);
  }

  getAllElementPedagogiques(): Observable<ElementPedagogique[]> {
    return this.http.get<ElementPedagogique[]>(`${environment.backendHost}/api/elements-pedagogiques/all`);
  }
}
