import {Examen} from "./examen";

export interface Salle {
  id?: number;
  nom: string;
  capacite: number;
  examens?: Examen[];
}
