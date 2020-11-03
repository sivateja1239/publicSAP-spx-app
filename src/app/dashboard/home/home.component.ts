import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDetails } from '../../shared/models/app-models';
import { DashboardService } from '../../shared/service/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  appliedYear: string;
  isLaunched: string;
  isLanded: string;
  recordLimit: number;
  cardsList: CardDetails[] = [];
  isShowLoader: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Component initialization with query paramters.
   */
  ngOnInit() {
    this.getQueryParameters();
  }

  /**
   * Fetch the query parameters based on the URL.
   * And Load the list of cards.
   */
  getQueryParameters() {
    this.recordLimit = 100;
    this.route.queryParamMap.subscribe((params) => {
      this.appliedYear = params.get('year');
      this.isLanded = params.get('landSucess');
      this.isLaunched = params.get('launchSucess');
      this.fetLaunches();
    });
  }

  /**
   * Action from child component for select/deselect the years.
   * @param payload  contains property to update and the selection property.
   */
  applyFilters(payload) {
    this.genericFilter(payload);
  }

  /**
   * Updating the filter which is been sent from child component.
   * Navigate to a new page.
   * @param payload contains which property to update and the selection property.
   */
  genericFilter(payload) {
    this[payload.propertyName] = payload.selection.isSelected
      ? payload.selection.value
      : undefined;
    this.redirectToFiltersPage();
    this.fetLaunches();
  }

  /**
   * Navigate to the new page to play around with the filters.
   */
  redirectToFiltersPage() {
    this.router.navigate(['/filter'], {
      queryParams: {
        year: this.appliedYear,
        launchSucess: this.isLaunched,
        landSucess: this.isLanded,
      },
    });
  }

  /**
   * Fetching the list of spacex cards.
   */
  fetLaunches() {
    this.isShowLoader = true;
    this.dashboardService
      .getLaunches(
        this.appliedYear,
        this.isLaunched,
        this.isLanded,
        this.recordLimit
    ).subscribe((data: CardDetails[]) => {
      this.cardsList = data;
      //Hide loader
      this.isShowLoader = false;
    });
  }
}
