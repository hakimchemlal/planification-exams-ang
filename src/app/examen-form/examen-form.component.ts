import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Examen} from "../models/examen";
import {ExamenService} from "../services/examen.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ElementPedagogique} from "../models/elementPedagogique";
import {ElementPedagogiqueService} from "../services/element-pedagogique.service";
import {Personnel} from "../models/personnel";
import {PersonnelService} from "../services/personnel.service";
import {SalleService} from "../services/salle.service";
import {Salle} from "../models/salle";

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrl: './examen-form.component.scss'
})
export class ExamenFormComponent implements OnInit {
  examenForm: FormGroup;
  elementsPedagogiques: ElementPedagogique[] = [];
  personnels!: Personnel[];
   salles!: Salle[];

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private router: Router,
    private examenService: ExamenService,
    private elementPedagogiqueService: ElementPedagogiqueService,
    private personnelService: PersonnelService,
    private salleService: SalleService
  ) {
    this.examenForm = this.fb.group({
      semestre: ['', Validators.required],
      session: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      dureePrevu: [90, Validators.required], // default value 90 minutes
      dureeReelle: [null],
      coordonnateurs: [[], Validators.required],
      lieux: [[], Validators.required],
      anneeUniversitaire: ['', Validators.required],
      epreuve: [''],
      pv: [''],
      rapportTextuel: ['Rien à signaler', Validators.required],
      elementPedagogique: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPersonnels();
    this.loadSalles();
    this.elementPedagogiqueService.getAllElementPedagogiques().subscribe(
      data => this.elementsPedagogiques = data,
      error => console.error(error)
    );

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.examenService.getExamenById(+id).subscribe(
        data => {
          this.examenForm.patchValue({
            semestre: data.semestre,
            session: data.session,
            type: data.type,
            date: new Date(data.date).toISOString().substring(0, 10),
            heureDebut: data.heureDebut,
            dureePrevu: data.dureePrevu,
            dureeReelle: data.dureeReelle,
            coordonnateurs: data.coordonnateurs.map(c => c.id),
            lieux: data.lieux.map(l => l.nom).join(', '),
            //surveillants: data.surveillants,
            //controleurs: data.controleurs,
            anneeUniversitaire: data.anneeUniversitaire,
            epreuve: data.epreuve,
            pv: data.pv,
            rapportTextuel: data.rapport,
            elementPedagogique: data.elementPedagogique?.id
          });
        },
        error => console.error(error)
      );
    }
  }

  loadPersonnels(): void {
    this.personnelService.getPersonnels().subscribe(
      (data: Personnel[]) => {
        this.personnels = data;
      },
      error => {
        console.error('Error loading personnels: ', error);
      }
    );
  }

  loadSalles(): void {
    this.salleService.getAllSalles().subscribe(
      (data: Salle[]) => {
        this.salles = data;
      },
      error => {
        console.error('Error loading salles: ', error);
      }
    );

  }

  onSubmit(): void {
    if (this.examenForm.valid) {
      this.examenForm.value.coordonnateurs = this.personnels.find(p => p.id == this.examenForm.value.coordonnateurs);
      console.log("is.examenForm.value.lieux : ",this.examenForm.value.lieux);
      this.examenForm.value.lieux = this.salles.filter(salle => this.examenForm.value.lieux.includes(salle.nom));
      console.log("is.examenForm.value.lieux : ",this.examenForm.value.lieux);

      this.examenForm.value.elementPedagogique = this.elementsPedagogiques.find(p => p.id == this.examenForm.value.elementPedagogique);
      this.examenForm.value.pv ="";
      this.examenForm.value.epreuve ="";
      if (this.examenForm.value.elementPedagogique.type.toLowerCase() === 'module'){
        this.examenForm.value.dureeReelle = "120";
      }
      if (this.examenForm.value.elementPedagogique.type.toLowerCase() === 'element'){
        this.examenForm.value.dureeReelle = "90";
      }
      const examen: Examen = this.examenForm.value;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.examenService.updateExamen(+id, examen).subscribe(
          () => this.router.navigate(['/examens']),
          error => console.error(error)
        );
      } else {
        this.examenService.createExamen(examen).subscribe(
          () => this.router.navigate(['/examens']),
          error => console.error(error)
        );
      }
    }
  }

  onFileChange(event: any, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.examenForm.patchValue({
        [field]: file
      });
    }
  }
}
