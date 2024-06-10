import {Personnel} from "./personnel";
import {Salle} from "./salle";
import {ElementPedagogique} from "./elementPedagogique";

export interface Examen {
  id?: number;
  semestre: string;
  session: string;
  type: string;
  date: string;
  heureDebut: string;
  dureePrevu: number;
  dureeReelle?: number;
  coordonnateurs: Personnel[];
  lieux: Salle[];
  surveillants?: Personnel[];
  controleurs?: Personnel[];
  anneeUniversitaire: string;
  epreuve?: string;
  pv?: string;
  rapport: string;
  elementPedagogique?: ElementPedagogique; // Reference to the pedagogical element
}
