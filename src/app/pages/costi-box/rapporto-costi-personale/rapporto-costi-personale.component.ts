import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityCostiPersonaleService } from '../../../service/utility-costi-personale.service';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rapporto-costi-personale',
  templateUrl: './rapporto-costi-personale.component.html',
  styleUrls: ['./rapporto-costi-personale.component.scss']
})
export class RapportoCostiPersonaleComponent implements OnInit {
  titolo = 'Riepilogo Costi Mensili Personale';
  rapportoCostiForm: FormGroup;
  rapporti: any[] = [];
  societa: { societaid: number; ragionesociale: string }[] = [];
  matricoleSelezionate: string[] = [];
  elementiPerPagina = 10; // Default items per page
  totalPages = 0;
  currentPage = 1;


  constructor(
    private fb: FormBuilder,
    private rapportoCostiService: UtilityCostiPersonaleService,
    private societaService: InsertContrattoService,
    private router: Router
  ) {
    this.rapportoCostiForm = this.fb.group({
      anno: ['', [this.numericValidator(), Validators.min(2000), Validators.max(new Date().getFullYear())]],
      mese: ['', [this.numericValidator(), Validators.min(1), Validators.max(12)]],
      idAzienda: [''],
      matricolePersone: [''],
      nome: [''],
      cognome: [''],
      idCommessa: ['']
    });
  }

  ngOnInit(): void {
    this.getAllSocieta();
  }

  getAllSocieta() {
    this.societaService.getAllTipoSocieta().subscribe(
      (response: any) => {
        this.societa = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero delle societa:', error);
      }
    );
  }
  
  cercaRapporti(): void {
    if (this.rapportoCostiForm.invalid) {
      this.rapportoCostiForm.markAllAsTouched();
      return;
    }

    const formValue = this.rapportoCostiForm.value;
    const matricoleList = formValue.matricolePersone
      .split(/[\s,]+/)
      .map((matricola: string) => matricola.trim())
      .filter((matricola: string) => matricola.length > 0);

    const params = {
      anno: formValue.anno,
      mese: formValue.mese,
      idAzienda: formValue.idAzienda,
      matricolePersone: matricoleList,
      nome: formValue.nome,
      cognome: formValue.cognome,
      idCommessa: formValue.idCommessa
    };

    this.rapportoCostiService.getRapporti(params).subscribe((data: any[]) => {
      this.rapporti = data;
      this.totalPages = Math.ceil(data.length / this.elementiPerPagina);
    });
  }

  clearForm(): void {
    this.rapportoCostiForm.reset();
    this.rapporti = [];
  }

  getRagioneSociale(aziendaId: number): string {
    const azienda = this.societa.find(s => s.societaid === aziendaId);
    return azienda ? azienda.ragionesociale : 'N/A';
  }

  esportaExcel(): void {
    // Implementazione della funzione di esportazione
    console.log(this.matricoleSelezionate);
  }

  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[0-9]*$/.test(control.value);
      return isValid ? null : { numeric: true };
    };
  }

  cambiaElementiPerPagina(itemsPerPage: number): void {
    this.elementiPerPagina = itemsPerPage;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.rapporti.length / this.elementiPerPagina);
  }

  cambiaPagina(page: number): void {
    this.currentPage = page;
  }

  paginatedRapporti(): any[] {
    const start = (this.currentPage - 1) * this.elementiPerPagina;
    const end = start + this.elementiPerPagina;
    return this.rapporti.slice(start, end);
  }

  close() {
    this.router.navigate(["Home"]);
  }
}
