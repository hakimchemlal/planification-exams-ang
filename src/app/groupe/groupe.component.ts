import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Groupe} from "../models/groupe";
import {Personnel} from "../models/personnel";
import {GroupeService} from "../services/groupe.service";
import {PersonnelService} from "../services/personnel.service";

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrl: './groupe.component.scss'
})
export class GroupeComponent implements OnInit {
  groupeForm: FormGroup;
  groupes: Groupe[] = [];
  personnels: Personnel[] = [];
  selectedGroupe: Groupe | null = null;

  constructor(
    private fb: FormBuilder,
    private groupesService: GroupeService,
    private personnelService: PersonnelService
  ) {
    this.groupeForm = this.fb.group({
      nom: ['', Validators.required],
      membres: ['']  // List of member IDs, comma-separated string
    });
  }

  ngOnInit(): void {
    this.loadGroupes();
    this.loadPersonnels();
  }

  loadGroupes(): void {
    this.groupesService.getAllGroupes().subscribe(
      data => this.groupes = data,
      error => console.error('Error loading groupes: ', error)
    );
  }

  loadPersonnels(): void {
    this.personnelService.getPersonnels().subscribe(
      data => this.personnels = data,
      error => console.error('Error loading personnels: ', error)
    );
  }

  onSubmit(): void {
    if (this.groupeForm.valid) {
      if (this.selectedGroupe) {
        this.addMembersToGroupe();
      } else {
        this.createGroupe();
      }
    }
  }

  createGroupe(): void {
    const groupe: Groupe = this.groupeForm.value;
    groupe.membres = this.parseMembers(this.groupeForm.value.membres);
    this.groupesService.createGroupe(groupe).subscribe(
      newGroupe => {
        this.groupes.push(newGroupe);
        this.groupeForm.reset();
      },
      error => console.error('Error creating groupe: ', error)
    );
  }

  addMembersToGroupe(): void {
    const memberIds = this.parseMemberIds(this.groupeForm.value.membres);
    console.log("memberIds: ", memberIds)
    this.groupesService.addMembersToGroupe(this.selectedGroupe!.id, memberIds).subscribe(
      updatedGroupe => {
        const index = this.groupes.findIndex(g => g.id === updatedGroupe.id);
        this.groupes[index] = updatedGroupe;
        this.groupeForm.reset();
        this.selectedGroupe = null;
      },
      error => console.error('Error adding members to groupe: ', error)
    );
  }

  parseMembers(members: string): Personnel[] {
    const memberIds = members.split(',').map(id => parseInt(id.trim(), 10));
    return this.personnels.filter(personnel => memberIds.includes(personnel.id));
  }

  parseMemberIds(members: string): number[] {
    return members.split(',').map(id => parseInt(id.trim(), 10));
  }

  editGroupe(groupe: Groupe): void {
    this.selectedGroupe = groupe;
    this.groupeForm.patchValue({
      nom: groupe.nom,
      membres: groupe.membres?.map(m => m.id).join(', ')
    });
  }

  deleteGroupe(id: number): void {
    if (confirm('Are you sure you want to delete this Group ?')) {
      this.groupesService.deleteGroupe(id).subscribe(
        () => this.groupes = this.groupes.filter(g => g.id !== id),
        error => console.error('Error deleting groupe: ', error)
      );
    }
  }

  resetForm(): void {
    this.groupeForm.reset();
    this.selectedGroupe = null;
  }

  getMembreNomPrenom(membres: Personnel[] | undefined) {
    return membres?.map(membre => `${membre.nom} ${membre.prenom}`).join(', ');
  }
}
