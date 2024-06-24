import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { StepperDialogModificaComponent } from '../stepper-dialog-modifica/stepper-dialog-modifica.component';
import { MatDialog } from '@angular/material/dialog';
import { Aspetto, StepperService } from '../stepper.service';
import { StepperDialogCreazioneAspettoComponent } from '../stepper-dialog-creazione-aspetto/stepper-dialog-creazione-aspetto.component';

@Component({
  selector: 'app-stepper-prova',
  templateUrl: './stepper-prova.component.html',
  styleUrl: './stepper-prova.component.scss',
})

export class StepperProvaComponent {

  listaAspettiAggiunti: Aspetto[] = [];

  isLinear = false;
  // stepper!: MatStepper;
  aspettoSelezionato: Aspetto | undefined;
  lunghezzaInizialeListaAspettiDaValutare!: number;

  @ViewChild('stepper')
  stepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    settoreMateria: ['', Validators.required],
    areaProdotto: ['', Validators.required],
    sede: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    step2Criticita: ['', this.checkFormEGriglia()],
    step2Aspetti: ['', this.checkFormEGriglia()],
    // step2ListaAspettiCriticita: [[] as Aspetto[], Validators.required]
  });

  thirdFormGroup = this._formBuilder.group({
    step3Aspetti: ['', Validators.required],
    step3Suggerimenti: [''],
  });

  // STEP1: DROPDOWN LIST
  settoreMateria = [
    { nomeSettore: 'Settore 1', idSettore: 1 },
    { nomeSettore: 'Settore 2', idSettore: 2 },
    { nomeSettore: 'Settore 3', idSettore: 3 }
  ];

  areaProdotto = [
    { nomeArea: 'Area 1', idArea: 1 },
    { nomeArea: 'Area 2', idArea: 2 },
    { nomeArea: 'Area 3', idArea: 3 }
  ];

  sedi = [
    { nomeSede: 'Sede 1', idSede: 1 },
    { nomeSede: 'Sede 2', idSede: 2 },
    { nomeSede: 'Sede 3', idSede: 3 }
  ];

  nomeSettoreMateria!: string;
  nomeAreaProdotto!: string;
  nomeSede!: string;

  // STEP2: DROPDOWN LIST ASPETTI DA VALUTARE
  aspettiDaValutare = [
    { nomeAspetto: 'Aspetti Informatici', idAspetto: 1 },
    { nomeAspetto: 'Aspetti Organizzativi', idAspetto: 2 },
    { nomeAspetto: 'Aspetti Gestionali', idAspetto: 3 },
    { nomeAspetto: 'Rapporti con l\'utenza', idAspetto: 4 },
    { nomeAspetto: 'Fattori Esogeni', idAspetto: 5 },
    { nomeAspetto: 'Formazione', idAspetto: 6 },
    { nomeAspetto: 'Autotutela', idAspetto: 7 },
    // { nomeAspetto: 'Altro', idAspetto: 8 }
  ];


  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private stepperService: StepperService
  ) {
    this.lunghezzaInizialeListaAspettiDaValutare = this.aspettiDaValutare.length;
  }

  aggiungiAspettoCriticita() {

    // verifico se il testo inserito dall'utente contiene solo spazi bianchi
    const esito = this.stepperService.checkStringOnlySpaces(this.secondFormGroup.value.step2Criticita!.trim());

    console.log("this.secondFormGroup.value.step2Aspetti");
    console.log(this.secondFormGroup.value.step2Aspetti);

    if (esito == false) {

      for (let i = 0; i < this.aspettiDaValutare.length; i++) {

        if (Number.parseInt(this.secondFormGroup.value.step2Aspetti!) == this.aspettiDaValutare[i].idAspetto) {
          this.listaAspettiAggiunti.push(
            {
              // idAspetto: this.aspettiDaValutare.find(aspetto => aspetto.nomeAspetto == this.secondFormGroup.value.step2Aspetti)!.idAspetto,
              idAspetto: Number.parseInt(this.secondFormGroup.value.step2Aspetti!),
              nomeAspetto: this.aspettiDaValutare[i].nomeAspetto,
              descrizioneCriticita: this.secondFormGroup.value.step2Criticita!.trim(),
              descrizioneSuggerimento: ""
            }
          );

          this.aspettiDaValutare.splice(i, 1);
          this.secondFormGroup.reset();
          break;
        }
      }
    }
    else if (esito == true) {
      alert('Inserire una descrizione valida per proseguire.');
    }


  }

  rimuoviAspettoAggiunto(idAspettoAggiunto: number) {

    for (let i = 0; i < this.listaAspettiAggiunti.length; i++) {

      if (this.listaAspettiAggiunti[i].idAspetto == idAspettoAggiunto) {
        this.aspettiDaValutare.push({
          idAspetto: this.listaAspettiAggiunti[i].idAspetto,
          nomeAspetto: this.listaAspettiAggiunti[i].nomeAspetto
        });
        this.listaAspettiAggiunti.splice(i, 1);
        break;
      }
    }
    this.aspettiDaValutare.sort((a, b) => a.idAspetto > b.idAspetto ? 1 : -1);
    console.log("rimuoviAspetto() END");
  }

  // aggiungiAspettoCriticitaSuggerimento() {

  //   for (let i = 0; i < this.listaAspettiAggiunti.length; i++) {

  //     if (Number.parseInt(this.thirdFormGroup.value.step3Aspetti!) == this.listaAspettiAggiunti[i].idAspetto) {
  //       this.listaAspettiSuggerimenti.push(
  //         {
  //           // idAspetto: this.aspettiDaValutare.find(aspetto => aspetto.nomeAspetto == this.secondFormGroup.value.step2Aspetti)!.idAspetto,
  //           idAspetto: this.listaAspettiAggiunti[i].idAspetto,
  //           nomeAspetto: this.listaAspettiAggiunti[i].nomeAspetto,
  //           descrizioneCriticita: this.listaAspettiAggiunti[i].descrizioneCriticita!,
  //           descrizioneSuggerimento: this.thirdFormGroup.value.step3Suggerimenti!
  //         }
  //       );

  //       this.listaAspettiAggiunti.splice(i, 1);
  //       this.thirdFormGroup.reset();
  //       break;
  //     }
  //   }
  // }  

  modifica(aspettiAggiunti: Aspetto, casoDaModificare: string) {

    this.stepperService.datiAspetto$.next(aspettiAggiunti);
    console.log('datiAspetto del Subject:', this.stepperService.datiAspetto$.value);
    this.stepperService.setTitolo(casoDaModificare);

    switch (casoDaModificare) {

      case 'Criticita': {
        this.dialogStepperModifica();
        break;
      }

      case 'Suggerimento': {
        this.dialogStepperModifica();
        break;
      }
    }
  }

  dialogStepperModifica() {
    const dialogRef = this.dialog.open(StepperDialogModificaComponent, {
      disableClose: true,
      width: '75%',
      height: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {

      for (let i = 0; i < this.listaAspettiAggiunti.length; i++) {

        if (this.stepperService.datiAspetto$.value!.idAspetto == this.listaAspettiAggiunti[i].idAspetto) {
          // this.listaAspettiAggiunti[i].idAspetto = this.stepperService.datiAspetto$.value!.idAspetto;
          // this.listaAspettiAggiunti[i].nomeAspetto = this.stepperService.datiAspetto$.value!.nomeAspetto;
          this.listaAspettiAggiunti[i].descrizioneCriticita = this.stepperService.datiAspetto$.value!.descrizioneCriticita;
          this.listaAspettiAggiunti[i].descrizioneSuggerimento = this.stepperService.datiAspetto$.value!.descrizioneSuggerimento;
          break;
        }

      }
      this.stepperService.datiAspetto$.next(undefined);
    });
  }

  dialogStepperCreazioneAspetto() {
    const dialogRef = this.dialog.open(StepperDialogCreazioneAspettoComponent, {
      disableClose: true,
      width: '75%',
      height: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (this.stepperService.nuovoAspetto$.value != "") {

        this.aspettiDaValutare.push({
          nomeAspetto: this.stepperService.nuovoAspetto$.value,
          // idAspetto: this.aspettiDaValutare.length + 1,
          idAspetto: this.lunghezzaInizialeListaAspettiDaValutare + 1,
        });

        this.lunghezzaInizialeListaAspettiDaValutare = this.lunghezzaInizialeListaAspettiDaValutare + 1;

        console.log("this.secondFormGroup.get('step2Aspetti')");
        console.log(this.secondFormGroup.get('step2Aspetti'));
        // this.secondFormGroup.get('step2Aspetti')!.setValue(({step2Criticita: "", step2Aspetti: this.lunghezzaInizialeListaAspettiDaValutare + 1}).toString());
        // this.secondFormGroup.controls['step2Aspetti'].setValue((this.lunghezzaInizialeListaAspettiDaValutare + 1).toString());
        // this.secondFormGroup.controls['step2Aspetti'].patchValue((this.lunghezzaInizialeListaAspettiDaValutare + 1).toString())
        // this.secondFormGroup.controls['step2Aspetti'].patchValue(this.stepperService.nuovoAspetto$.value)
        this.secondFormGroup.patchValue({
          step2Aspetti: (this.lunghezzaInizialeListaAspettiDaValutare + 1).toString()
        });
        console.log("this.secondFormGroup.get('step2Aspetti')");
        // console.log(this.secondFormGroup.get('step2Aspetti'));
        console.log(this.secondFormGroup);
      }
      console.log("aspettiDaValutare");
      console.log(this.aspettiDaValutare);
      // this.stepperService.nuovoAspetto$.next(undefined);
    });
  }

  formatIdToNameStep1() {
    if (this.firstFormGroup.value.settoreMateria != "" && this.firstFormGroup.value.settoreMateria != null && this.firstFormGroup.value.settoreMateria != undefined) {
      this.nomeSettoreMateria = this.settoreMateria.find(settore => settore.idSettore == Number.parseInt(this.firstFormGroup.value.settoreMateria!))!.nomeSettore;
    }
    if (this.firstFormGroup.value.areaProdotto != "" && this.firstFormGroup.value.areaProdotto != null && this.firstFormGroup.value.areaProdotto != undefined) {
      this.nomeAreaProdotto = this.areaProdotto.find(area => area.idArea == Number.parseInt(this.firstFormGroup.value.areaProdotto!))!.nomeArea;
    }
    if (this.firstFormGroup.value.sede != "" && this.firstFormGroup.value.sede != null && this.firstFormGroup.value.sede != undefined) {
      this.nomeSede = this.sedi.find(sede => sede.idSede == Number.parseInt(this.firstFormGroup.value.sede!))!.nomeSede;
    }
  }

  mostraNotaCompleta(nota: string) {
    alert(nota); // Puoi sostituire questo con qualsiasi altra logica per mostrare il testo completo, come un modale
  }

  moveToStep(index: number) {
    // console.log("index: ", index);
    this.stepper.selectedIndex = index - 1;
  }

  checkFormEGriglia(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // console.log("value");
      // console.log(value);

      if (this.listaAspettiAggiunti.length != 0) {
        console.log(1)
        return { esito: true }
      }

      else if (value != '' && this.listaAspettiAggiunti.length == 0) {
        console.log(2)
        return { esito: true }
      }

      else if (value == '' && this.listaAspettiAggiunti.length == 0) {
        console.log(3)
        return { esito: false }
      }

      return { esito: null }
    };

  }


  // checkFormEGrigliaBoolean(): boolean | null {
  //   var esito = null;

  //   (control: AbstractControl): boolean | null => {
  //     const value = control.value;

  //     console.log("value");
  //     console.log(value);

  //     if (this.listaAspettiAggiunti.length != 0) {
  //       console.log(1)
  //       esito = true
  //       // return  true 
  //     }

  //     else if (value != '' && this.listaAspettiAggiunti.length == 0) {
  //       console.log(2)
  //       esito = true 
  //     }

  //     else if (value == '' && this.listaAspettiAggiunti.length == 0) {
  //       console.log(3)
  //       esito = false  
  //     }

  //     return null 
  //   };

  //   return esito;

  //   // return (control: AbstractControl): ValidationErrors | null => {


  //   //   if (this.listaAspettiAggiunti.length == 0) {
  //   //     if (this.secondFormGroup.value.step2Aspetti == "" || this.secondFormGroup.value.step2Criticita == "") return { esito: false }
  //   //     else return { esito: true }
  //   //   }

  //   //   else if (this.listaAspettiAggiunti.length != 0) return { esito: true }
  //   // }
  // }

}
