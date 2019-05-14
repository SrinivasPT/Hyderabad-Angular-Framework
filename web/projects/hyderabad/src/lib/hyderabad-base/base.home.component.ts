import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SelectEvent, TabStripComponent } from '@progress/kendo-angular-layout';
import { identity } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({ template: '' })
export class BaseFormHomeComponent implements OnInit {
  protected tabValues = [];
  protected selectedTabIndex: number;
  protected id = '';
  @ViewChild('tabStrip') protected tabStrip: TabStripComponent;

  constructor(protected route: ActivatedRoute, protected router: Router) {}

  ngOnInit() {
    this.selectedTabIndex = this.getTabIndexByURL();
    this.route.paramMap.pipe(tap(params => (this.id = params.get('id'))));
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.tabStrip.selectTab(this.getTabIndexByURL());
    });
    console.log(this.id);
  }

  protected onTabSelect(event: SelectEvent) {
    event.preventDefault();
    if (this.selectedTabIndex !== event.index) {
      this.router.navigate([`./${this.tabValues[event.index]}`], { relativeTo: this.route }).then(navigated => {
        navigated ? (this.selectedTabIndex = event.index) : identity(0);
      });
    }
  }

  protected getTabIndexByURL(): number {
    const routeSegment = this.router.url.split('/').reverse()[0];
    const tabIndex: number = this.tabValues.indexOf(routeSegment);
    return tabIndex;
  }
}
