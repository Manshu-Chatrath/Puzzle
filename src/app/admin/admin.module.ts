import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './panel/panel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [ HttpClientModule,
    FormsModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
