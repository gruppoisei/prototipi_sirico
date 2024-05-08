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
  dirty: any;

  @Input()
  titolo = ""

  @Input()
  listaElementi: any[] = [];

  @Input()
  placeholder? = ""

  @Input()
  errore: any

  value: string = ""

  isDisabled?: boolean;

  onChange = (value: string) => { }
  onTouch = () => { }


  constructor() { }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


  ProvaErrore() {
    console.log(this.errore)
  }

  ProvaValore() {
    console.log(this.value);
  }

  AggiornoValore() {
    this.onChange(this.value);
    this.onTouch();
  }


}
