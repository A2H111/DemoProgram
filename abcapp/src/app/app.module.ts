import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbcSalesListComponent } from './abc-product/abc-product-list/abc-sales-list.component';
import { ProductDataHttpService } from './services/product-data-http.service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbcProductAddEditDataComponent } from './abc-product/abc-product-add-edit-data/abcproductaddeditdata.component';
import { MultipleDeleteModule } from './abc-product/multiple-delete-page/multiple-delete.module';
import { HttpCallInterceptor } from './shared/interceptors/httpcallinterceptor';
import { ModalWindowComponent } from './shared/modalPopupWindow/modal-window.component';


@NgModule({
  declarations: [
    AppComponent,
    AbcSalesListComponent,
    AbcProductAddEditDataComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MultipleDeleteModule
  ],
  entryComponents:[ModalWindowComponent],
  providers: [ProductDataHttpService,
  {provide:HTTP_INTERCEPTORS,useClass:HttpCallInterceptor,multi:true}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
