import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LaunchStatus, LandingStatus, LaunchYears } from 'src/app/shared/utils/constants';
import { Filters } from 'src/app/shared/models/app-models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() appliedYear: number;
  @Input() isLaunched: string;
  @Input() isLanded: string;
  @Output() applyFilters = new EventEmitter();

  years: Array<Filters>;
  launchValues: Array<Filters>;
  landingValues: Array<Filters>;

  constructor() {}

  /**
   * Get all Static Configurations
   */
  ngOnInit() {
    this.launchValues = LaunchStatus;
    this.landingValues = LandingStatus;
    this.years = LaunchYears;
  }

  /**
   * Select/deselect year filters.
   * @param selectedYear Selected year with the year and selection status.
   */
  applyFilter(field: string, selectedYear: Filters, propertyName: string) {
    this.genericMap(field, selectedYear);
    this.applyFilters.emit({
      propertyName: propertyName,
      selection: selectedYear,
    });
  }

  /**
   * Mapping the selection status for years/launch/landing.
   * @param field             Component property to access(dynamic).
   * @param selectedProperty  That particular selection property.
   */
  genericMap(field: string, selectedProperty: any) {
    this[field].map((property) => {
      property.isSelected =
        property.value === selectedProperty.value
          ? !property.isSelected
          : false;
    });
  }
}
