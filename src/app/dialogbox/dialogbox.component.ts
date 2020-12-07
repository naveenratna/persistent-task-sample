import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import{ TaskmanagementService } from '../taskmanagement.service'

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  Objdata: any = [];
  Objpdata:any = [];
  ObjListdata: any = [];
  formSubmitted = false;
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
    private TaskmanagementService:TaskmanagementService,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }
  ngOnInit() {
    this.Objpdata.parentName = this.data.pname +'-'+ this.data.pid;
   }

  saveCard(Formdata: NgForm){
    console.log(Formdata.value)
    let fmdata = {
      fieldName:Formdata.value.fieldName,
      parentName:this.data.pname,
      parentid: this.data.pid
    }
   this.formSubmitted = true;
   if(Formdata.valid){
    this.formSubmitted = false;
   this.Objdata =  this.TaskmanagementService.addCardData(fmdata)
    this.dialogRef.close();
  }
}
  
  getcards() {
    this.Objdata =  this.TaskmanagementService.getCards()
  }
  getLists(){
    this.ObjListdata = this.TaskmanagementService.getLists()
  }

  saveList(FormListdata:NgForm){
    this.formSubmitted = true;
    if(FormListdata.valid){
    this.formSubmitted = false;
    this.ObjListdata =  this.TaskmanagementService.addListData(FormListdata.value)
    this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }
  onYesClick(): void {
    this.dialogRef.close('yes');
  }
}
