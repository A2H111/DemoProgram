import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbcSalesListComponent } from './abc-product/abc-product-list/abc-sales-list.component';

//Using dynamic lazy load option to load the module dynamically
const routes: Routes = [{
  path:'mutipleDelete',
   loadChildren: () => import(`./abc-product/multiple-delete-page/multiple-delete.module`)
   .then(m => m.MultipleDeleteModule),
  
},
{ path: '', component: AbcSalesListComponent},
{ path: 'home', component: AbcSalesListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
