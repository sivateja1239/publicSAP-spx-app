import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { CardsListComponent } from './cards-list/cards-list.component';

@NgModule({
  declarations: [FilterComponent, CardsListComponent, HomeComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
