import {Groupe} from "./groupe";

export interface  Personnel {
  id: number;
  nom: string;
  prenom: string;
  type?: string;
  groupes?: Groupe[];
}
