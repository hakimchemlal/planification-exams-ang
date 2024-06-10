import { Component } from '@angular/core';
import {ExamenService} from "../services/examen.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-examen-assign',
  templateUrl: './examen-assign.component.html',
  styleUrl: './examen-assign.component.scss'
})
export class ExamenAssignComponent {
  assignRequest = {
    mode: 'random',
    surveillantsPerSalle: 2
  };

  constructor(
    private examenService: ExamenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onAssign(): void {
    const examenId = this.route.snapshot.params['id'];
    this.examenService.assignSurveillants(examenId, this.assignRequest).subscribe(
      () => this.router.navigate(['/examens']),
      (error) => console.error('Erreur lors de l\'affectation des surveillants: ', error)
    );
  }
}
