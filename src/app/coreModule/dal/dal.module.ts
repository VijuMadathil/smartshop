import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbAbstractionLayerService } from './db-abstraction-layer.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DbAbstractionLayerService
  ]
})
export class DalModule { }
