import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'src/app/interfaces/product';
import { ProductDataHttpService } from 'src/app/services/product-data-http.service.service';

@Component({
  selector: 'app-abcproductaddeditdata',
  templateUrl: './abcproductaddeditdata.component.html'
})
export class AbcProductAddEditDataComponent implements OnInit {

  //Using input paramters to pass the value to component
  @Input() selectedProductData:any;
  @Input() selectedOperation:any;

  //creating FormGroup to hold the controls,Reactive form gives developer more control
  //FromGroup hold all controls for the form
  productDataFormGroup : FormGroup;
  public salesDataControls:any = {};
  resultMessage:any;
 // disableButton:boolean=false;
  constructor(private activeModal: NgbActiveModal,private _productDataHttpService:ProductDataHttpService) { }

  ngOnInit(): void {
    // this.productDataFormGroup.valueChanges 
    //         .subscribe((changedObj: any) => {
    //           console.log(this.productDataFormGroup.valid)
    //              this.disableButton = this.productDataFormGroup.valid;
    //         });
    this.salesDataControls['txtProductName'] = new FormControl('',Validators.required);
    this.salesDataControls['txtProductLevel'] = new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);
    this.salesDataControls['txtProductCategory'] = new FormControl('',Validators.required);
    this.salesDataControls['txtProductPrice'] = new FormControl('',[Validators.required,Validators.pattern(/^\d+\.?\d{0,8}$/)]);
    this.salesDataControls['txtProductDesc'] = new FormControl('',Validators.required);
     this.salesDataControls['btnSubmit']= new FormControl('Save Data');
    this.productDataFormGroup = new FormGroup(this.salesDataControls);
    //for EditMode load the selected product data
    if(this.selectedOperation.toLowerCase() === "edit")
    {
      this.loadProductData();
    }
  }

//function to read the value from input parameter and then assign the data to controls in form
loadProductData = () =>{
  this.productDataFormGroup.get('txtProductName')?.setValue(this.selectedProductData.productName);
  this.productDataFormGroup.get('txtProductLevel')?.setValue(this.selectedProductData.productStockLevel);
  this.productDataFormGroup.get('txtProductCategory')?.setValue(this.selectedProductData.productCategory);
  this.productDataFormGroup.get('txtProductDesc')?.setValue(this.selectedProductData.productDescription);
  this.productDataFormGroup.get('txtProductPrice')?.setValue(this.selectedProductData.productPrice);
}

  onSubmit()
  {
     //disable button inorder to prevent double submit
     // this.productDataFormGroup.get('btnSubmit')?.disable();
     //this.disableButton = true;
      let productRecord = <IProduct>{};
      productRecord.productName = this.productDataFormGroup.getRawValue()['txtProductName'];
      productRecord.productPrice = this.productDataFormGroup.getRawValue()['txtProductPrice'];
      productRecord.productDescription = this.productDataFormGroup.getRawValue()['txtProductDesc'];
      productRecord.productCategory = this.productDataFormGroup.getRawValue()['txtProductCategory'];
      productRecord.productStockLevel = this.productDataFormGroup.getRawValue()['txtProductLevel'];
      //Call to save the data
      if(this.selectedOperation.toLowerCase() === "edit")
      {
        
        productRecord.productId = this.selectedProductData?.productId !== undefined ? this.selectedProductData.productId :0;
        this._productDataHttpService.updateProductData(productRecord).subscribe(
           data =>{ this.resultMessage = "The Product data saved successfully."; 
          },
           (error)=>{this.resultMessage = "Error occured while updating product. Please try again.";},
           () =>{
            this.activeModal.close();
           });
      }
     
      if(this.selectedOperation.toLowerCase() === "add")
      {
      this._productDataHttpService.insertProductData(productRecord).subscribe(
        data =>{ this.resultMessage = "The Product data added successfully."; },
        (error)=>{this.resultMessage = "Error occured while updating product. Please try again.";},
        () =>{
          this.activeModal.close();
        });
      }
  }
}
