import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {retry, takeUntil } from 'rxjs/operators';
import { ProductDataHttpService } from '../../services/product-data-http.service.service';
import {NgbModal, NgbModalOptions, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { AbcProductAddEditDataComponent } from '../abc-product-add-edit-data/abcproductaddeditdata.component';
import { IProduct } from 'src/app/interfaces/product';


@Component({
  selector: 'app-abc-sales-list',
  templateUrl: './abc-sales-list.component.html'
})
export class AbcSalesListComponent implements OnInit,OnDestroy {

  public productDataList : IProduct[]=[];
  public model: any;
  modalOption: NgbModalOptions = {};
  displayLoading:boolean=true;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private _productDataHttpService:ProductDataHttpService,private _modalPopup:NgbModal) { }

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
      err =>{ console.log('An error occured')
    },() =>{
      this.displayLoading =false;
    });
  }

   onProductSearch = (searchText:any) =>{
    this.productDataList = [];
    if(searchText !== "")
    {
    this._productDataHttpService.getProductDataByProductName(searchText)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      data => { this.productDataList = data },
      err =>{ console.log('An error occured')},
      ()=>{
        this.displayLoading =false;
      });  //TO DO add interceptor and log the exceptio nmesage in textfile
    }
    else{
      this.onLoadSalesData();
    }
   }


//Code to open the Modal Popup window. we used Ngbootstap modal popup window
onAddEditRecord(operation:string,selectedProductRecord:any){   
  //set bootstrap model popu window properties like size, close model on keyboard events etc
  this.modalOption.keyboard = false;
  this.modalOption.size = 'lg';
  const modalRef =this._modalPopup.open(AbcProductAddEditDataComponent, this.modalOption); 
  //if the operation is edit then set the selected row and operation to input properties of AbcProductAddEditDataComponent
  if(operation.toLowerCase() === "edit")  
  {
    modalRef.componentInstance.selectedProductData = selectedProductRecord;
  }
  modalRef.componentInstance.selectedOperation = operation;
  //on modal close call the load method to refresh the grid
  modalRef.result.then((result) => {
               this.onLoadSalesData();
    });
}
//Track by function to improve the peformance in ngFor loop
trackbyFunction = (item:any) =>{
    return item.id;
}

ngOnDestroy(): any {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

}
