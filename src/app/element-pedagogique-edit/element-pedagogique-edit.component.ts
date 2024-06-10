import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ElementPedagogique} from "../models/elementPedagogique";
import {ElementPedagogiqueService} from "../services/element-pedagogique.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Personnel} from "../models/personnel";
import {PersonnelService} from "../services/personnel.service";

@Component({
  selector: 'app-element-pedagogique-edit',
  templateUrl: './element-pedagogique-edit.component.html',
  styleUrl: './element-pedagogique-edit.component.scss'
})
export class ElementPedagogiqueEditComponent implements OnInit {

  elementForm!: FormGroup;
  element!: ElementPedagogique;
  personnels!: Personnel[];
  coordonnateur!: Personnel | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private elementService: ElementPedagogiqueService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private personnelService: PersonnelService

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadPersonnels();

    const id = this.activatedRoute.snapshot.params['idElement'];
    this.elementService.getElementPedagogiqueById(id).subscribe(
      (data: ElementPedagogique) => {
        this.element = data;
        this.updateForm();
      },
      error => {
        console.error('Error loading element: ', error);
      }
    );
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

  initForm(): void {
    this.elementForm = this.formBuilder.group({
      titre: ['', Validators.required],
      niveau: ['', Validators.required],
      coordonnateur: ['', Validators.required],
      //coordonnateur: [{value: '', disabled: true}, Validators.required],
      type: ['', Validators.required]
    });
  }

  updateForm(): void {
    let coordonnateur = this.element.coordonnateur?.nom+ ' - ' + this.element.coordonnateur?.prenom;
    this.personnelService.getPersonnels().subscribe(
      (data: Personnel[]) => {
        this.personnels = data;
        this.coordonnateur = this.personnels.find(p => p.id == this.element?.coordonnateur?.id);
        console.log("test : ",coordonnateur)
        this.elementForm.patchValue({
          titre: this.element.titre,
          niveau: this.element.niveau,
          coordonnateur: this.coordonnateur?.id,
          type: this.element.type
        });
      },
      error => {
        console.error('Error loading personnels: ', error);
      }
    );

    //coordonnateur=this.element.coordonnateur
  }

  onSubmit(): void {
    if (this.elementForm.valid) {
      const formData = this.elementForm.value as ElementPedagogique;
      formData.id = this.element.id;
      formData.coordonnateur =  this.personnels.find(p => p.id == this.elementForm.value.coordonnateur);
      console.log("this.elementForm.value.coordonnateur : ",this.elementForm.value.coordonnateur)
      this.elementService.updateElementPedagogique(formData).subscribe(
        (data: ElementPedagogique) => {
          console.log('Element updated successfully: ', data);
          this.elementForm.reset();
          this.router.navigateByUrl("/element-pedagogique")
        },
        error => {
          console.error('Error updating element: ', error);
        }
      );
    }
  }
}
