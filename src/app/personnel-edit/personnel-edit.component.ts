import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Personnel} from "../models/personnel";
import {PersonnelService} from "../services/personnel.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrl: './personnel-edit.component.scss'
})
export class PersonnelEditComponent implements OnInit {

  personnelForm!: FormGroup;
  personnel!: Personnel;

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    const id = this.activatedRoute.snapshot.params['idPersonnel'];
    this.personnelService.getPersonnelById(id).subscribe(
      (data: Personnel) => {
        this.personnel = data;
        console.log("this.personnel : ",this.personnel)
        this.updateForm();
      },
      error => {
        console.error('Error loading personnel: ', error);
      }
    );
  }

  initForm(): void {
    this.personnelForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  updateForm(): void {
    this.personnelForm.patchValue({
      nom: this.personnel.nom,
      prenom: this.personnel.prenom,
      type: this.personnel.type
    });
  }

  onSubmit(): void {
    if (this.personnelForm.valid) {
      const formData = this.personnelForm.value as Personnel;
      formData.id = this.personnel.id;
      this.personnelService.updatePersonnel(formData).subscribe(
        (data: Personnel) => {
          console.log('Personnel updated successfully: ', data);
          this.personnelForm.reset();
          this.router.navigateByUrl("/personnel")
        },
        error => {
          console.error('Error updating personnel: ', error);
        }
      );
    }
  }
}
