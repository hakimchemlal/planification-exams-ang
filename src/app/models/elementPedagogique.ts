import {Personnel} from "./personnel";

export interface ElementPedagogique {
  id: number;
  titre: string;
  niveau: string;
  coordonnateur?: Personnel;
  type: string;
}
