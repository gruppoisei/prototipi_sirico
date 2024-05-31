import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityCostiPersonaleService } from '../../../service/utility-costi-personale.service';
import { Component, OnInit } from '@angular/core';
import { InsertContrattoService } from '../../../service/insert-contratto.service';

@Component({
  selector: 'app-rapporto-costi-personale',
  templateUrl: './rapporto-costi-personale.component.html',
  styleUrl: './rapporto-costi-personale.component.scss'
})
export class RapportoCostiPersonaleComponent implements OnInit {
  titolo = 'Ricerca Rapporto Costi Mensili Personale';
  rapportoCostiForm: FormGroup;
  rapporti: any[] = [];
  societa: { societaid: number; ragionesociale: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private rapportoCostiService: UtilityCostiPersonaleService,
    private societaService: InsertContrattoService
  ) {
    this.rapportoCostiForm = this.fb.group({
      anno: [''],
      mese: [''],
      idAzienda: [''],
      matricolePersone: [''],
      idCommessa: ['']
    });
  }

  ngOnInit(): void {
    this.getAllSocieta()
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
      idCommessa: formValue.idCommessa
    };

    this.rapportoCostiService.getRapporti(params).subscribe((data: any[]) => {
      //console.log(JSON.stringify(data));
      this.rapporti = data;
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
}
