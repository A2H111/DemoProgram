import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/product';
import { ProductDataHttpService } from 'src/app/services/product-data-http.service.service';
import { ModalWindowComponent } from 'src/app/shared/modalPopupWindow/modal-window.component';


@Component({
  selector: 'appmultipledeletepage',
  templateUrl: './multipledeletepage.component.html'
})
export class MultipleDeletePageComponent implements OnInit,OnDestroy {

  public productDataList : IProduct[]=[];
  selectedRecords:string[] = [];
  modalOption: NgbModalOptions = {};
  private ngUnsubscribe: Subject<any> = new Subject();
  disableButton:boolean=true;
  constructor(private _productDataHttpService:ProductDataHttpService,private _router:Router,private _modalService: NgbModal) { }

  ngOnInit(): void {
   
    this.onLoadSalesData();
  }

  onLoadSalesData = () =>
  {
    //Get Product data from database. Used takeUntil to resolve the memory leak issue with subscribe
    // takeUnitil will continue the subscription till the ngUnsubscribe is complete. We mark the ngUnsubscribe as
    //complete on component destroy event(ngOnDestroy)
    this._productDataHttpService.getProductData()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      data => { 
        this.productDataList = data},
      err =>{ console.log('An error occured')},  //TO DO add interceptor and log the exceptio nmesage in textfile
     );
  }

  onRedirectoHomePage()
  {
    this._router.navigate(['home']);
  }

  checkboxSelected = (event:any,productRecord:IProduct) =>{
    if(event.target.checked)
    {
      this.selectedRecords.push(productRecord.productId);
    }
    else{
      this.selectedRecords.splice(this.selectedRecords.findIndex(k => k == productRecord.productId),1);
    }
  }

  onDeletePopUpConfirmation = ()=> {
   
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this._modalService.open(ModalWindowComponent, this.modalOption);
    modalRef.componentInstance.modalpopup_header = 'Delete Confirmation';
    modalRef.componentInstance.modal_body_content = 'Are you sure to delete the records';

    modalRef.result.then((userResponse) => {
      if(userResponse === 'okclick')
      {
        this.disableButton = false;
        console.log(`User's choice: ${userResponse}`);
        this.onDeleteRecords();
      }
    }); 
  }
   
  onDeleteRecords = ()=> {
      let productsArray : IProduct[]=[];
      // Loop through the array
      for (var i = 0; i <  this.selectedRecords.length; i++) {
          let k = <IProduct>{} ;
          k.productId = this.selectedRecords[i];
          productsArray.push(k);
      }
     this._productDataHttpService.deleteProductsDetails(productsArray).subscribe(data=>{
       this.onLoadSalesData();
     },
     (error)=>{
       console.log('An error occured');
     }
     ,()=>{
        this.disableButton = true;
     });
  }

ngOnDestroy(): any {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

}
