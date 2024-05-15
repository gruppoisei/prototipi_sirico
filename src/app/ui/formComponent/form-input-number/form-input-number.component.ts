import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input-number',
  templateUrl: './form-input-number.component.html',
  styleUrl: './form-input-number.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormInputNumberComponent },]

})
export class FormInputNumberComponent implements ControlValueAccessor {

  @Input()
  callbackOnChange: (args: any) => void | any = ([]) => { }


  @Input()
  callbackOnClick: (args: any) => void | any = ([]) => { }

  @Input()
  callbackOnInput: (args: any) => void | any = ([]) => { }

  @Input()
  step: number = 1

  @Input()
  minValue: number | null = null

  @Input()
  maxValue: number | null = null

  @Input()
  touched = false

  @Input()
  titolo = ""

  @Input()
  placeholder = "0"

  @Input()
  errore: any

  @Input()
  required = false


  value: string | null = (this.minValue != null) ? this.minValue.toString() : "0"
  isDisabled?: boolean;

  focus = false


  checkStep(val: number) {
    let trovato = false

    if (this.maxValue != null && (Number(this.value)+val) > this.maxValue) {
      this.value = this.maxValue.toString()
      trovato = true
    }

    if (this.minValue != null && (Number(this.value)+val) < this.minValue) {
      this.value = this.minValue.toString()
      trovato = true

    }
    if (!trovato) this.value = (Number(this.value) + val).toString()
  }
  testErrori() {
    console.log(this.errore)
    console.log(this.touched)
  }
  constructor() {
  }

  onChangeEvent() {
    this.callbackOnChange([])
  }
  onClickEvent() {
    this.callbackOnClick([])
  }
  onInputEvent() {
    this.callbackOnInput([])
  }


  onChange = (value: string | null) => { }



  onTouch = () => { }

  setGetFocus() {
    this.focus = true
  }

  setLoseFocus() {
    this.focus = false
  }


  writeValue(value: string): void {
    this.value = value
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }


  AggiornoValore() {
    this.onChange(this.value);
    this.onTouch();
  }


  Prova() {
    console.log(this.touched)
    // console.log(this.errore)
  }

}
