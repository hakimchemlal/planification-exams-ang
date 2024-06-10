import {Component, OnInit} from '@angular/core';
import {ElementPedagogique} from "../models/elementPedagogique";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ElementPedagogiqueService} from "../services/element-pedagogique.service";
import {Router} from "@angular/router";
import {PersonnelService} from "../services/personnel.service";
import {Personnel} from "../models/personnel";

@Component({
  selector: 'app-element-pedagogique',
  templateUrl: './element-pedagogique.component.html',
  styleUrl: './element-pedagogique.component.scss'
})
export class ElementPedagogiqueComponent implements OnInit {

  elementForm!: FormGroup;
  elements!: ElementPedagogique[];
  coordonnateur!: string;
  personnels!: Personnel[];

  constructor(private formBuilder: FormBuilder, private elementService: ElementPedagogiqueService, private personnelService: PersonnelService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loadElements();
    this.loadPersonnels();
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
      type: ['', Validators.required]
    });
  }

  loadElements(): void {
    this.elementService.getAllElementPedagogiques()
      .subscribe(elements =>{ this.elements = elements;
        console.log("this.elements : ",this.elements)
      });
  }

  onSubmit(): void {
    if (this.elementForm.valid) {
      this.elementForm.value.coordonnateur = this.personnels.find(p => p.id == this.elementForm.value.coordonnateur);
      const newElement: ElementPedagogique = this.elementForm.value;
      console.log("newElement : ",newElement)
      this.elementService.createElementPedagogique(newElement)
        .subscribe(() => {
          this.loadElements();
          this.elementForm.reset();
        });
    }
  }

  deleteElement(id: number): void {
    if (confirm('Are you sure you want to delete this element?')) {
      this.elementService.deleteElementPedagogique(id)
        .subscribe(() => {
          this.loadElements();
        });
    }

  }

  modifierElementPedagogique(id: number) {
    if (id) {
      this.router.navigateByUrl(`/element-pedagogique-edit/${id}`)
    } else {
      console.error('Error: Element ID is undefined');
    }
  }
}
