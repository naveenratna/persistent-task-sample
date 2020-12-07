import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit, CdkDragStart, CdkDrag } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import{ TaskmanagementService } from './taskmanagement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  Objdata: any;
  carddata: any;
  listdata:any;
  constructor(public dialog: MatDialog,private tskmngr:TaskmanagementService){}
  // on page load 
  ngOnInit() {
    this.getcardData();
    this.getListData();
  }
    
     // dragdrop event
    drop(event: any) {
      console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
    }
   
    // for add card
    openAddCardDialog(parentinfo:any){
      console.log(parentinfo);
      const dialogRef = this.dialog.open(DialogboxComponent, {
        width: '650px',
        data: {
          type:'CardTypepopup',
          pname:parentinfo.fieldListName,
          pid:parentinfo.id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getcardData();
      });
    }

    // getting card data
    getcardData(){
      this.carddata = this.tskmngr.getCards()
    }

    // getting list data
    getListData(){
      this.listdata = this.tskmngr.getLists()
      console.log(this.listdata);
    }
    // delete card 
    removeCard(i:any,type:any){
      console.log(i);
      if (type === 'deletecard') {
        const dialogRef = this.dialog.open(DialogboxComponent, {
          width: '500px',
          disableClose: true,
          data: { type: 'deletecard' }
        });
        //console.log(this.carddata);
        this.removeByAttr(this.carddata, 'id', i)
        //console.log(this.carddata);
        window.localStorage.removeItem('cards');
        window.localStorage.setItem('cards', JSON.stringify(this.carddata));
      }
    }
    // common function for delete array item
   removeByAttr(arr:any, attr:any, value:any){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
           arr.splice(i,1);

       }
    }
    return arr;
}
 // delete list
 removeList(j:any,type:any){
  //console.log(j);
  if (type === 'deletelist') {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '500px',
      disableClose: true,
      data: { type: 'deletelist' }
    });
    //console.log(this.listdata);
    this.removeByAttr(this.listdata, 'id', j)
    //console.log(this.listdata);
    window.localStorage.removeItem('lists');
    window.localStorage.setItem('lists', JSON.stringify(this.listdata));
  }
 }

    // for add another List
    openAddListDialog(){
      const dialogRef = this.dialog.open(DialogboxComponent, {
        width: '650px',
        data: {
          type: 'ListTypepopup'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getListData();
      });
    }
  
}
