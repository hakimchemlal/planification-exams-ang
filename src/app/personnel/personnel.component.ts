import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Personnel} from "../models/personnel";
import {PersonnelService} from "../services/personnel.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent implements OnInit {

  personnelForm!: FormGroup;
  personnels!: Personnel[];

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadPersonnels();
  }

  initForm(): void {
    this.personnelForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  loadPersonnels(): void {
    this.personnelService.getPersonnels().subscribe(
      (data: Personnel[]) => {
        this.personnels = data;
        console.log("all : : ", data)
      },
      error => {
        console.error('Error loading personnels: ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.personnelForm.valid) {
      const formData = this.personnelForm.value as Personnel;
      this.addPersonnel(formData);
      this.personnelForm.reset();
    }
  }

  addPersonnel(personnel: Personnel): void {
    this.personnelService.addPersonnel(personnel).subscribe(
      (data: Personnel) => {
        console.log('Personnel added successfully: ', data);
        this.loadPersonnels();
      },
      error => {
        console.error('Error adding personnel: ', error);
      }
    );
  }

  deletePersonnel(id: number): void {
    if (confirm('Are you sure you want to delete this personnel?')) {
      this.personnelService.deletePersonnel(id).subscribe(
        () => {
          console.log('Personnel deleted successfully');
          this.loadPersonnels();
        },
        error => {
          console.error('Error deleting personnel: ', error);
        }
      );
    }
  }

  modifierPersonnel(id: number) {
    if (id) {
      this.router.navigateByUrl(`/personnel-edit/${id}`)
    } else {
      console.error('Error: Personnel ID is undefined');
    }
  }
}
