import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Routes } from '@angular/router';


import { OfferBookingsPage } from './offer-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: OfferBookingsPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [OfferBookingsPage]
})
export class OfferBookingsPageModule {}
