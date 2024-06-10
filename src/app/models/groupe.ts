import {Personnel} from "./personnel";

export interface Groupe {
  id: number;
  nom: string;
  membres?: Personnel[];
}
