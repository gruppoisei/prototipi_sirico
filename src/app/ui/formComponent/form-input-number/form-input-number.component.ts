// import { Component, Input, OnInit } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { min } from 'rxjs';

// @Component({
//   selector: 'app-form-input-number',
//   templateUrl: './form-input-number.component.html',
//   styleUrl: './form-input-number.component.scss',
//   providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormInputNumberComponent },]

// })
// export class FormInputNumberComponent implements ControlValueAccessor,OnInit {

//   @Input() 
//   callbackOnChange: (args:any ) => void | any = ([]) => {}
  

//   @Input() 
//   callbackOnClick: (args:any ) => void | any = ([]) => {}

//   @Input() 
//   callbackOnInput: (args:any ) => void | any = ([]) => {}

//   @Input()
//   step: number = 1

//   @Input()
//   minValue: number | null = null
  
//   @Input()
//   maxValue: number | null = null

//   @Input()
//   touched = false

//   @Input()
//   titolo=""
  
//   @Input()
//   placeholder="0"
  
//   @Input()
//   errore:any
  
//   @Input()
//   required=false


//   value:number | null = this.minValue

//   isDisabled?:boolean;
  
//   focus=false

// test(){
//   console.log(this.errore)
//   console.log(this.touched)
// }
//   constructor(){
//   }
//   ngOnInit(): void {
//     // console.log(this.minValue);
//     // console.log(this.value)
//     // this.value = (this.minValue != null) ? this.minValue : null
//     // console.log(this.value)
//   }
  
//   onChangeEvent(){
//     this.callbackOnChange([])
//   }
//   onClickEvent(){
//     this.callbackOnClick([])
//   }
//   onInputEvent(){
//     this.callbackOnInput([])
//   }
  
  
//   onChange = (value:number | null) => {}
  


//   onTouch =()=>{}
  
//   setGetFocus()
//   {
//     this.focus=true
//   }

//   setLoseFocus()
//   {
//     this.focus = false
//   }


//   writeValue(value: number): void {
//     this.value =value
//   }
//   registerOnChange(fn:(value:number | null) =>void ): void {
//     this.onChange = fn
//   }
//   registerOnTouched(fn: () => void): void {
//     this.onTouch = fn 
//   }
//   setDisabledState?(isDisabled: boolean): void {
//     this.isDisabled = isDisabled
//   }


//   AggiornoValore()
//   {
//     this.onChange(this.value);
//     this.onTouch();
//   }


//   Prova()
//   {
//     console.log(this.touched)
//     // console.log(this.errore)
//   }

// }
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
  touched = false

  @Input()
  titolo=""
  
  @Input()
  placeholder="0"
  
  @Input()
  errore:any
  
  @Input()
  required=false


  value:string | null = (this.minValue != null) ? this.minValue.toString() : "0"
  isDisabled?:boolean;
  
  focus=false
  stepAdd(val:number){
    if(this.value == null){this.value = (this.minValue != null) ? this.minValue.toString() : "0";return}
    if(!Number.isNaN(this.value)){
      if(this.maxValue!= null ){

        this.value=(Number(this.value) +val) > this.maxValue ? this.maxValue.toString() : (Number(this.value) +val).toString()
      }else this.checkStep(val)
    }
  }
  stepSub(val:number){
    if(this.value == null){this.value = (this.minValue != null) ? this.minValue.toString() : "0";return}
    if(!Number.isNaN(this.value)){
      if(this.minValue!= null ){

        this.value=(Number(this.value) +val) < this.minValue ? this.minValue.toString() : (Number(this.value) +val).toString()
      }else this.checkStep(val)
    }
  }

  checkStep(val:number)
  {
    let trovato=false
    // if(this.value == null){this.value = (this.minValue != null) ? this.minValue.toString() : "0";return}
    
    if(this.maxValue!= null && (Number(this.value) ) > this.maxValue  ){
this.value = this.maxValue.toString()
      // this.value=(Number(this.value) +val) > this.maxValue ? this.maxValue.toString() : (Number(this.value) +val).toString()
      trovato=true
    }
    
    if(this.minValue!= null && (Number(this.value) ) < this.minValue ){
      this.value = this.minValue.toString()
      // this.value=(Number(this.value) +val) < this.minValue ? this.minValue.toString() : (Number(this.value) +val).toString()
      trovato=true
      
    }
    if(!trovato) this.value =(Number(this.value) +val).toString()
  }
test(){
  console.log(this.errore)
  console.log(this.touched)
}
  constructor(){
  }
  ngOnInit(): void {
    // console.log(this.minValue);
    // console.log(this.value)
    // this.value = (this.minValue != null) ? this.minValue : null
    // console.log(this.value)
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
  
  
  onChange = (value:string | null) => {}
  


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
  registerOnChange(fn:(value:string | null) =>void ): void {
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
