import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SosPagePageRoutingModule } from './sos-page-routing.module';

import { SosPagePage } from './sos-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SosPagePageRoutingModule
  ],
  declarations: [SosPagePage]
})
export class SosPagePageModule {}
