import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'app-form-input-number',
  templateUrl: './form-input-number.component.html',
  styleUrl: './form-input-number.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormInputNumberComponent },]

})
export class FormInputNumberComponent implements ControlValueAccessor,OnInit {

  @Input() 
  callbackOnChange: (args:any ) => void | any = ([]) => {}
  

  @Input() 
  callbackOnClick: (args:any ) => void | any = ([]) => {}

  @Input() 
  callbackOnInput: (args:any ) => void | any = ([]) => {}

  @Input()
  step: number = 1

  @Input()
  minValue: number | null = null
  
  @Input()
  maxValue: number | null = null

  @Input()
  touched:any

  @Input()
  titolo=""
  
  @Input()
  placeholder=""
  
  @Input()
  errore:any
  
  @Input()
  required=false


  value:number | null = null

  isDisabled?:boolean;
  
  focus=false


  constructor(){
  }
  ngOnInit(): void {
    this.value = (this.minValue != null) ? this.minValue : null
  }
  
  onChangeEvent(){
    this.callbackOnChange([])
  }
  onClickEvent(){
    this.callbackOnClick([])
  }
  onInputEvent(){
    this.callbackOnInput([])
  }
  
  
  onChange = (value:number | null) => {}
  


  onTouch =()=>{}
  
  setGetFocus()
  {
    this.focus=true
  }

  setLoseFocus()
  {
    this.focus = false
  }


  writeValue(value: number): void {
    this.value =value
  }
  registerOnChange(fn:(value:number | null) =>void ): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn 
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }


  AggiornoValore()
  {
    this.onChange(this.value);
    this.onTouch();
  }


  Prova()
  {
    console.log(this.touched)
    // console.log(this.errore)
  }

}
