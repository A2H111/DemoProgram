import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleDeleteRoutingModule } from './multipledelete-routing.module';
import {MultipleDeletePageComponent} from './multipledeletepage.component';

@NgModule({
  declarations:[MultipleDeletePageComponent],
  imports: [
    CommonModule,
    MultipleDeleteRoutingModule
  ]
})
export class MultipleDeleteModule { }
