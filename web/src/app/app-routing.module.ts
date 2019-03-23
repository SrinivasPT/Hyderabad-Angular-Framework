import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent, AuthGuard } from 'hyderabad';

// import { AuthGuard } from './auth/auth.guard';
// import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: './admin/admin.module#AdminModule',
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'sample',
    loadChildren: './sample/sample.module#SampleModule',
    data: { preload: true }
  },
  { path: '', redirectTo: '/sample', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false // <-- debugging purposes only
      // preloadingStrategy: SelectivePreloadingStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
