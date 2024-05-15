import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormSelectComponent },]
})
export class FormSelectComponent implements ControlValueAccessor {

  @Input() 
  callbackOnChange: (args:any ) => void | any = ([]) => {}
  

  aaaaaProva2= null

  @Input()
  touched: any;

  @Input()
  titolo = ""

  @Input({ required: true })
  nomeCampoValore!:string

  @Input({ required: true })
  nomeCampoDescrizione!:string

  @Input()
  listaElementi: any[] = [];

  @Input()
  elementoDefault="--Seleziona--"

  focus=false

  @Input()
  errore: any

  value:string|number | null = ""

  isDisabled?: boolean;

  onChange = (value: string |number | null) => { }
  onTouch = () => { }


  constructor() { 
  
  }

  writeValue(value: any): void {
    this.value = value
  }
  registerOnChange(fn:(value:string|number|null) =>void ): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn 
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }


  ProvaErrore() {
    console.log(this.errore)
  }

 
  setGetFocus()
  {
    this.focus=true
  }

  setLoseFocus()
  {
    this.focus = false
  }
  AggiornoValore() {
    this.onChange(this.value);
    this.onTouch();
  }

  testErrori(){
    console.log(this.errore)
    console.log(this.touched)
    //console.log(this.value)
  }

}
