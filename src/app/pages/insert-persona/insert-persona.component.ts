import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegioneService } from '../../service/regione.service';
import { PaesiService } from '../../service/paesi.service';
import { SocietaService } from '../../service/societa.service';
import { ProvinceService } from '../../service/province.service';
import { ComuniService } from '../../service/comuni.service';
import { Location } from '@angular/common';
import ValidateForm from '../../helpers/validateform';
import { ResponseDialogComponent } from '../../ui/response-dialog/response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../ui/message-response-dialog/message-response-dialog.component';
import { PersonaService } from '../../service/persona.service';
import { DocumentiService } from '../../service/documenti.service';
import FormattaData from '../../helpers/formattaData';
import { Router } from '@angular/router';
import { MenuDinamicoService } from '../../service/menu-dinamico.service';

@Component({
  selector: 'app-insert-persona',
  templateUrl: './insert-persona.component.html',
  styleUrl: './insert-persona.component.scss'
})
export class InsertPersonaComponent implements OnInit {

  oggi = new Date()
  minVisita: string
  maxVisita: string
  maxDateScadenza?: string
  minDateScadenza?: string
  insertPersona !: FormGroup;
  listRegioni: any;
  listRegioniResidenza: any
  listRegioniDomicilio: any
  listPaese: any;
  listSocieta: any;
  listProvince: any;
  listProvinceResidenza: any;
  listProvinceDomicilio: any;
  listComuniNascita: any;
  listComuniResidenza: any;
  listComuniDomicilio: any;
  showDomicilio: any;
  data: string;
  idProvinciaNascita: any;
  idRegioneNascita: any;
  idProvinciaResidenza: any;
  idRegioneResidenza: any;
  idProvinciaDomicilio: any;
  idRegioneDomicilio: any;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  isTableVisibile: boolean = false
  enabled: boolean = true;
  defaultValues: any;
  utenteLoggato: string | null = "";

  constructor
    (
      private personaService: PersonaService, private dialog: MatDialog,
      private location: Location, private fb: FormBuilder,
      private serviceRegione: RegioneService, private servicePaese: PaesiService,
      private serviceSocieta: SocietaService, private serviceProvince: ProvinceService,
      private serviceComune: ComuniService, private serviceDocumenti: DocumentiService,
      private changeDetector: ChangeDetectorRef, private router: Router,
      public menuDinamicoService: MenuDinamicoService
    ) {
    // const router = inject(Router)

    this.data = this.personaService.getTitolo();
    if (this.data === '') {
      this.router.navigate(['/Segreteria/gestione-dipendente'])
    }
    this.minVisita = new Date(this.oggi.getFullYear() - 3, 0, 2).toISOString().split('T')[0];
    this.maxVisita = new Date(this.oggi.getFullYear(), this.oggi.getMonth(), this.oggi.getDate() + 2).toISOString().split('T')[0]
  }

  ngOnDestroy() {
    this.personaService.clearDipendente();
  }

  ngOnInit(): void {
    this.utenteLoggato = sessionStorage.getItem('SysUser')
    this.insertPersona = this.fb.group(
      {
        AnpePersonaid: [0],
        AnpeNome: ['', Validators.required],
        AnpeCognome: ['', Validators.required],
        AnpeMatricola: ['', Validators.required],
        AnpeDatanascita: ['', Validators.required],
        AnpeCodicefiscale: ['', [Validators.required, Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')]],
        AnpePartitaiva: ['', [Validators.pattern('^(IT)?[0-9]{11}$')]],
        AnpeFkGepaPaeseidPaesenascita: ['', Validators.required],
        RegioneNascita: ['', Validators.required],
        ProvinciaNascita: ['', Validators.required],
        AnpeFkGecoComuneidComunenascita: ['', Validators.required],
        AnpeFkGepaPaeseidPaeseresidenza: ['', Validators.required],
        RegioneResidenza: ['', Validators.required],
        ProvinciaResidenza: ['', Validators.required],
        AnpeFkGecoComuneidComuneresidenza: ['', Validators.required],
        AnpeIndirizzoresidenza: ['', Validators.required],
        AnpeNumerocivicoresidenza: ['', Validators.required],
        AnpeCapresidenza: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        AnpeFkGepaPaeseidPaesedomicilio: [''],
        AnpeFkGecoComuneidComunedomicilio: [''],
        RegioneDomicilio: [''],
        ProvinciaDomicilio: [''],
        AnpeIndirizzodomicilio: [''],
        AnpeNumerocivicodomicilio: [''],
        AnpeCapdomicilio: ['', Validators.pattern('^[0-9]{5}$')],
        AnpeNtelefono1: ['', [Validators.required, Validators.pattern('^((00|\\+)?39)?(3)\\d{8,9}$')]],
        AnpeNtelefono2: ['', Validators.pattern('^((00|\\+)?39)?(3)\\d{8,9}$')],
        AnpeDataidoneitamedica: [''],
        AnpeDatascadenzaidoneitamedica: [{ value: '', disabled: true }],
        AnpeEmailaziendale: ['', [Validators.required, Validators.email]],
        AnpeEmailpersonale: ['', Validators.email],
        AnpeFkAnsoSocietaid: ['', Validators.required],
        AnpeSysuser: [this.utenteLoggato]
      })
    this.defaultValues = this.insertPersona.value

    this.insertPersona.get('AnpeDataidoneitamedica')?.valueChanges.subscribe(value => {
      if (value) {
        this.insertPersona.get('AnpeDatascadenzaidoneitamedica')?.enable();
        const selectDate = new Date(value);
        const minDate = selectDate;
        this.minDateScadenza = minDate.toISOString().split('T')[0]
        const maxDate = new Date(selectDate.getFullYear() + 3, selectDate.getMonth(), selectDate.getDate() + 1);
        this.maxDateScadenza = maxDate.toISOString().split('T')[0];
      }
      else {
        this.insertPersona.get('AnpeDatascadenzaidoneitamedica')?.disable();
      }
    });

    this.personaService.dipendente$.subscribe((dipendente) => {
      if (dipendente) {
        const campiDaControllare = ['anpeFkGecoComuneidComunedomicilio', 'anpeFkGepaPaeseidPaesedomicilio'];
        Object.keys(dipendente).forEach((key) => {
          if (campiDaControllare.includes(key) && dipendente[key] === null) {
            dipendente[key] = '';
          }
        });
        this.loadComuniAndProvince(dipendente.anpeFkGecoComuneidComunenascita, dipendente.anpeFkGecoComuneidComuneresidenza, dipendente.anpeFkGecoComuneidComunedomicilio)
        this.showDomicilio = true;
        this.populateForm(dipendente);
      }
    });

    this.loadListe()

    this.menuDinamicoService.getPermissionFlag();
  }

  loadListe(): void {

    this.serviceRegione.getRegioni().subscribe(regioni => {
      this.listRegioni = regioni.sort((a, b) => a.gereDeno > b.gereDeno ? 1 : -1);
    });

    this.serviceRegione.getRegioni().subscribe(regioni => {
      this.listRegioniResidenza = regioni.sort((a, b) => a.gereDeno > b.gereDeno ? 1 : -1);
    });

    this.serviceRegione.getRegioni().subscribe(regioni => {
      this.listRegioniDomicilio = regioni.sort((a, b) => a.gereDeno > b.gereDeno ? 1 : -1);
    });

    this.servicePaese.getAllPaesi().subscribe(paesi => this.listPaese = paesi);
    this.serviceSocieta.getAllSocieta().subscribe(societa => this.listSocieta = societa);
  }

  loadComuniAndProvince(idComuneNascita: any, idComuneResidenza: any, idComuneDomicilio: any) {
    if (idComuneNascita !== null && idComuneNascita !== "") {
      this.serviceComune.getComuniByIdComune(idComuneNascita).subscribe(listaComuni => this.listComuniNascita = listaComuni)
      this.serviceProvince.getProvinceByIdComune(idComuneNascita).subscribe(listaProvince => this.listProvince = listaProvince)
    }
    if (idComuneResidenza !== null && idComuneResidenza !== "") {
      this.serviceComune.getComuniByIdComune(idComuneResidenza).subscribe(listaComuni => this.listComuniResidenza = listaComuni)
      this.serviceProvince.getProvinceByIdComune(idComuneResidenza).subscribe(listaProvince => this.listProvinceResidenza = listaProvince)
    }
    if (idComuneDomicilio !== null && idComuneDomicilio !== "") {
      this.serviceComune.getComuniByIdComune(idComuneDomicilio).subscribe(listaComuni => this.listComuniDomicilio = listaComuni)
      this.serviceProvince.getProvinceByIdComune(idComuneDomicilio).subscribe(listaProvince => this.listProvinceDomicilio = listaProvince)
    }
  }

  populateForm(dipendente: any) {
    // Popolamento delle informazioni relative al luogo di nascita
    this.populateLuogoNascita(dipendente);

    // Popolamento delle informazioni relative alla residenza
    this.populateResidenza(dipendente);

    // Popolamento delle informazioni relative al domicilio
    this.populateDomicilio(dipendente);

    // Formattazione della data di nascita
    const dataNascita = FormattaData.formattaData(dipendente.anpeDatanascita)
    const dataIdoneitaMedica = FormattaData.formattaData(dipendente.anpeDataidoneitamedica)
    const dataScadenzaIdoneitaMedica = FormattaData.formattaData(dipendente.anpeDatascadenzaidoneitamedica)

    // Popolamento delle informazioni personali
    this.insertPersona.patchValue({
      AnpePersonaid: dipendente.anpePersonaid,
      AnpeNome: dipendente.anpeNome,
      AnpeCognome: dipendente.anpeCognome,
      AnpeMatricola: dipendente.anpeMatricola,
      AnpeDatanascita: dataNascita,
      AnpeCodicefiscale: dipendente.anpeCodicefiscale,
      AnpePartitaiva: dipendente.anpePartitaiva,
      AnpeFkGepaPaeseidPaesenascita: dipendente.anpeFkGepaPaeseidPaesenascita,
      AnpeFkGecoComuneidComunenascita: dipendente.anpeFkGecoComuneidComunenascita,
      AnpeFkGepaPaeseidPaeseresidenza: dipendente.anpeFkGepaPaeseidPaeseresidenza,
      AnpeFkGecoComuneidComuneresidenza: dipendente.anpeFkGecoComuneidComuneresidenza,
      AnpeIndirizzoresidenza: dipendente.anpeIndirizzoresidenza,
      AnpeNumerocivicoresidenza: dipendente.anpeNumerocivicoresidenza,
      AnpeCapresidenza: dipendente.anpeCapresidenza,
      AnpeFkGepaPaeseidPaesedomicilio: dipendente.anpeFkGepaPaeseidPaesedomicilio,
      AnpeFkGecoComuneidComunedomicilio: dipendente.anpeFkGecoComuneidComunedomicilio,
      AnpeIndirizzodomicilio: dipendente.anpeIndirizzodomicilio,
      AnpeNumerocivicodomicilio: dipendente.anpeNumerocivicodomicilio,
      AnpeCapdomicilio: dipendente.anpeCapdomicilio,
      AnpeNtelefono1: dipendente.anpeNtelefono1,
      AnpeNtelefono2: dipendente.anpeNtelefono2,
      AnpeDataidoneitamedica: dataIdoneitaMedica,
      AnpeDatascadenzaidoneitamedica: dataScadenzaIdoneitaMedica,
      AnpeEmailaziendale: dipendente.anpeEmailaziendale,
      AnpeEmailpersonale: dipendente.anpeEmailpersonale,
      AnpeFkAnsoSocietaid: dipendente.anpeFkAnsoSocietaid,
      AnpeSysuser: this.utenteLoggato
    });
  }

  populateLuogoNascita(dipendente: any) {

    this.serviceComune.getProvinciaByIdComune(dipendente.anpeFkGecoComuneidComunenascita).subscribe({
      next: (idProvincia) => {
        this.idProvinciaNascita = idProvincia;
        this.serviceProvince.getRegioneByIdProvincia(this.idProvinciaNascita).subscribe({
          next: (idRegione) => {
            this.idRegioneNascita = idRegione;
            this.insertPersona.patchValue({
              RegioneNascita: this.idRegioneNascita,
              ProvinciaNascita: this.idProvinciaNascita
            });
          }
        });
      }
    });
  }

  populateResidenza(dipendente: any) {
    this.serviceComune.getProvinciaByIdComune(dipendente.anpeFkGecoComuneidComuneresidenza).subscribe({
      next: (idProvincia) => {

        this.idProvinciaResidenza = idProvincia;
        this.serviceProvince.getRegioneByIdProvincia(this.idProvinciaResidenza).subscribe({
          next: (idRegione) => {

            this.idRegioneResidenza = idRegione;
            this.insertPersona.patchValue({
              RegioneResidenza: this.idRegioneResidenza,
              ProvinciaResidenza: this.idProvinciaResidenza
            });
          }
        });
      }
    });
  }

  populateDomicilio(dipendente: any) {
    if (dipendente.anpeFkGecoComuneidComunedomicilio !== null && dipendente.anpeFkGecoComuneidComunedomicilio !== "") {
      this.serviceComune.getProvinciaByIdComune(dipendente.anpeFkGecoComuneidComunedomicilio).subscribe({
        next: (idProvincia) => {
          this.idProvinciaDomicilio = idProvincia;
          this.serviceProvince.getRegioneByIdProvincia(this.idProvinciaDomicilio).subscribe({
            next: (idRegione) => {
              this.idRegioneDomicilio = idRegione;
              this.insertPersona.patchValue({
                RegioneDomicilio: this.idRegioneDomicilio,
                ProvinciaDomicilio: this.idProvinciaDomicilio
              });
            }
          });
        }
      });
    }
  }

  salvaPersona() {
    if (this.insertPersona.valid) {
      //
      console.log(this.insertPersona.value);
      //
      const personaObj = this.insertPersona.value;
      this.personaService.salvaPersona(personaObj, this.selectedFiles)
        .subscribe(
          {
            next: (res) => {
              this.dialog.open(MessageResponseDialogComponent,
                {
                  data: { successMessage: res.message },
                  width: 'auto',
                  height: 'auto'
                })
              this.reloadGestioneFile()
              this.clearSearch();
              this.selectedFiles = []
            },
            error: (err) => {
              this.dialog.open(MessageResponseDialogComponent,
                {
                  data: { errorMessage: err?.error.message },
                  width: 'auto',
                  height: 'auto'
                })
            }
          })
    }
    else {
      ValidateForm.validateAllFormFields(this.insertPersona);
      this.dialog.open(ResponseDialogComponent,
        {
          width: 'auto',
          height: 'auto',
        });
    }
  }

  onCheckboxChange(event: any) {
    this.showDomicilio = event.target.checked;
  }

  onRegionChangeDomicilio(event: any) {
    const idRegione = event.target.value
    this.serviceProvince.getAllProvinceByRegione(idRegione).subscribe
      ((province: any) => {
        this.listProvinceDomicilio = province
      })
  }

  clearSearch() {
    this.insertPersona.reset(this.defaultValues);
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['/' + this.menuDinamicoService.finalPath.substring(0, this.menuDinamicoService.finalPath.lastIndexOf("/") + 1)]);
  }

  onRegionChangeResidenza(event: any) {
    const idRegione = event.target.value
    this.serviceProvince.getAllProvinceByRegione(idRegione).subscribe
      ((province: any) => {
        this.listProvinceResidenza = province
      })
  }

  onRegionChangeNascita(event: any) {
    const idRegione = event.target.value
    this.serviceProvince.getAllProvinceByRegione(idRegione).subscribe
      ((province: any) => {
        this.listProvince = province
      })
  }

  onChangeProvinciaDomicilio(event: any) {
    const idProvince = event.target.value
    this.serviceComune.getComuniByProvinceId(idProvince).subscribe
      ((comuni: any) => {
        this.listComuniDomicilio = comuni
      })
  }

  onChangeProvinciaResidenza(event: any) {
    const idProvince = event.target.value
    this.serviceComune.getComuniByProvinceId(idProvince).subscribe
      ((comuni: any) => {
        this.listComuniResidenza = comuni
      })
  }

  onProvinciaNascitaChage(event: any) {
    const idProvince = event.target.value
    this.serviceComune.getComuniByProvinceId(idProvince).subscribe
      ((comuni: any) => {
        this.listComuniNascita = comuni
      })
  }

  receiveFile($event: any) {
    this.selectedFiles = $event
  }

  reloadGestioneFile() {
    this.enabled = false;
    this.changeDetector.detectChanges();
    this.enabled = true;
  }
}