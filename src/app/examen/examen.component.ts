import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Examen} from "../models/examen";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamenService} from "../services/examen.service";
import {Personnel} from "../models/personnel";

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.scss'
})
export class ExamenComponent implements OnInit {
  examens: Examen[] = [];

  constructor(
    private examenService: ExamenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExamens();
  }

  loadExamens(): void {
    this.examenService.getAllExamens().subscribe(
      (data) => {
        this.examens = data;
        console.log("Examens: ", this.examens)
      },
      (error) => console.error('Erreur lors du chargement des examens: ', error)
    );
  }

  editExamen(id: number | undefined): void {
    this.router.navigate([`/examens/edit/${id}`]);
  }

  deleteExamen(id: number | undefined): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet examen?')) {
      this.examenService.deleteExamen(id).subscribe(
        () => this.loadExamens(),
        (error) => console.error('Erreur lors de la suppression de l\'examen: ', error)
      );
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/examens/add']);
  }

  navigateToAssign(id: number | undefined): void {
    this.router.navigate(['/examens/assign', id]);
  }

  getMembreNomPrenom(membres: Personnel[] | undefined) {
    return membres?.map(membre => `${membre.nom} ${membre.prenom}`).join(', ');
  }
}
