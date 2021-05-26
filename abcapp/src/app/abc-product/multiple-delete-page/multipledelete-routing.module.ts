import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { MultipleDeletePageComponent } from './multipledeletepage.component';


const routes: Routes = [
    { path: 'multipledelete', component: MultipleDeletePageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MultipleDeleteRoutingModule { }