import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';

const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: PersonListComponent,
    children: [
      {
        path: ':id',
        component: PersonDetailComponent
        // canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   crisis: SampleDetailResolverService
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(crisisCenterRoutes)],
  exports: [RouterModule]
})
export class SampleRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
