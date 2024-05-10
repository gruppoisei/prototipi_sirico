import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss',
  providers:[{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormInputTextComponent},]

})
export class FormInputTextComponent implements ControlValueAccessor {
  @Input() 
  callbackOnChange: (args:any ) => void | any = ([]) => {}
  

  @Input() 
  callbackOnClick: (args:any ) => void | any = ([]) => {}

  @Input() 
  callbackOnInput: (args:any ) => void | any = ([]) => {}

  @Input()
  type="text"

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


  value:string = ""

  isDisabled?:boolean;
  
  focus=false


  constructor(){
    
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
  
  
  onChange = (value:string) => {}
  


  onTouch =()=>{}
  
  setGetFocus()
  {
    this.focus=true
  }

  setLoseFocus()
  {
    this.focus = false
  }


  writeValue(value: string): void {
    this.value =value
  }
  registerOnChange(fn:(value:string) =>void ): void {
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